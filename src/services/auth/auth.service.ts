import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { PasswordService } from "../../common/password";
import { Repository } from "typeorm";
import { AuthModel } from "../../entity/models/auth.model";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "./dto/login.dto";
import { ServerConfig } from "../../config/server";
import { successResponse } from "../../common/response.helper";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectRepository(AuthModel)
    private readonly authModelRepository: Repository<AuthModel>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const auth = await this.authModelRepository.findOne({
        where: { user_id: user.data.id, isActive: true },
      });
      if (await this.passwordService.validatePassword(pass, auth.password))
        return user.data;
    }
    return null;
  }

  async signToken(
    userId: string,
    email: string,
    role: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email: email,
      role: role,
    };

    const secret = ServerConfig.JWT_SECRET;
    const expiresIn = ServerConfig.JWT_EXP;
    return this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret: secret,
    });
  }

  async login(user: LoginDto) {
    const validate = await this.validateUser(user.email, user.password);
    if (validate) {
      const token = await this.signToken(
        validate.id,
        validate.email,
        validate.role,
      );
      delete validate.id;

      return successResponse({
        token: token,
        user: validate,
      });
    } else {
      throw new BadRequestException("invalid data login");
    }
  }
}
