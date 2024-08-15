import { Expose } from "class-transformer";

export class RedeemDomain {
  @Expose()
  id: string;

  @Expose()
  user_id: string;

  @Expose()
  gift_id: string;

  @Expose()
  qty: number;

  @Expose()
  createdAt: Date;
}
