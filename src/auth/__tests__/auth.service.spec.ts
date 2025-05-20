/** @notice Library imports */
import { Test, TestingModule } from "@nestjs/testing";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
/// Local imports
import { AuthService } from "../auth.service";
import { UsersRepository } from "@app/users/users.repo";
import { LoginUserPayload, NewUserPayload, User } from "@app/users/users.type";
import { JwtService } from "@nestjs/jwt";
import { EnvironmentService } from "@app/config/env/env.service";

describe("AuthService", () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;
  let envService: EnvironmentService;

  const mockUsersRepository = {
    findOne: jest.fn(),
    findByKeyword: jest.fn(),
    save: jest.fn(),
    validateSave: jest.fn(),
  };
  const mockEnvironmentService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: EnvironmentService,
          useValue: mockEnvironmentService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    envService = module.get<EnvironmentService>(EnvironmentService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe("Register", () => {
    it("Should register an user when email & username not registered.", async () => {
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
      jest.spyOn(envService, "get").mockImplementation((a) => "secret");

      const repoValidateSpy = jest
        .spyOn(usersRepository, "validateSave")
        .mockImplementationOnce(async (a, b) => undefined);

      const repoSpy = jest
        .spyOn(usersRepository, "save")
        .mockImplementationOnce(async (payload) => registerResponse);

      /// Act
      const response = await authService.signUp(payload);
      /// Assert
      expect(response).toHaveProperty("accessToken");
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoValidateSpy).toHaveBeenCalledTimes(1);
      expect(repoValidateSpy).toHaveBeenCalledWith(
        payload.email,
        payload.username
      );
    });

    it("Should throw an error when email or username already registered.", async () => {
      /// Arrange
      const payload: NewUserPayload = {
        email: "test@gmail.com",
        password: "secret",
        name: "Test user",
        username: "testuser",
      };
      const actualUser: User = {
        id: "3d350c3e",
        username: "testuser",
        email: "test@gmail.com",
        password:
          "$2b$10$5CUqKsCMWRk7HE.682998uOXse41IMBp2oVyknPNp014CC9Mu8Zh2",
        name: "Test user",
        bio: "Test bio",
        createdAt: new Date("2025-05-20T08:31:41.836Z"),
        updatedAt: new Date("2025-05-20T08:31:41.836Z"),
      };

      const repoSpy = jest
        .spyOn(usersRepository, "validateSave")
        .mockImplementationOnce(async (a, b) => actualUser);

      /// Act
      const response = authService.signUp(payload);
      /// Assert
      expect(response).rejects.toThrow(ConflictException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith(payload.email, payload.username);
    });
  });

  describe("Login", () => {
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
        password:
          "$2b$10$5CUqKsCMWRk7HE.682998uOXse41IMBp2oVyknPNp014CC9Mu8Zh2",
        name: "Test user",
        bio: "Test bio",
        createdAt: new Date("2025-05-20T08:31:41.836Z"),
        updatedAt: new Date("2025-05-20T08:31:41.836Z"),
      };

      const repoSpy = jest
        .spyOn(usersRepository, "findOne")
        .mockImplementationOnce(async (a, b) => actualUser);

      /// Act
      const response = await authService.signIn(payload);
      /// Assert
      expect(response).toHaveProperty("accessToken");
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
      const response = authService.signIn(payload);
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
        password:
          "$2b$10$5CUqKsCMWRk7HE.682998uOXse41IMBp2oVyknPNp014CC9Mu8Zh2",
        name: "Test user",
        bio: "Test bio",
        createdAt: new Date("2025-05-20T08:31:41.836Z"),
        updatedAt: new Date("2025-05-20T08:31:41.836Z"),
      };

      const repoSpy = jest
        .spyOn(usersRepository, "findOne")
        .mockImplementationOnce(async (a, b) => actualUser);

      /// Act
      const response = authService.signIn(payload);
      /// Assert
      expect(response).rejects.toThrow(UnauthorizedException);
      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith(payload.email, true);
    });
  });
});
