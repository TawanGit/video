import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  videoId: number;
  @IsNotEmpty()
  userId: number;
}
