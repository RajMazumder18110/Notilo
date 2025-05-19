/** @notice Library imports */
import { Global, Module } from "@nestjs/common";
/// Local imports
import { DatabaseService } from "./db.service";

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
