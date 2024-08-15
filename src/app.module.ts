import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./services/user/user.module";
import { AuthModule } from "./services/auth/auth.module";
import { GiftModule } from "./services/gift/gift.module";
import { CommonMiddleware } from "./common/common.middleware";
import helmet from "helmet";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServerConfig } from "./config/server";
import { UserModel } from "./entity/models/user.model";
import { AuthModel } from "./entity/models/auth.model";
import { GiftModel } from "./entity/models/gift.model";
import { RedeemModel } from "./entity/models/redeem.model";

@Module({
  imports: [
    UserModule,
    AuthModule,
    GiftModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: ServerConfig.DB_HOST,
      port: ServerConfig.DB_PORT,
      username: ServerConfig.DB_USERNAME,
      password: ServerConfig.DB_PASSWORD,
      database: ServerConfig.DB_NAME,
      schema: ServerConfig.DB_SCHEMA,
      entities: [UserModel, AuthModel, GiftModel, RedeemModel],
      synchronize: ServerConfig.DB_SYNC,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(helmet(), CommonMiddleware).forRoutes("*");
  }
}
