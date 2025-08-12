import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return this.commentsService.create(createCommentDto);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @Get(':id')
  getComments(@Param('id') videoId: number) {
    return this.commentsService.getComments(videoId);
  }
}
