/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto.user';

import { User } from './user-schema';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.message,
      createUserDto.room,
    );
  }
  @Get()
  async getUsers(@Param('room') room: string): Promise<User[]> {
    return this.usersService.getUsers(room);
  }
}
