import * as dotenv from "dotenv";
import * as env from "env-var";

dotenv.config({ path: "environment/.env" });

export class ServerConfig {
  public static readonly APP_PORT: number = env
    .get("APP_PORT")
    .required()
    .asPortNumber();

  public static readonly DB_HOST: string = env
    .get("DB_HOST")
    .required()
    .asString();
  public static readonly DB_PORT: number = env
    .get("DB_PORT")
    .required()
    .asInt();
  public static readonly DB_NAME: string = env
    .get("DB_NAME")
    .required()
    .asString();
  public static readonly DB_SCHEMA: string = env
    .get("DB_SCHEMA")
    .required()
    .asString();
  public static readonly DB_DIALECT: string = env
    .get("DB_DIALECT")
    .required()
    .asString();
  public static readonly DB_USERNAME: string = env
    .get("DB_USERNAME")
    .required()
    .asString();
  public static readonly DB_PASSWORD: string = env
    .get("DB_PASSWORD")
    .required()
    .asString();
  public static readonly DB_SYNC: boolean = env
    .get("DB_SYNC")
    .required()
    .asBool();
  public static readonly JWT_SECRET: string = env
    .get("JWT_SECRET")
    .required()
    .asString();
  public static readonly JWT_EXP: string = env
    .get("JWT_EXP")
    .required()
    .asString();
}
