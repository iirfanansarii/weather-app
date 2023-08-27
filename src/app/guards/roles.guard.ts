import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AppRoles } from '../constants/app.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @constructor
   * @param jwtService
   * @param reflector
   * called when RolesGuard is created
   */
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  /**
   * @description : validate user/employee based on the roles
   * @name : validateRoles
   * @param request
   * @param role
   * @returns true or false
   */
  private validateRoles(request: any, role: string) {
    if (!!request.headers?.authorization) {
      let token = request.headers?.authorization?.toString().trim();
      if (token.search('bearer') >= 0) {
        token = token.replace('bearer', '').trim();
      }
      if (token.search('Bearer') >= 0) {
        token = token.replace('Bearer', '').trim();
      }
      const tokenData: any = this.jwtService.decode(token);
      if (tokenData.role === role) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * @description: get the request and metadata and pass into the validateRoles
   * @name : canActivate
   * @param context
   * @returns true or false
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = this.reflector.get<string>('role', context.getHandler());
    return this.validateRoles(request, role);
  }
}

/**
 * @name : Roles
 * @description: sets metadata role
 * @param role : AppRoles
 * @returns
 */
export const Roles = (role: AppRoles) => {
  return (target: any, key: any, descriptor: any) => {
    SetMetadata('role', role)(target, key, descriptor);
    UseGuards(RolesGuard)(target, key, descriptor);
  };
};
