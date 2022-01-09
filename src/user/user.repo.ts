/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User, UserDocument } from './user-schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(
      { usersFilterQuery },
      { __v: 0, _id: 0, room: 0 },
    );
  }
}
