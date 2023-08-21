import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserManagementService } from '../services/user-management.service';
import { AddUserDto } from '../utility/dto/addUser.dto';

@Controller('user-management')
export class UserManagementController {
  /**
   *@constructor
   * @param userService:UserManagementService
   * called when the UserManagementController is created
   */
  constructor(private readonly userService: UserManagementService) {}

  /**
   * @name : getAllUsers
   * @description : get all fryday flavors users
   * @method : Get
   * @returns return array of the userList
   */
  @Get('getAllUsers')
  private getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * @name: createNewUser
   * @param addUserDto:AddUserDto
   * @description:  Handles HTTP POST requests to create a new user.
   * @returns returns success or fail message
   */
  @Post('/add/user')
  private createNewUser(@Body() addUserDto: AddUserDto) {
    return this.userService.createNewUser(addUserDto);
  }
}
