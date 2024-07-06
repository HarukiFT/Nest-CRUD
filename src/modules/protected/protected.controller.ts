import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('protected')
export class ProtectedController {
    @Get()
    @UseGuards(AuthGuard)
    test() {
        return 'sure'
    }
}
