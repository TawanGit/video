import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUser {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
