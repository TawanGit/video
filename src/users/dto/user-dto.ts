import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  id?: number;

  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;

  description?: string;
  photo?: string;
}
