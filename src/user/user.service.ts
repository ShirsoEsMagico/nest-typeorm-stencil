import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);
      this.logger.info(`User created: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack);
      throw new NotFoundException('Failed to fetch users');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to find user with ID ${id}`, error.stack);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      this.userRepository.merge(user, updateUserDto);
      const updatedUser = await this.userRepository.save(user);
      this.logger.info(`User updated: ${updatedUser.id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to update user with ID ${id}`, error.stack);
      throw new NotFoundException(`Failed to update user with ID ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      this.logger.info(`User deleted: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete user with ID ${id}`, error.stack);
      throw new NotFoundException(`Failed to delete user with ID ${id}`);
    }
  }
}
