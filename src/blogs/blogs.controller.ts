/** @notice Library imports */
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from "@nestjs/common";
/// Local imports
import { BlogsService } from "./blogs.service";

@Controller("blogs")
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  /// GET -> /blogs?q=value
  @Get()
  async searchByQuery(@Query("q") keyword: string) {
    return this.blogsService.searchByQuery(keyword);
  }

  /// GET -> /blogs/:blogId
  @Get(":blogId")
  async findById(@Param("blogId") blogId: string) {
    const blog = await this.blogsService.findById(blogId);
    if (!blog) {
      throw new NotFoundException({ blogId });
    }

    return blog;
  }
}
