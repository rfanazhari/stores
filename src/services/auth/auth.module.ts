import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ServerConfig } from "../../config/server";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "../../entity/models/user.model";
import { AuthModel } from "../../entity/models/auth.model";
import { UserService } from "../user/user.service";
import { PasswordService } from "../../common/password";
import { UserMapper } from "../../entity/mapper/user.mapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, AuthModel]),
    JwtModule,
    JwtModule.register({
      secret: ServerConfig.JWT_SECRET || "whosyourdaddy",
      signOptions: { expiresIn: "60m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PasswordService, UserMapper],
})
export class AuthModule {}
