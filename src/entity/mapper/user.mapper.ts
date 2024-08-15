import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserDomain } from '../domain/user.domain';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserMapper {
  entityUserToModel(userEntity: Partial<UserDomain>): UserModel {
    return plainToInstance(UserModel, userEntity);
  }

  modelUserToEntity(userModel: Partial<UserModel>): UserDomain {
    return plainToClass(UserDomain, userModel);
  }
}
