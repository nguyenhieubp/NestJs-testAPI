import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: any, idUser: string): Promise<UserDto> {
    try {
      return await this.userRepository.save({ ...user, auth: idUser });
    } catch (error) {
      return error;
    }
  }

  async updateUser(valueUserUpdate: any, id: string) {
    try {
      await this.userRepository.update(id, valueUserUpdate);
      return this.userRepository.findOneById(id);
    } catch (error) {}
  }

  async getUserById(id: string) {
    return await this.userRepository.findOneById(id);
  }
}
