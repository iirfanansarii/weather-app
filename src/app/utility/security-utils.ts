import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityUtilityService {
  /**
   * @constructor
   * @param jwtService
   * this method is called when SecurityUtilityService is created
   */
  constructor(private jwtService: JwtService) {}

  /**
   * @name:encryptPassword
   * @param password
   * @returns return hashed password
   */
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * @name: decryptPassword
   * @param password
   * @param hashPassword
   * @returns return true or false
   */
  async decryptPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  /**
   * @name: createJwtToken
   * @param payload
   * @returns returns jwt token
   */
  async createJwtToken(
    payload: Record<string, string | number | string[]>,
  ): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
