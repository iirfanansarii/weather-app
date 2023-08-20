import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/User';
import logger from 'logger';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns A Promise that resolves to an array of UserEntity.
   */
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new Error('No users found.');
    }
    return users;
  }

  /**
   * Creates a new user in the database.
   * @param userData - The data for creating a new user.
   * @returns A Promise that resolves to the newly created user.
   */
  async createNewUser(userData: any) {
    try {
      const newUser = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }
}
