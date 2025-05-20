/** @notice Local imports */
import { blogs } from "./blogs.entity";
import { UserWithoutPassword } from "@app/users/users.type";

export type Blog = typeof blogs.$inferSelect;
export type BlogOmittedAuthor = Omit<Blog, "author">;
export type NewBlogPayload = Omit<Blog, "id" | "createdAt" | "updatedAt">;

export type BlogWithAuthor = BlogOmittedAuthor & {
  author: UserWithoutPassword;
};
