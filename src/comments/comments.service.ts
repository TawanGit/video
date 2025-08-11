import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { Comment } from 'src/typeorm/entities/Comment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { Video } from 'src/typeorm/entities/Video';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOne({
      where: { id: createCommentDto.userId },
    });

    const video = await this.videoRepository.findOne({
      where: { id: createCommentDto.videoId },
    });

    if (!user) {
      throw new NotFoundException('User não encontrado');
    }

    if (!video) {
      throw new NotFoundException('Video não encontrado');
    }

    const newComment = this.commentRepository.create({
      text: createCommentDto.text,
      user: user,
      video: video,
    });
    return await this.commentRepository.save(newComment);
  }
}
