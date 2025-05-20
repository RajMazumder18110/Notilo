/** @notice Library imports */
import { Injectable } from "@nestjs/common";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
/// Local imports
import * as schema from "./db.schema";
import { EnvironmentService } from "@app/config/env/env.service";

@Injectable()
export class DatabaseService {
  private __database: PostgresJsDatabase<typeof schema>;
  constructor(private envService: EnvironmentService) {}

  get database(): PostgresJsDatabase<typeof schema> {
    if (!this.__database) {
      const connectionUrl = this.envService.get("DATABASE_CONNECTION_URL");
      this.__database = drizzle(connectionUrl, { schema });
    }
    return this.__database;
  }
}
