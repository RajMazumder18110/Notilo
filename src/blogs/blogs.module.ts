/** @notice library imports */
import { Module } from "@nestjs/common";
/// Local imports
import { BlogsRepository } from "./blogs.repo";

@Module({
  exports: [BlogsRepository],
  providers: [BlogsRepository],
})
export class BlogsModule {}
