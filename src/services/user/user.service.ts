import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserModel } from "../../entity/models/user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, Repository } from "typeorm";
import { UserMapper } from "../../entity/mapper/user.mapper";
import { UserDomain } from "../../entity/domain/user.domain";
import { successResponse } from "../../common/response.helper";
import { ResponseSuccess } from "../../common/response.interface";
import { newUUID } from "../../common/global.helper";
import { AuthModel } from "../../entity/models/auth.model";
import { RolesDomain } from "../../entity/domain/roles.domain";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModelRepository: Repository<UserModel>,
    private readonly userMapper: UserMapper,
    @InjectRepository(AuthModel)
    private readonly authModelRepository: Repository<AuthModel>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ResponseSuccess<UserDomain>> {
    const payload = this.userMapper.entityUserToModel({
      id: newUUID().toString(),
      name: createUserDto.name,
      email: createUserDto.email,
      role: RolesDomain.User,
    });

    try {
      const existingUser = await this.userModelRepository.findOne({
        where: { email: payload.email },
      });
      if (existingUser) {
        throw new BadRequestException(
          `User with email ${payload.email} already exists`,
        );
      }

      const savedUser = await this.userModelRepository.save(payload);

      await this.authModelRepository.save({
        id: newUUID().toString(),
        user_id: payload.id,
        email: payload.email,
        isActive: true,
        roles: payload.role,
        password: createUserDto.password,
      });
      return successResponse(savedUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error("Error creating user:", error);
      throw new Error("An unexpected error occurred while creating the user");
    }
  }

  async findAll(): Promise<ResponseSuccess<UserDomain[]>> {
    const userModels = await this.userModelRepository.find();
    return successResponse(
      userModels.map((userModel) =>
        this.userMapper.modelUserToEntity(userModel),
      ),
    );
  }

  async findOne(id: string): Promise<ResponseSuccess<UserDomain>> {
    try {
      const user = await this.userModelRepository.findOne({
        where: { id: id },
      });
      return successResponse(this.userMapper.modelUserToEntity(user));
    } catch (error) {
      if (error.name === "EntityNotFound") {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<ResponseSuccess<UserDomain>> {
    try {
      const user = await this.userModelRepository.findOne({
        where: { email },
      });
      return successResponse(this.userMapper.modelUserToEntity(user));
    } catch (error) {
      if (error.name === "EntityNotFound") {
        throw new NotFoundException(`User with id ${email} not found`);
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.email) {
        const check = await this.userModelRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (check)
          throw new BadRequestException(
            `email with ${updateUserDto.email} exist`,
          );
      }
      const user = await this.userModelRepository.findOneOrFail({
        where: { id },
      });
      if (user) {
        const payload = {
          name: updateUserDto.name ?? user.name,
          email: updateUserDto.email ?? user.email,
        };

        await this.userModelRepository.update(
          {
            id: id,
          },
          payload,
        );
        await this.authModelRepository.update(
          {
            user_id: user.id,
          },
          {
            email: payload.email,
          },
        );
        return successResponse(`user has been updated`);
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException("data gift not found");
      }
      throw error;
    }
  }

}
