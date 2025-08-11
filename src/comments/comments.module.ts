import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { User } from 'src/typeorm/entities/User';
import { Video } from 'src/typeorm/entities/Video';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
