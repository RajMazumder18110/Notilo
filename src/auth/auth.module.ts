/** @notice Library imports */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
/// Local imports
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "@app/users/users.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
