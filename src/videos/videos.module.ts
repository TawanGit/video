import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Video } from 'src/typeorm/entities/Video';
import { Comment } from 'src/typeorm/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Comment])],
  providers: [VideosService, CloudinaryService],
  controllers: [VideosController],
})
export class VideosModule {}
