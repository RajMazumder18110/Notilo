/** @notice Library imports */
import { type Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
/// Local imports
import { AuthService } from "../auth.service";
import { AuthController } from "../auth.controller";
import { EnvironmentService } from "@app/config/env/env.service";
import { LoginUserPayload, NewUserPayload } from "@app/users/users.type";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  const mockEnvironmentService = {
    get: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(() => ({
      send: jest.fn(),
    })),
    clearCookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: EnvironmentService,
          useValue: mockEnvironmentService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe("Sign Up", () => {
    it("Should signup the user and return no content", async () => {
      /// Arrange
      const payload: NewUserPayload = {
        email: "test@gmail.com",
        password: "secret",
        name: "Test user",
        username: "testuser",
      };
      const serviceSpy = jest
        .spyOn(authService, "signUp")
        .mockImplementationOnce(async (p) => ({
          accessToken: "access_token",
        }));

      /// Act
      const response = await controller.signUp(mockResponse, payload);
      /// Assert
      expect(response).toBeUndefined(),
        expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(serviceSpy).toHaveBeenCalledWith(payload);
      expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
    });
  });

  describe("Sign In", () => {
    it("Should signIn the user and return no content", async () => {
      /// Arrange
      const payload: LoginUserPayload = {
        email: "test@gmail.com",
        password: "secret",
      };
      const serviceSpy = jest
        .spyOn(authService, "signIn")
        .mockImplementationOnce(async (a) => ({
          accessToken: "access_token",
        }));

      /// Act
      const response = await controller.signIn(mockResponse, payload);
      /// Assert
      expect(response).toBeUndefined(),
        expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(serviceSpy).toHaveBeenCalledWith(payload);
      expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
    });
  });

  describe("LogOut", () => {
    it("Should logout the user and return no content", async () => {
      /// Arrange
      /// Act
      const response = await controller.signOut(mockResponse);
      /// Assert
      expect(response).toBeUndefined();
      expect(mockResponse.clearCookie).toHaveBeenCalledTimes(1);
    });
  });
});
