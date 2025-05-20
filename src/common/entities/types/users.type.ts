/** @notice Local imports */
import { users } from "@app/common/entities";
import { BlogOmittedAuthor } from "./blogs.type";

export type User = typeof users.$inferSelect;
export type UserWithoutPassword = Omit<User, "password">;
export type NewUserPayload = Omit<User, "id" | "createdAt" | "updatedAt">;

export type FindOneUser<T extends boolean> = T extends true | undefined
  ? User | undefined
  : UserWithoutPassword | undefined;

export type UserWithBlogs = UserWithoutPassword & {
  blogs: BlogOmittedAuthor[];
};
