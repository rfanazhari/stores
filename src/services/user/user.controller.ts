import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PasswordService } from "../../common/password";
import { RolesDecorator } from "../../common/guard/roles.decorator";
import { RolesDomain } from "../../entity/domain/roles.domain";
import { AuthLocalGuard } from "../../common/guard/auth-local.guard";
import { RolesGuard } from "../../common/guard/roles.guard";

@RolesDecorator(RolesDomain.Admin)
@UseGuards(AuthLocalGuard, RolesGuard)
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await this.passwordService.generatePasswordHash(
      createUserDto.password,
    );
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
