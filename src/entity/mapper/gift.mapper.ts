import { Injectable } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { GiftDomain } from "../domain/gift.domain";
import { GiftModel } from "../models/gift.model";
import { calculateStarRating } from "../../utils/rating.utils";

@Injectable()
export class GiftMapper {
  entityGiftToModel(giftEntity: Partial<GiftDomain>): GiftModel {
    return plainToInstance(GiftModel, giftEntity);
  }

  modelGiftToEntity(giftModel: Partial<GiftModel>): GiftDomain {
    giftModel.rating = calculateStarRating(giftModel.rating);
    return plainToClass(GiftDomain, giftModel);
  }
}
