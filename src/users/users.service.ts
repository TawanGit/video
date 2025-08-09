import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';
import { UpdateUser } from './dto/update-user';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SubscribeDto } from './dto/subscribe-dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}
  fetchUsers() {
    return this.userRepository.find();
  }
  async createUser(user: UserDto) {
    const userExist = await this.userRepository.findOneBy({
      email: user.email,
    });

    const usernameExist = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (userExist) {
      throw new ConflictException('Email já existe.');
    }

    if (usernameExist) {
      throw new ConflictException('Username já existe');
    }

    const hashPassword = await bcrypt.hash(user.password, 10);
    return this.userRepository.save({
      ...user,
      password: hashPassword,
    });
  }
  async updateUser(updateUser: UpdateUser, photo?: Express.Multer.File) {
    const user = await this.userRepository.findOneBy({ id: updateUser.id });
    if (!user) throw new NotFoundException('User not found');

    if (photo) {
      const photoUrl = await this.cloudinaryService.uploadImage(photo);
      user.photo = photoUrl;
    }

    if (updateUser.username) user.username = updateUser.username;
    if (updateUser.email) user.email = updateUser.email;
    if (updateUser.password) user.password = updateUser.password;

    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

  async subscribe(userId: number, targetUserId: number) {
    if (!userId || !targetUserId)
      throw new BadRequestException('User ids must be provided');
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscriptions'],
    });
    const targetUser = await this.userRepository.findOneBy({
      id: targetUserId,
    });

    if (!user || !targetUser) throw new NotFoundException('User not found');

    // Add targetUser to subscriptions if not already subscribed
    if (!user.subscriptions.find((u) => u.id === targetUserId)) {
      user.subscriptions.push(targetUser);
      await this.userRepository.save(user);
      return { message: 'Subscribed successfully!' };
    } else {
      user.subscriptions = user.subscriptions.filter(
        (item) => item.id !== targetUserId,
      );
      await this.userRepository.save(user);
      return { message: 'Unsubscribed successfully!' };
    }
  }
}
