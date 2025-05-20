/** @notice Library imports */
import { Injectable } from "@nestjs/common";
/// Local imports
import { BlogsRepository } from "./blogs.repo";
import { NewBlogPayload } from "./blogs.type";

@Injectable()
export class BlogsService {
  constructor(private blogsRepository: BlogsRepository) {}

  async create(payload: NewBlogPayload) {
    return this.blogsRepository.save(payload);
  }

  async findById(id: string) {
    return this.blogsRepository.findById(id);
  }

  async searchByQuery(keyword: string) {
    return this.blogsRepository.findByKeyword(keyword);
  }
}
