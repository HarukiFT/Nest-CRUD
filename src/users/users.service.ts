import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async createUser(userDto: CreateUserDto): Promise<void> {
        const password: string = await hash(userDto.password, 10)
        userDto.password = password

        await new this.userModel(userDto).save()
    }
}
