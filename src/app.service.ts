import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRequest, UserResponse } from './user.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: Omit<UserRequest, 'id'>): Promise<null> {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    await this.userRepository.save(data);

    return null;
  }

  async read(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async list(): Promise<UserResponse[]> {
    return this.userRepository.find();
  }

  async update(id: string, data: Partial<UserRequest>): Promise<void> {
    await this.userRepository.update(id, {
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
