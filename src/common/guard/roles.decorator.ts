import { RolesDomain } from "../../entity/domain/roles.domain";
import { SetMetadata } from "@nestjs/common";

export const RolesDecorator = (...roles: RolesDomain[]) =>
  SetMetadata("roles", roles);
