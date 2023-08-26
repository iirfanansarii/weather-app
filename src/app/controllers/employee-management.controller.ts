import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EmployeeManagementService } from '../services/employee-management.service';
import { EditEmployeeDto } from '../utility/dto/edit-employee.dto';
import { OperationType } from '../constants/app.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeEmployee } from '../guards/authorize.guards';

@Controller('employee-management')
@ApiTags('employee')
@UseGuards(AuthorizeEmployee)
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
