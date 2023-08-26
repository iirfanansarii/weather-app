import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { Response } from '../constants/response';
import { OperationType } from '../constants/app.enum';
import { EmployeeRequest } from '../constants/employee.requests';
import { EmployeeLoginData } from '../../interfaces/login-employee.interface';
import { SecurityUtilityService } from '../utility/security-utils';
import { EmployeeManagementService } from './employee-management.service';

@Injectable()
export class AuthService {
  /**
   * @constructor
   * @param employeeEntity:UserEntity
   * called when EmployeeManagementService is created
   */
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
    private securityService: SecurityUtilityService,
    private employeeService: EmployeeManagementService,
  ) {}

  /**
   * @name: addEmployee
   * @description: Creates a new user in the database.
   * @param userData - The data for creating a new user.
   * @returns A Promise that resolves to the newly created user.
   */
  async addEmployee(data: any, loggedInEmployee?: string) {
    const results = await this.employeeService.getEmployeeById(
      data?.employeeId,
      true,
    );
    let responseResult: any;
    if (results.content.length === 0) {
      const dataToInsert: EmployeeRequest =
        this.employeeService.createDataToInsertUpdate(
          data,
          OperationType.Create,
          loggedInEmployee,
        );
      dataToInsert.password = await this.securityService.encryptPassword(
        dataToInsert.password,
      );
      responseResult = await this.employeeEntity.save(dataToInsert);
    } else if (
      results?.content[0]?.employeeId.toLowerCase() ===
        data.employeeId.toLowerCase() &&
      results?.content[0]?.isDeleted
    ) {
      data.version = results.content[0].version;
      responseResult = await this.employeeService.updateEmployee(
        data,
        OperationType.Update,
        loggedInEmployee,
      );
      responseResult.value = data.employeeId.toLowerCase();
    }
    if (responseResult) {
      const token: string = await this.securityService.createJwtToken({
        role: data.roleId,
        email: data.emailAddress,
      });
      return new Response(
        'User ' + responseResult.employeeName + ' has been added Successfully.',
        { access_token: token },
      );
    }
  }

  /**
   * @name : loginEmployee
   * @description : validate employee by email and password and return token
   * @param data : EmployeeLoginData
   * @returns response
   */
  async loginEmployee(data: EmployeeLoginData): Promise<Response> {
    const employee = await this.employeeService.getEmployeeById(
      data.emailAddress,
      false,
    );
    const employeeData = employee.content[0];
    if (!employee) {
      return new Response('Invalid employee ');
    }
    const isPasswordMatched = await this.securityService.decryptPassword(
      data.password,
      employeeData.password,
    );
    if (isPasswordMatched) {
      const token: string = await this.securityService.createJwtToken({
        role: employeeData.role_id,
        email: employeeData.employee_email,
      });
      return new Response('Employee logged in successfully', {
        access_token: token,
      });
    } else {
      return new Response('Invalid password');
    }
  }
}
