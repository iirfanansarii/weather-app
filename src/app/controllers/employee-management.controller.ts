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
   * called when the EmployeeManagementService is created
   */
  constructor(private readonly employeeService: EmployeeManagementService) {}

  /**
   * @name: getAllUsers
   * @method : Get
   * @description : get all fryday flavors users
   * @returns return array of the employee list
   */
  @Get('all/employees')
  private getAllEmployees() {
    return this.employeeService.getAllEmployee();
  }

  /**
   * @name : getEmployeeById
   * @method: GET
   * @description: get employee by emailId
   * @queryParam : validate employee email from query parameters
   * @returns Return object of employee details
   */
  @Get('employee')
  private async getEmployeeById(@Query() query: any) {
    return this.employeeService.getEmployeeById(query?.email, false);
  }

  /**
   * @name: addNewEmployee
   * @method: Post
   * @description:  Handles HTTP POST requests to create a new user.
   * @param addUserDto:AddUserDto
   * @returns returns success or fail message
   */
  @Post('/add/employee')
  private addNewEmployee(@Body() addEmployeeDetails: AddEmployeeDto) {
    return this.employeeService.addEmployee(addEmployeeDetails);
  }

  /**
   * @name: updateEmployeeDetails
   * @method POST
   * @description : insert employee data into table
   * @param editEmployeeDto
   * @returns returns success or fail message
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
