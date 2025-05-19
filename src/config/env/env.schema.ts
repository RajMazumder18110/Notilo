/** @notice Library imports */
import { z } from "zod";

const envSchema = z.object({
  /// Optional
  PORT: z
    .string()
    .default("3000")
    .transform((p) => parseInt(p)),

  /// Mandatory
  DATABASE_CONNECTION_URL: z.string().url(),
  AUTHENTICATION_JWT_SECRET: z.string(),
});

export const validate = (env: any) => envSchema.parse(env);
export type Environments = z.infer<typeof envSchema>;
