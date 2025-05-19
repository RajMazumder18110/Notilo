/** @notice Library imports */
import { Global, Module } from "@nestjs/common";
/// Local imports
import { EnvironmentService } from "./env.service";

@Global()
@Module({
  exports: [EnvironmentService],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
