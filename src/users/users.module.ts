import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './users.controller';
import { Video } from 'src/typeorm/entities/Video';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Comment } from 'src/typeorm/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Comment])],
  providers: [UsersService, CloudinaryService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
