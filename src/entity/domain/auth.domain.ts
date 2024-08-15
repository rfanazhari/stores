import { Expose } from "class-transformer";

export class AuthDomain {
  @Expose()
  id: string;

  @Expose()
  user_id: string;

  @Expose()
  password: string;

  @Expose()
  roles: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;
}
