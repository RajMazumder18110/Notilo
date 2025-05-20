/** @notice Library imports */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { type Response } from "express";
/// Local imports
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
  private ACCESS_COOKIE_NAME = "access";
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto
  ) {
    const { accessToken } = await this.authService.signUp(signUpDto);
    /// Adding token into cookie
    res.cookie(this.ACCESS_COOKIE_NAME, accessToken);
  }

  @Post("login")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto
  ) {
    const { accessToken } = await this.authService.signIn(signInDto);
    /// Adding token into cookie
    res.cookie(this.ACCESS_COOKIE_NAME, accessToken);
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(@Res({ passthrough: true }) res: Response) {
    /// Clear the access token from the cookie.
    res.clearCookie(this.ACCESS_COOKIE_NAME);
  }
}
