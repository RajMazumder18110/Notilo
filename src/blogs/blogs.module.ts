/** @notice library imports */
import { Module } from "@nestjs/common";
/// Local imports
import { BlogsRepository } from "./blogs.repo";
import { BlogsService } from "./blogs.service";
import { BlogsController } from "./blogs.controller";

@Module({
  exports: [BlogsRepository],
  controllers: [BlogsController],
  providers: [BlogsRepository, BlogsService],
})
export class BlogsModule {}
