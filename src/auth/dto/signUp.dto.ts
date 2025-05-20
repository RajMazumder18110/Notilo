/** @notice Library imports */
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsStrongPassword,
} from "class-validator";
/// Local imports
import { NewUserPayload } from "@app/users/users.type";

export class SignUpDto implements NewUserPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
