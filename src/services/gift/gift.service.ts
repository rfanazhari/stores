import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGiftDto } from "./dto/create-gift.dto";
import {
  RedeemGift,
  UpdateGiftDto,
  UpdateStockGift,
} from "./dto/update-gift.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GiftModel } from "../../entity/models/gift.model";
import { EntityNotFoundError, Repository } from "typeorm";
import { GiftMapper } from "../../entity/mapper/gift.mapper";
import { newUUID } from "../../common/global.helper";
import { successResponse } from "../../common/response.helper";
import { ResponseSuccess } from "../../common/response.interface";
import { GiftDomain } from "../../entity/domain/gift.domain";
import { RedeemModel } from "../../entity/models/redeem.model";
import { RedeemMapper } from "../../entity/mapper/redeem.mapper";
import { GetGiftsDto } from "./dto/get-gift.dto";
import { AddRatingDto } from "./dto/add-rating.dto";
import { calculateStarRating } from "../../utils/rating.utils";

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(GiftModel)
    private readonly giftModelRepository: Repository<GiftModel>,
    private readonly giftMapper: GiftMapper,
    @InjectRepository(RedeemModel)
    private readonly redeemModelRepository: Repository<RedeemModel>,
    private readonly redeemMapper: RedeemMapper,
  ) {}

  async create(createGiftDto: CreateGiftDto) {
    const payload = this.giftMapper.entityGiftToModel({
      id: newUUID().toString(),
      name: createGiftDto.name,
      description: createGiftDto.description,
      image: createGiftDto.image,
      stock: createGiftDto.stock,
    });

    try {
      const save = await this.giftModelRepository.save(payload);
      return successResponse(save);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else
        throw new Error("An unexpected error occurred while creating the gift");
    }
  }

  async findAll(
    getGiftsDto: GetGiftsDto,
  ): Promise<ResponseSuccess<GiftDomain[]>> {
    const { page, limit, sortBy = "createdAt", order = "ASC" } = getGiftsDto;
    const skip = isNaN((page - 1) * limit) ? 0 : (page - 1) * limit;

    const [gifts] = await this.giftModelRepository
      .createQueryBuilder("gift")
      .where("gift.isDeleted = :isDeleted", { isDeleted: false })
      .skip(skip)
      .take(limit)
      .orderBy(`gift.${sortBy}`, order.toUpperCase() === "ASC" ? "ASC" : "DESC")
      .getManyAndCount();

    return successResponse(
      gifts.map((gift) => this.giftMapper.modelGiftToEntity(gift)),
    );
  }
  async findOne(id: string): Promise<ResponseSuccess<GiftDomain>> {
    try {
      const gift = await this.giftModelRepository.findOne({
        where: { id: id, isDeleted: false },
      });
      return successResponse(this.giftMapper.modelGiftToEntity(gift));
    } catch (error) {
      if (error.name === "EntityNotFound") {
        throw new NotFoundException(`Gift with id ${id} not found`);
      }
      throw error;
    }
  }

  async update(id: string, updateGiftDto: UpdateGiftDto) {
    try {
      const gift = await this.giftModelRepository.findOneOrFail({
        where: { id, isDeleted: false },
      });
      if (gift) {
        const newStock = !isNaN(updateGiftDto?.stock)
          ? gift.stock + updateGiftDto?.stock
          : gift.stock;
        await this.giftModelRepository.update(
          {
            id: id,
          },
          {
            name: updateGiftDto?.name ?? gift.name,
            description: updateGiftDto?.description ?? gift.description,
            image: updateGiftDto.image ?? gift.image,
            stock: newStock,
          },
        );
        return successResponse(`gift has been updated`);
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException("data gift not found");
      }
      throw error;
    }
  }

  async updateStock(id: string, updateGiftDto: UpdateStockGift) {
    try {
      const gift = await this.giftModelRepository.findOneOrFail({
        where: { id, isDeleted: false },
      });
      if (gift) {
        const newStock: number = updateGiftDto.stock;
        await this.giftModelRepository
          .createQueryBuilder()
          .update(GiftModel)
          .set({
            stock: newStock,
          })
          .where({ id: id })
          .execute();
        return successResponse(`stock has been updated to ${newStock}`);
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException("data gift not found");
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const gift = await this.giftModelRepository.findOneOrFail({
        where: { id, isDeleted: false },
      });
      if (gift) {
        await this.giftModelRepository.update(
          {
            id: id,
          },
          {
            isDeleted: false,
          },
        );
        return successResponse(`gift with ${gift.name} has been deleted`);
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException("data gift not found");
      }
      throw error;
    }
  }

  async redeemGift(id: string, dto: RedeemGift, userId: string) {
    try {
      const gift = await this.giftModelRepository.findOneOrFail({
        where: { id, isDeleted: false },
      });
      if (gift) {
        if (dto.qty > gift.stock)
          throw new BadRequestException("qty is too much");
        const newStock = gift.stock - dto.qty;
        await this.giftModelRepository.update(
          {
            id: id,
          },
          {
            stock: newStock,
          },
        );

        const payload = this.redeemMapper.entityRedeemToModel({
          id: newUUID().toString(),
          qty: dto.qty,
          gift_id: gift.id,
          user_id: userId,
        });
        await this.redeemModelRepository.save(payload);
        return successResponse(`redeem with gift with ${gift.name} success`);
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException("data gift not found");
      }
      throw error;
    }
  }
  async addRating(id: string, addRatingDto: AddRatingDto) {
    try {
      const gift = await this.giftModelRepository.findOne({
        where: { id, isDeleted: false },
      });
      if (!gift) {
        throw new NotFoundException(`Gift with ID ${id} not found`);
      }

      gift.rating = parseInt(String(gift.rating)) + addRatingDto.rating;
      const updatedGift = await this.giftModelRepository.save(gift);

      return successResponse(updatedGift);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException("data gift not found");
      }
      throw error;
    }
  }
}
