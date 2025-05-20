/** @notice Library imports */
import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
/// Local imports
import { AuthService } from "../auth.service";
import { UsersRepository } from "@app/users/users.repo";
import { LoginUserPayload, NewUserPayload, User } from "@app/users/users.type";

describe("AuthService", () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;
  const mockUsersRepository = {
    findOne: jest.fn(),
    findByKeyword: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it("Should register an user.", async () => {
    /// Arrange
    const payload: NewUserPayload = {
      email: "test@gmail.com",
      password: "secret",
      name: "Test user",
      username: "testuser",
    };
    const registerResponse = {
      id: "3d350c3e",
    };
    const repoSpy = jest
      .spyOn(usersRepository, "save")
      .mockImplementationOnce(async (payload) => registerResponse);

    /// Act
    const response = await authService.register(payload);
    /// Assert
    expect(response).toBe(registerResponse);
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it("Should login the user if email and password is valid.", async () => {
    /// Arrange
    const payload: LoginUserPayload = {
      email: "test@gmail.com",
      password: "secret",
    };
    const actualUser: User = {
      id: "3d350c3e",
      username: "testuser",
      email: "test@gmail.com",
      password: "$2b$10$5CUqKsCMWRk7HE.682998uOXse41IMBp2oVyknPNp014CC9Mu8Zh2",
      name: "Test user",
      bio: "Test bio",
      createdAt: new Date("2025-05-20T08:31:41.836Z"),
      updatedAt: new Date("2025-05-20T08:31:41.836Z"),
    };

    const repoSpy = jest
      .spyOn(usersRepository, "findOne")
      .mockImplementationOnce(async (a, b) => actualUser);

    /// Act
    const response = await authService.login(payload);
    /// Assert
    expect(response).toBeUndefined();
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith(payload.email, true);
  });

  it("Should throw error while login when the user pass wrong email.", async () => {
    /// Arrange
    const payload: LoginUserPayload = {
      email: "wrong@gmail.com",
      password: "secret",
    };
    const repoSpy = jest
      .spyOn(usersRepository, "findOne")
      .mockImplementationOnce(async (a, b) => undefined);

    /// Act
    const response = authService.login(payload);
    /// Assert
    expect(response).rejects.toThrow(UnauthorizedException);
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith(payload.email, true);
  });

  it("Should throw error while login when the user pass wrong password.", async () => {
    /// Arrange
    const payload: LoginUserPayload = {
      email: "test@gmail.com",
      password: "wrong",
    };
    const actualUser: User = {
      id: "3d350c3e",
      username: "testuser",
      email: "test@gmail.com",
      password: "$2b$10$5CUqKsCMWRk7HE.682998uOXse41IMBp2oVyknPNp014CC9Mu8Zh2",
      name: "Test user",
      bio: "Test bio",
      createdAt: new Date("2025-05-20T08:31:41.836Z"),
      updatedAt: new Date("2025-05-20T08:31:41.836Z"),
    };

    const repoSpy = jest
      .spyOn(usersRepository, "findOne")
      .mockImplementationOnce(async (a, b) => actualUser);

    /// Act
    const response = authService.login(payload);
    /// Assert
    expect(response).rejects.toThrow(UnauthorizedException);
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith(payload.email, true);
  });
});
