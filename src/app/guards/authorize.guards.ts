import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EmployeeManagementService } from '../services/employee-management.service';

@Injectable()
export class AuthorizeEmployee implements CanActivate {
  /**
   * @constructor
   * @param jwtService :JwtService service
   * @param employeeService :EmployeeManagementServiceP
   * called when the AuthorizeEmployee is created
   */
  constructor(
    private jwtService: JwtService,
    private employeeService: EmployeeManagementService,
  ) {}

  /**
   * @name: checkEmployeeIsDeletedOrNot
   * @description : Checks employee is deleted or not
   * @param request : any request type
   * @return : return true or false
   */
  private async checkEmployeeIsDeletedOrNot(request: any): Promise<boolean> {
    if (!!request.headers?.authorization) {
      let token = request.headers?.authorization?.toString().trim();
      if (token.search('bearer') >= 0) {
        token = token.replace('bearer', '').trim();
      }
      if (token.search('Bearer') >= 0) {
        token = token.replace('Bearer', '').trim();
      }
      const tokenData: any = this.jwtService.decode(token);
      const employeeDetails: any = await this.employeeService
        .getEmployeeById(tokenData.email, true)
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
