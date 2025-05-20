/** @notice library imports */
import { Module } from "@nestjs/common";
/// Local imports
import { BlogsRepository } from "./blogs.repo";
import { BlogsService } from "./blogs.service";

@Module({
  exports: [BlogsRepository],
  controllers: [],
  providers: [BlogsRepository, BlogsService],
})
export class BlogsModule {}
