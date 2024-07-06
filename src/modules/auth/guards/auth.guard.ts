import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/common/interfaces/jwtPayload.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader: string[] = request.headers['authorization']?.split(' ') ?? []

        if (authHeader.length !== 2 || authHeader[0] !== 'Bearer') {
            throw new UnauthorizedException()
        }

        const token: string = authHeader[1]
        const payload: JwtPayload | null = <JwtPayload>(await this.jwtService.verifyAsync(token))
        
        if (!payload) {
            throw new UnauthorizedException()
        }

        request.user = payload

        return true
    }
}