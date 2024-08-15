import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GiftService } from "./gift.service";
import { CreateGiftDto } from "./dto/create-gift.dto";
import {
  RedeemGift,
  UpdateGiftDto,
  UpdateStockGift,
} from "./dto/update-gift.dto";
import { RolesDecorator } from "../../common/guard/roles.decorator";
import { JwtPayload, RolesDomain } from "../../entity/domain/roles.domain";
import { AuthLocalGuard } from "../../common/guard/auth-local.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { GetGiftsDto } from "./dto/get-gift.dto";
import { AddRatingDto } from "./dto/add-rating.dto";

@RolesDecorator(RolesDomain.Admin)
@UseGuards(AuthLocalGuard, RolesGuard)
@Controller("gift")
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftService.create(createGiftDto);
  }
  @RolesDecorator(RolesDomain.User, RolesDomain.User)
  @Get()
  findAll(@Query() getGiftsDto: GetGiftsDto) {
    return this.giftService.findAll(getGiftsDto);
  }
  @RolesDecorator(RolesDomain.User, RolesDomain.User)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.giftService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateGiftDto: UpdateGiftDto) {
    return this.giftService.update(id, updateGiftDto);
  }

  @Patch(":id")
  updateStatus(
    @Param("id") id: string,
    @Body() updateGiftDto: UpdateStockGift,
  ) {
    return this.giftService.updateStock(id, updateGiftDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.giftService.remove(id);
  }
  @RolesDecorator(RolesDomain.User)
  @Post(":id/redeem")
  redeemGift(
    @Param("id") id: string,
    @Body() updateGiftDto: RedeemGift,
    @Req() req: any,
  ) {
    const user: JwtPayload = req.user;
    return this.giftService.redeemGift(id, updateGiftDto, user.sub);
  }

  @RolesDecorator(RolesDomain.User)
  @Post(":id/rating")
  async addRating(@Param("id") id: string, @Body() addRatingDto: AddRatingDto) {
    return await this.giftService.addRating(id, addRatingDto);
  }
}
