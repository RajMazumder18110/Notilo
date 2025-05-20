/** @notice Library imports */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
/// Local imports
import { JWTPayload } from "./auth.types";
import { EnvironmentService } from "@app/config/env/env.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private envServices: EnvironmentService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies.access;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const secret = this.envServices.get("AUTHENTICATION_JWT_SECRET");
      const payload: JWTPayload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      console.log(payload);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
