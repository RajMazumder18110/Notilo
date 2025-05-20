/** @notice Local imports */
import { blogs } from "@app/common/entities";
import { UserWithoutPassword } from "./users.type";

export type Blog = typeof blogs.$inferSelect;
export type BlogOmittedAuthor = Omit<Blog, "author">;
export type NewBlogPayload = Omit<Blog, "id" | "createdAt" | "updatedAt">;

export type BlogWithAuthor = BlogOmittedAuthor & {
  author: UserWithoutPassword;
};
