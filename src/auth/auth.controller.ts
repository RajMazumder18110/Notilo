/** @notice Library imports */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { type Response } from "express";
/// Local imports
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto
  ) {
    const { accessToken } = await this.authService.signUp(signUpDto);
    /// Adding token into cookie
    res.cookie("access", accessToken);
  }

  @Post("/login")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto
  ) {
    const { accessToken } = await this.authService.signIn(signInDto);
    /// Adding token into cookie
    res.cookie("access", accessToken);
  }
}
