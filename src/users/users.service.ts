import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async createUser(userDto: CreateUserDto): Promise<void> {
        await new this.userModel(userDto).save()
    }
}
