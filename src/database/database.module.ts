import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DATABASE_HOST, //Database host
      port: Number(process.env.DATABASE_PORT), //Database port
      username: process.env.DATABASE_USERNAME, //Database username
      password: process.env.DATABASE_PASSWORD, //Database password
      database: 'oracle-db', //Database name
      sid: 'XE', //SID(Service Identifier)
      entities: [User],
      synchronize: true,
      logging: true, //SQL Query Logging(for debugging)
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class DatabaseModule {}
