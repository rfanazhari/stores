export enum RolesDomain {
  User = "USER",
  Admin = "ADMIN",
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

