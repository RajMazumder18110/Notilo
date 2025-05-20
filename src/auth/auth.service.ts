/** @notice Library imports */
import bcrypt from "bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
/// Local imports
import { UsersRepository } from "@app/users/users.repo";
import { LoginUserPayload, NewUserPayload } from "@app/users/users.type";

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}

  async register(payload: NewUserPayload) {
    const { email, password, name, username } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      name,
      email,
      username,
      password: hashedPassword,
    });
  }

  async login(payload: LoginUserPayload) {
    const { email, password } = payload;
    const user = await this.userRepository.findOne(email, true);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid email or password");
    }
  }
}
