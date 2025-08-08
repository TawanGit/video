import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './users.controller';
import { Video } from 'src/typeorm/entities/Video';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
