import { Observable } from 'rxjs';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EmployeeManagementService } from '../services/employee-management.service';
import { SecurityUtilityService } from '../utility/security-utils';

@Injectable()
export class AuthorizeEmployee implements CanActivate {
  /**
   * @constructor
   * @param jwtService :JwtService service
   * @param employeeService :EmployeeManagementServiceP
   * called when the AuthorizeEmployee is created
   */
  constructor(
    private employeeService: EmployeeManagementService,
    private securityUtilityService: SecurityUtilityService,
  ) {}

  /**
   * @name: checkEmployeeIsDeletedOrNot
   * @description : Checks employee is deleted or not
   * @param request : any request type
   * @return : return true or false
   */
  private async checkEmployeeIsDeletedOrNot(request: any): Promise<boolean> {
    if (!!request.headers?.authorization) {
      const token = request.headers?.authorization?.toString().trim();
      const tokenData = await this.securityUtilityService.decodeJwtToken(token);
      request.employee = { email: tokenData.email, role: tokenData.role };
      const employeeDetails: any = await this.employeeService
        .getEmployeeById(tokenData.email, false)
        .then((res) => res.content[0]);
      if (!!employeeDetails) {
        return !employeeDetails?.isDeleted;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * @name: canActivate
   * @description : implemented method from CanActivate interface
   * @param context : ExecutionContext
   * @return : return true or false
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.checkEmployeeIsDeletedOrNot(request);
  }
}
