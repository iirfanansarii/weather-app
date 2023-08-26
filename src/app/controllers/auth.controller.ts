import { Body, Controller, Post } from '@nestjs/common';
import { AddEmployeeDto } from '../utility/dto/add-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginEmployeeDto } from '../utility/dto/login-employee.dto';
import { AuthService } from '../services/auth-service';

@Controller('employee-auth')
@ApiTags('auth')
export class AuthController {
  /**
   * @constructor
   * @param authService:AuthService
   * called when the AuthService is created
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @name: addNewEmployee
   * @method: Post
   * @description:  Handles HTTP POST requests to create a new user.
   * @param addUserDto:AddUserDto
   * @returns returns success or fail message
   */
  @Post('/signup')
  private addNewEmployee(@Body() addEmployeeDetails: AddEmployeeDto) {
    return this.authService.addEmployee(addEmployeeDetails);
  }

  /**
   * @name:loginEmployee
   * @method : Post
   * @description : login user with email and password
   * @param loginEmployeeDto : LoginEmployeeDto
   * @returns return token
   */
  @Post('/login')
  private loginEmployee(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.authService.loginEmployee(loginEmployeeDto);
  }
}