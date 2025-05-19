/** @notice Library imports */
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
/// Local imports
import { validate } from "@app/config/env/env.schema";
import { UsersModule } from "@app/users/users.module";
import { DatabaseModule } from "@app/config/db/db.module";
import { EnvironmentModule } from "@app/config/env/env.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    EnvironmentModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
