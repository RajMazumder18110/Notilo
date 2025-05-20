/** @notice Library imports */
import { Test, TestingModule } from "@nestjs/testing";
/// Local imports
import { BlogsService } from "../blogs.service";
import { BlogsRepository } from "../blogs.repo";
import { BlogsController } from "../blogs.controller";
import { NotFoundException } from "@nestjs/common";
import { BlogWithAuthor } from "../blogs.type";

describe("BlogsController", () => {
  let controller: BlogsController;
  let blogsRepository: BlogsRepository;

  const mockBlogsRepository = {
    findById: jest.fn(),
    findByAuthor: jest.fn(),
    findByKeyword: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        BlogsService,
        {
          provide: BlogsRepository,
          useValue: mockBlogsRepository,
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    blogsRepository = module.get<BlogsRepository>(BlogsRepository);

    jest.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
    expect(blogsRepository).toBeDefined();
  });

  describe("Get blog", () => {
    it("[OK] -> Should return the blog when blog id available.", async () => {
      /// Arrange
      const blogDetails: BlogWithAuthor = {
        id: "2ed0f862",
        title: "Title",
        description: "Description",
        createdAt: new Date("2025-05-20T08:31:41.836Z"),
        updatedAt: new Date("2025-05-20T08:31:41.836Z"),
        author: {
          id: "e535da23",
          username: "username",
          email: "test@gmail.com",
          name: "Test user",
          bio: "Test bio",
          createdAt: new Date("2025-05-20T08:31:41.836Z"),
          updatedAt: new Date("2025-05-20T08:31:41.836Z"),
        },
      };
      const repoSpy = jest
        .spyOn(blogsRepository, "findById")
        .mockImplementationOnce(async (id) => blogDetails);

      /// Act
      const response = await controller.findById(blogDetails.id);
      /// Assert
      expect(response).toBe(blogDetails);
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith(blogDetails.id);
    });

    it("[NotFoundException] -> Should return not found when blog id not available.", async () => {
      /// Arrange
      const blogId = "2ed0f862";
      const repoSpy = jest
        .spyOn(blogsRepository, "findById")
        .mockImplementationOnce(async (id) => undefined);

      /// Act
      const response = controller.findById(blogId);
      /// Assert
      expect(response).rejects.toThrow(NotFoundException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith(blogId);
    });
  });
});
