/** @notice Library imports */
import { type Response } from "express";
import { Test, TestingModule } from "@nestjs/testing";
/// Local imports
import { AuthService } from "../auth.service";
import { AuthController } from "../auth.controller";
import { NewUserPayload } from "@app/users/users.type";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(() => ({
      send: jest.fn(),
    })),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
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
});
