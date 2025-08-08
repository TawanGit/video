import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
}
