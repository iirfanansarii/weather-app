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
   */
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeEntity: Repository<EmployeeEntity>,
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns A Promise that resolves to an array of UserEntity.
   */
  async getAllEmployee(): Promise<Response> {
    const employee = await this.getAllEmployeeDetailQuery(true).execute();
    return new Response(MessageType.Success, employee);
  }

  /**
   * get all employee details
   * @param includeDeleted
   * @returns
   */
  getAllEmployeeDetailQuery(
    includeDeleted: boolean,
  ): SelectQueryBuilder<EmployeeEntity> {
    const dbQuery = this.createSelectQueryForAllEmployeeDetails(includeDeleted);
    return dbQuery;
  }

  /**
   * get employee by email id
   * @param employeeId
   * @returns
   */
  async getEmployeeById(
    employeeId: string,
    includeDeletedUser: boolean,
  ): Promise<any> {
    const responseData = includeDeletedUser
      ? await this.getSingleEmployeeQuery(employeeId).execute()
      : await this.getSingleActiveEmployeeQuery(employeeId).execute();
    return new Response(MessageType.Success, responseData);
  }

  /**
   * get single active employee query
   * @param employeeId
   * @returns
   */
  getSingleActiveEmployeeQuery(
    employeeId: string,
  ): SelectQueryBuilder<EmployeeEntity> {
    if (employeeId) {
      const query = this.createSelectQueryForAllEmployeeDetails(false);
      query.where(` email = :userId AND is_deleted = 0`, {
        userId: employeeId.toLowerCase(),
      });
      return query;
    } else {
      throw new Error('employeeId is mandatory');
    }
  }

  /**
   *
   * @param employeeId
   * @returns
   */
  getSingleEmployeeQuery(
    employeeId: string,
  ): SelectQueryBuilder<EmployeeEntity> {
    if (employeeId) {
      const query = this.createSelectQueryForAllEmployeeDetails(true);
      query.where(`email = :id `, { id: employeeId.toLowerCase() });
      return query;
    } else {
      throw new Error('employeeId is mandatory');
    }
  }

  /**
   * create query to get all users data
   * @returns
   */
  private createSelectQueryForAllEmployeeDetails(
    includeDeleted: boolean,
  ): SelectQueryBuilder<EmployeeEntity> {
    const query = this.employeeEntity.createQueryBuilder('FFUM').select(
      `DISTINCT 
        FFUM.id,
        FFUM.name,
        FFUM.phone_number ,
        FFUM.pin,
        FFUM.roleId,
        FFUM.is_active,
        FFUM.is_deleted`,
    );
    if (!includeDeleted) {
      query.where(`FFUM.isDeleted = 0`);
    }
    return query;
  }

  /**
   *
   * @param data
   * @param key
   * @param logInUser
   * @returns
   */
  private createDataToInsertUpdate(data: any, key: string, logInUser?: string) {
    return new EmployeeRequest(data, key, logInUser);
  }

  /**
   * Creates a new user in the database.
   * @param userData - The data for creating a new user.
   * @returns A Promise that resolves to the newly created user.
   */
  async addEmployee(data: any, loggedInEmployee?: string) {
    const results = await this.getEmployeeById(data?.userId, true);
    let responseResult: any;
    if (results.content.length === 0) {
      const dataToInsert: EmployeeRequest = this.createDataToInsertUpdate(
        data,
        OperationType.Create,
        loggedInEmployee,
      );
      responseResult = await this.employeeEntity.save(dataToInsert);
    } else if (
      results?.content[0]?.userId.toLowerCase() === data.userId.toLowerCase() &&
      results?.content[0]?.isDeleted
    ) {
      data.version = results.content[0].version;
      responseResult = await this.updateEmployee(
        data,
        OperationType.Update,
        loggedInEmployee,
      );
      responseResult.value = data.userId.toLowerCase();
    }
    if (responseResult) {
      return new Response(
        'User ' + responseResult.username + ' has been added Successfully.',
      );
    }
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
          ? dataToUpdate.username + ' is deleted successfully.'
          : 'Changes for ' + dataToUpdate.emailAddress + ' saved Successfully.',
      );
    return new Response(message);
  }
}
