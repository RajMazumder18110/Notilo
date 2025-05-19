/** @notice Library imports */
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
/// Local imports
import { validate } from "@app/config/env/env.schema";
import { EnvironmentService } from "@app/config/env/env.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
  providers: [EnvironmentService],
})
export class AppModule {}
