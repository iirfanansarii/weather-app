import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';

@Injectable()
export class UserManagementService {
  /**
   *@constructor
   * @param userEntity:UserEntity
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns A Promise that resolves to an array of UserEntity.
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userEntity.find({
      select: {
        name: true,
        email: true,
      },
    });
  }

  /**
   * Creates a new user in the database.
   * @param userData - The data for creating a new user.
   * @returns A Promise that resolves to the newly created user.
   */
  async createNewUser(userData: any) {
    try {
      const newUser = this.userEntity.create(userData);
      const savedUser = await this.userEntity.save(newUser);
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }
}
