/** @notice Library imports */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
/// Local imports
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
