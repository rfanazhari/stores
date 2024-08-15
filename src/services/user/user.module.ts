import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "../../entity/models/user.model";
import { UserMapper } from "../../entity/mapper/user.mapper";
import { AuthModel } from "../../entity/models/auth.model";
import { PasswordService } from "../../common/password";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, AuthModel])],
  controllers: [UserController],
  providers: [UserService, PasswordService, UserMapper, JwtService],
})
export class UserModule {}
