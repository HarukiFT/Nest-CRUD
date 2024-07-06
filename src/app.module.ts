import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProtectedModule } from './protected/protected.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), MongooseModule.forRoot(process.env.DB_CONNECTION!),
    UsersModule,
    AuthModule,
    ProtectedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
