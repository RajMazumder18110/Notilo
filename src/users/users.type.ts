/** @notice Local imports */
import { users } from "./users.entity";
import { BlogOmittedAuthor } from "@app/blogs/blogs.type";

export type User = typeof users.$inferSelect;
export type UserWithoutPassword = Omit<User, "password">;
export type NewUserPayload = Omit<
  User,
  "id" | "bio" | "createdAt" | "updatedAt"
>;
export type LoginUserPayload = Pick<User, "email" | "password">;

export type FindOneUser<T extends boolean> = T extends true | undefined
  ? User | undefined
  : UserWithoutPassword | undefined;

export type UserWithBlogs = UserWithoutPassword & {
  blogs: BlogOmittedAuthor[];
};
