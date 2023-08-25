import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmployeeManagementService } from '../services/employee-management.service';
import { AddEmployeeDto } from '../utility/dto/add-employee.dto';
import { EditEmployeeDto } from '../utility/dto/edit-employee.dto';
import { OperationType } from '../constants/app.enum';

@Controller('employee-management')
export class EmployeeManagementController {
  /**
   *@constructor
   * @param employeeService:UserManagementService
   * called when the UserManagementController is created
   */
  constructor(private readonly employeeService: EmployeeManagementService) {}

  /**
   * @name : getAllUsers
   * @description : get all fryday flavors users
   * @method : Get
   * @returns return array of the userList
   */
  @Get('all/employees')
  private getAllEmployees() {
    return this.employeeService.getAllEmployee();
  }

  /**
   * get all employee by email
   * @param query
   * @returns
   */
  @Get('employee')
  private async getEmployeeById(@Query() query: any) {
    return this.employeeService.getEmployeeById(query?.email, false);
  }

  /**
   * @name: createNewUser
   * @param addUserDto:AddUserDto
   * @description:  Handles HTTP POST requests to create a new user.
   * @returns returns success or fail message
   */
  @Post('/add/employee')
  private addNewEmployee(@Body() addEmployeeDetails: AddEmployeeDto) {
    return this.employeeService.addEmployee(addEmployeeDetails);
  }

  /**
   * @method POST
   * @param editEmployeeDto
   * @returns
   */
  @Post('update/user')
  private updateEmployeeDetails(@Body() editEmployeeDto: EditEmployeeDto) {
    return this.employeeService.updateEmployee(
      editEmployeeDto,
      OperationType.Update,
      '',
    );
  }
}
