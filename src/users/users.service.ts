import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  fetchUsers() {
    return this.userRepository.find();
  }
  createUser(user: UserDto) {
    return this.userRepository.save(user);
  }
}
