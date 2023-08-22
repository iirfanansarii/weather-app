import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class EmployeeManagementService {
  /**
   *@constructor
   * @param employeeEntity:UserEntity
   */
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns A Promise that resolves to an array of UserEntity.
   */
  async getAllUsers(): Promise<EmployeeEntity[]> {
    return this.employeeEntity.find({
      select: {
        username: true,
        emailAddress: true,
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
      const newUser = this.employeeEntity.create(userData);
      const savedUser = await this.employeeEntity.save(newUser);
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }
}
