/** @notice Library imports */
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
/// Local imports
import { UsersModule } from "@app/users/users.module";
import { BlogsModule } from "@app/blogs/blogs.module";
import { validate } from "@app/config/env/env.schema";
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
    BlogsModule,
  ],
})
export class AppModule {}
