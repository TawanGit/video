import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  title: string;

  description: string;
}
