import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Video } from 'src/typeorm/entities/Video';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createVideoDto: CreateVideoDto, video: Express.Multer.File) {
    const user = await this.userRepository.findOne({
      where: { id: createVideoDto.userId },
    });
    if (!user) throw new BadRequestException('User not exist');
    const videoUrl = await this.cloudinaryService.uploadVideo(video);
    const newVideo = this.videoRepository.create({
      title: createVideoDto.title,
      description: createVideoDto.description,
      url: videoUrl,
      user: user,
    });
    await this.videoRepository.save(newVideo);
    return newVideo;
  }
  findAll() {
    return this.videoRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
