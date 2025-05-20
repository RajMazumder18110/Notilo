/** @notice Library imports */
import { eq, ilike } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
/// Local imports
import { blogs } from "./blogs.entity";
import { DatabaseService } from "@app/config/db/db.service";
import { Blog, BlogWithAuthor, NewBlogPayload } from "./blogs.type";

@Injectable()
export class BlogsRepository {
  constructor(private dbService: DatabaseService) {}

  async findByAuthor(authorId: string): Promise<BlogWithAuthor[]> {
    return await this.dbService.database.query.blogs.findMany({
      where: eq(blogs.author, authorId),
      columns: {
        author: false,
      },
      with: {
        author: {
          columns: {
            password: false,
          },
        },
      },
    });
  }

  async findByKeyword(keyword: string): Promise<BlogWithAuthor[]> {
    return await this.dbService.database.query.blogs.findMany({
      where: ilike(blogs.title, `%${keyword}%`),
      columns: {
        author: false,
      },
      with: {
        author: {
          columns: {
            password: false,
          },
        },
      },
    });
  }

  async save(payload: NewBlogPayload): Promise<Pick<Blog, "id">> {
    const { title, description, author } = payload;
    const [blog] = await this.dbService.database
      .insert(blogs)
      .values({ title, description, author })
      .returning({ id: blogs.id });

    return blog;
  }
}
