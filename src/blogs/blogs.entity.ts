/** @notice Library imports */
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
/// Local imports
import { users } from "@app/users/users.entity";

export const blogs = pgTable("blogs", {
  /// Core fields
  id: uuid().defaultRandom().notNull().primaryKey(),

  title: varchar({ length: 100 }).notNull(),
  description: text().notNull().unique(),
  author: uuid()
    .notNull()
    .references(() => users.id),

  /// Timestamps
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const blogsRelations = relations(blogs, ({ one }) => ({
  author: one(users, {
    fields: [blogs.author],
    references: [users.id],
  }),
}));
