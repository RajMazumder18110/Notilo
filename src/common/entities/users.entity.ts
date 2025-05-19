/** @notice Library imports */
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    /// Core fields
    id: uuid().defaultRandom().notNull().primaryKey(),
    email: varchar({ length: 100 }).notNull().unique(),
    password: text().notNull(),

    /// Timestamps
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("userEmailUniqueIndex").on(table.email)]
);

/// Types
export type User = typeof users.$inferSelect;
export type NewUserPayload = Pick<User, "email" | "password">;
