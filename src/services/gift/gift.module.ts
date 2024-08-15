import { Module } from "@nestjs/common";
import { GiftService } from "./gift.service";
import { GiftController } from "./gift.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { GiftMapper } from "../../entity/mapper/gift.mapper";
import { GiftModel } from "../../entity/models/gift.model";
import { RedeemModel } from "../../entity/models/redeem.model";
import { RedeemMapper } from "../../entity/mapper/redeem.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([GiftModel, RedeemModel])],
  controllers: [GiftController],
  providers: [GiftService, GiftMapper, RedeemMapper, JwtService],
})
export class GiftModule {}
