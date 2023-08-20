import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Handles HTTP GET requests to retrieve all users.
   * @returns An array of all users in the system.
   */
  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * Handles HTTP POST requests to create a new user.
   * @param createUserData - The data for creating a new user.
   * @returns The newly created user.
   */
  @Post('/create')
  createNewUser(@Body() createUserData: CreateUserDto) {
    return this.userService.createNewUser(createUserData);
  }
}
