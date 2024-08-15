import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AuthDomain } from '../domain/auth.domain';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class AuthMapper {
  entityAuthToModel(userEntity: Partial<AuthDomain>): AuthModel {
    return plainToInstance(AuthModel, userEntity);
  }

  modelAuthToEntity(userModel: Partial<AuthModel>): AuthDomain {
    return plainToClass(AuthDomain, userModel);
  }
}
