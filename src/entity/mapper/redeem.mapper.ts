import { Injectable } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { RedeemDomain } from "../domain/redeem.domain";
import { RedeemModel } from "../models/redeem.model";

@Injectable()
export class RedeemMapper {
  entityRedeemToModel(redeemEntity: Partial<RedeemDomain>): RedeemModel {
    return plainToInstance(RedeemModel, redeemEntity);
  }

  modelGRedeemToEntity(redeemModel: Partial<RedeemModel>): RedeemDomain {
    return plainToClass(RedeemDomain, redeemModel);
  }
}
