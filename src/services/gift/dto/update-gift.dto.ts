import { PartialType } from "@nestjs/mapped-types";
import { CreateGiftDto } from "./create-gift.dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGiftDto extends PartialType(CreateGiftDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  stock?: number;
}

export class UpdateStockGift {
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}

export class RedeemGift {
  @IsNumber()
  @IsNotEmpty()
  qty: number;
}
