import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from 'src/common/interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

    async signIn(signInDto: SignInDto): Promise<string> {
        const userDocument = await this.userService.findByUsername(signInDto.username)

        if (!userDocument) {
            throw new UnauthorizedException()
        }

        const result: boolean = await compare(signInDto.password, userDocument.password)
        if (!result) {
            throw new UnauthorizedException()
        }

        const payload: JwtPayload = {id: userDocument._id, username: userDocument.username}
        const token: string = await this.jwtService.signAsync(payload)

        return token
    }
}
