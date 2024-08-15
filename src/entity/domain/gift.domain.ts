import { Expose } from "class-transformer";

export class GiftDomain {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  rating: number;

  @Expose()
  stock: number;

  @Expose()
  isDeleted: boolean;

  @Expose()
  createdAt: Date;
}
