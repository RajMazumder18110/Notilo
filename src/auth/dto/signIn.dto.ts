/** @notice Library imports */
import { IsEmail, IsString, IsStrongPassword } from "class-validator";
/// Local imports
import { LoginUserPayload } from "@app/users/users.type";

export class SignInDto implements LoginUserPayload {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
