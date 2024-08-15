import { DataSource } from "typeorm";
import { AuthModel } from "../entity/models/auth.model";
import { UserModel } from "../entity/models/user.model";
import { ServerConfig } from "../config/server";
import { GiftModel } from "../entity/models/gift.model";
import { RedeemModel } from "../entity/models/redeem.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ServerConfig.DB_HOST,
  port: ServerConfig.DB_PORT,
  username: ServerConfig.DB_USERNAME,
  password: ServerConfig.DB_PASSWORD,
  database: ServerConfig.DB_NAME,
  schema: ServerConfig.DB_SCHEMA,
  entities: [AuthModel, UserModel, GiftModel, RedeemModel],
  synchronize: ServerConfig.DB_SYNC,
});
