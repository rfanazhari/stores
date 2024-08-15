import { AppDataSource } from "./data-source";
import { UserModel } from "../entity/models/user.model";
import { newUUID } from "../common/global.helper";
import { PasswordService } from "../common/password";
import { RolesDomain } from "../entity/domain/roles.domain";
import { AuthModel } from "../entity/models/auth.model";

async function seed() {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(UserModel);
    const authRepository = AppDataSource.getRepository(AuthModel);
    const passwordService = new PasswordService();
    const user: any = {
      id: newUUID().toString(),
      name: "admin",
      email: "admin@example.ext",
      password: await passwordService.generatePasswordHash("admin123!"),
      roles: RolesDomain.Admin,
    };

    await userRepository.save({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.roles,
    });
    await authRepository.save({
      id: newUUID().toString(),
      user_id: user.id,
      roles: user.roles,
      email: user.email,
      password: user.password,
      isActive: true,
    });
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed!", error);
  } finally {
    process.exit();
  }
}

seed();
