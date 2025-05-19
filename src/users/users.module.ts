/** @notice Library imports */
import { Module } from "@nestjs/common";
/// Local imports
import { UsersRepository } from "./users.repo";

@Module({
  exports: [UsersRepository],
  providers: [UsersRepository],
})
export class UsersModule {}
