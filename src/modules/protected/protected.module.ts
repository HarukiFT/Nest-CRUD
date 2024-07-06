import { Module } from '@nestjs/common';
import { ProtectedController } from './protected.controller';
import { ProtectedService } from './protected.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [ProtectedController],
  providers: [ProtectedService]
})
export class ProtectedModule {}
