import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [TypeOrmModule.forRoot(), DatabaseModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
