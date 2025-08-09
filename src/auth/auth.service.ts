import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { Repository } from 'typeorm';
import { UserDto } from 'src/users/dto/user-dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Inject()
  private readonly jwtService: JwtService;

  async signin(
    signInDto: SignInDto,
  ): Promise<{ access_token: string; userData: Partial<UserDto> }> {
    const user = await this.userRepository.findOneBy({
      username: signInDto.username,
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    const passwordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciais inválidas');

    const payload = { userId: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      userData: {
        username: user.username,
        photo: user.photo,
        email: user.email,
      },
    };
  }
}
