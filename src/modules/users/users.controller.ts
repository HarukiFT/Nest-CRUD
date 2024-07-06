import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.usersService.createUser(createUserDto)
    }
}
