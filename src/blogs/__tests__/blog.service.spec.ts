/** @notice Library imports */
import { Test } from "@nestjs/testing";
/// Local imports
import { BlogsService } from "../blogs.service";
import { BlogsRepository } from "../blogs.repo";
import { BlogWithAuthor, NewBlogPayload } from "../blogs.type";

describe("BlogsService", () => {
  let blogsService: BlogsService;
  let blogsRepository: BlogsRepository;

  const mockBlogsRepository = {
    findById: jest.fn(),
    findByAuthor: jest.fn(),
    findByKeyword: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: BlogsRepository,
          useValue: mockBlogsRepository,
        },
      ],
    }).compile();

    blogsService = module.get<BlogsService>(BlogsService);
    blogsRepository = module.get<BlogsRepository>(BlogsRepository);

    jest.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(blogsService).toBeDefined();
    expect(blogsRepository).toBeDefined();
  });

  it("Should create a blog entry.", async () => {
    /// Arrange
    const payload: NewBlogPayload = {
      author: "e535da23",
      title: "Title",
      description: "Description",
    };
    const createReturnValue = { id: "2ed0f862" };
    const repoSpy = jest
      .spyOn(blogsRepository, "save")
      .mockImplementationOnce(async (payload) => createReturnValue);

    /// Act
    const response = await blogsService.create(payload);
    /// Assert
    expect(response).toBe(createReturnValue);
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith(payload);
  });

  it("Should return blog details when id available.", async () => {
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
    const response = await blogsService.findById(blogDetails.id);
    /// Assert
    expect(response).toBe(blogDetails);
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith(blogDetails.id);
  });

  it("Should return blog details when id not available.", async () => {
    /// Arrange
    const blogId = "2ed0f862";
    const repoSpy = jest
      .spyOn(blogsRepository, "findById")
      .mockImplementationOnce(async (id) => undefined);

    /// Act
    const response = await blogsService.findById(blogId);
    /// Assert
    expect(response).not.toBeDefined();
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith(blogId);
  });
});
