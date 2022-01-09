/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user-schema';
import { UsersRepository } from './user.repo';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    username: string,
    message: string,
    room: string,
  ): Promise<User> {
    return this.usersRepository.create({
      username: username,
      message: message,
      room: room,
    });
  }

  async getUsers(room: string): Promise<User[]> {
    return this.usersRepository.find({ payload: room });
  }
}
