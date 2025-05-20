/** @notice Library imports */
import { ConfigService } from "@nestjs/config";
import { defineConfig } from "drizzle-kit";
/// Local imports
import { Environments } from "@app/config/env/env.schema";

const envs = new ConfigService<Environments>();

export default defineConfig({
  out: "./migrations",
  dialect: "postgresql",
  schema: ["./src/config/db/db.schema.ts"],
  dbCredentials: {
    url: envs.get("DATABASE_CONNECTION_URL")!,
  },
});
