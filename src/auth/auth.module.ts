/** @notice Library imports */
import { Module } from "@nestjs/common";
/// Local imports
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService],
})
export class AuthModule {}
