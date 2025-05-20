/** @notice Library imports */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
/// Local imports
import { JWTPayload } from "./auth.types";
import { UsersRepository } from "@app/users/users.repo";
import { EnvironmentService } from "@app/config/env/env.service";
import { LoginUserPayload, NewUserPayload } from "@app/users/users.type";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private envService: EnvironmentService,
    private userRepository: UsersRepository
  ) {}

  async signUp(payload: NewUserPayload) {
    let { email, password, name, username } = payload;
    email = email.toLowerCase();
    username = username.toLowerCase().trim();

    /// Validating email and username
    let user = await this.userRepository.validateSave(email, username);
    if (user) {
      const field = user.email === email ? "Email" : "Username";
      throw new ConflictException(`${field} already taken.`);
    }

    /// Saving data
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.save({
      name,
      email,
      username,
      password: hashedPassword,
    });

    /// Generating JWT
    const jwtPayload: JWTPayload = { sub: newUser.id, username };
    const accessToken = await this.getAccessToken(jwtPayload);
    return { accessToken };
  }

  async signIn(payload: LoginUserPayload) {
    const { email, password } = payload;
    /// Validating user
    const user = await this.userRepository.findOne(email, true);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    /// Validating password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    /// Generating JWT
    const jwtPayload: JWTPayload = { sub: user.id, username: user.username };
    const accessToken = await this.getAccessToken(jwtPayload);
    return { accessToken };
  }

  private async getAccessToken(payload: JWTPayload): Promise<string> {
    const secret = this.envService.get("AUTHENTICATION_JWT_SECRET");
    return await this.jwtService.signAsync(payload, { secret });
  }
}
