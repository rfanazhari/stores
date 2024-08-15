import { IsNumber, Min, Max } from "class-validator";

export class AddRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}