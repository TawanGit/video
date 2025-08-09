import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { UpdateUser } from './dto/update-user';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.fetchUsers();
  }

  @Post()
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Post('/subscribe')
  subscribe(@Body() body: { userId: number; targetUserId: number }) {
    return this.usersService.subscribe(body.userId, body.targetUserId);
  }

  @Put()
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Body() updateUser: UpdateUser,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.usersService.updateUser(updateUser, photo);
  }
}
