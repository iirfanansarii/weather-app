import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { Response } from '../constants/response';
import { MessageType, OperationType } from '../constants/app.enum';
import { EmployeeRequest } from '../constants/employee.requests';

@Injectable()
export class EmployeeManagementService {
  /**
   *@constructor
   * @param employeeEntity:UserEntity
   * called when EmployeeManagementService is created
   */
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  /**
   * @name : getAllEmployee
   * @description: Retrieves all employees from the database.
   * @returns A Promise that resolves to an array of EmployeeEntity.
   */
  async getAllEmployee(): Promise<Response> {
    const employee = await this.getAllEmployeeDetailQuery(true).execute();
    return new Response(MessageType.Success, employee);
  }

  /**
   * @description:  get all employees
   * @param includeDeleted
   * @returns Returns query
   */
  getAllEmployeeDetailQuery(
    includeDeleted: boolean,
  ): SelectQueryBuilder<EmployeeEntity> {
    const dbQuery = this.createSelectQueryForAllEmployeeDetails(includeDeleted);
    return dbQuery;
  }

  /**
   * @name : getEmployeeById
   * @description: get employee by emailId
   * @input : employeeId,includeDeletedEmployee(true : look in deleted employee as well, false : not look in deleted employee )
   * @return :  Return Object of EmployeeEntity who matches with employeeId
   *
   */
  async getEmployeeById(
    employeeId: string,
    includeDeletedEmployee: boolean,
  ): Promise<any> {
    const responseData = includeDeletedEmployee
      ? await this.getSingleEmployeeQuery(employeeId).execute()
      : await this.getSingleActiveEmployeeQuery(employeeId).execute();
    return new Response(MessageType.Success, responseData);
  }

  /**
   * @name: getSingleActiveEmployeeQuery
   * @description: get single active employee by employeeId
   * @param employeeId
   * @returns returns query
   */
  getSingleActiveEmployeeQuery(
    employeeId: string,
  ): SelectQueryBuilder<EmployeeEntity> {
    if (employeeId) {
      const query = this.createSelectQueryForAllEmployeeDetails(false);
      query.where(` employee_email = :employeeId AND is_deleted = 0`, {
        employeeId: employeeId.toLowerCase(),
      });
      return query;
    } else {
      throw new Error('employeeId is mandatory');
    }
  }

  /**
   * @name: getSingleEmployeeQuery
   * @description: get single employee by employeeId
   * @param employeeId
   * @returns returns query
   */
  getSingleEmployeeQuery(
    employeeId: string,
  ): SelectQueryBuilder<EmployeeEntity> {
    if (employeeId) {
      const query = this.createSelectQueryForAllEmployeeDetails(true);
      query.where(`employee_email = :emailAddress `, {
        emailAddress: employeeId.toLowerCase(),
      });
      return query;
    } else {
      throw new Error('employeeId is mandatory');
    }
  }

  /**
   * @name : createSelectQueryForAllEmployeeDetails
   * @description: create query to get all employee data
   * @param: includeDeleted - include deleted employee or not
   * @returns Returns query
   */
  private createSelectQueryForAllEmployeeDetails(
    includeDeleted: boolean,
  ): SelectQueryBuilder<EmployeeEntity> {
    const query = this.employeeEntity.createQueryBuilder('FFUM').select(
      `DISTINCT 
        FFUM.id,
        FFUM.employee_name,
        FFUM.employee_email,
        FFUM.access_type_id,
        FFUM.has_global_access,
        FFUM.role_id,
        FFUM.phone_number,
        FFUM.password,
        FFUM.pin,
        FFUM.is_active,
        FFUM.is_deleted`,
    );
    if (!includeDeleted) {
      query.where(`FFUM.isDeleted = 0`);
    }
    return query;
  }

  /**
   * @name createDataToInsertUpdate
   * @description : get all employees arrays
   * @param data
   * @param key
   * @param logInUser
   * @returns: returns arrays of employees
   */
  createDataToInsertUpdate(data: any, key: string, logInUser?: string) {
    return new EmployeeRequest(data, key, logInUser);
  }

  /**
   * @description : update the employee details in to employee table
   * @name updateEmployee
   * @param data
   * @param operationType
   * @param logInUserId
   * @returns
   */
  async updateEmployee(data: any, operationType: string, logInUserId?: string) {
    const dataToUpdate: EmployeeRequest = this.createDataToInsertUpdate(
      data,
      operationType,
      logInUserId,
    );
    const message = await this.employeeEntity
      .save(dataToUpdate)
      .then(() =>
        operationType === OperationType.Delete
          ? dataToUpdate.employeeName + ' is deleted successfully.'
          : 'Changes for ' + dataToUpdate.emailAddress + ' saved Successfully.',
      );
    return new Response(message);
  }
}
