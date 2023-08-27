import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EmployeeManagementService } from '../services/employee-management.service';
import { AppRoles, OperationType } from '../constants/app.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeEmployee } from '../guards/authorize.guards';
import { Roles } from '../guards/roles.guard';
import { Identity } from '../decorators/identity.decorator';
import { EditEmployeeDto, EmployeeIdentity } from '../utility/dto';

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
  @Roles(AppRoles.Admin)
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
  @Roles(AppRoles.Admin)
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
  @Roles(AppRoles.Admin)
  private updateEmployeeDetails(
    @Body() editEmployeeDto: EditEmployeeDto,
    @Identity() employee: EmployeeIdentity,
  ) {
    return this.employeeService.updateEmployee(
      editEmployeeDto,
      OperationType.Update,
      employee.email,
    );
  }
}
