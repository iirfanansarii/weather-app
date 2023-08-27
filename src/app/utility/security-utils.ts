import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DecodedTokenData } from '../../interfaces/decoded-token.interface';

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

  /**
   * @name : decodeJwtToken
   * @description : decode jwt token and returns decoded data
   * @param token
   * @returns jwt decoded data
   */
  async decodeJwtToken(token: string): Promise<DecodedTokenData> {
    if (token.search('bearer') >= 0) {
      token = token.replace('bearer', '').trim();
    }
    if (token.search('Bearer') >= 0) {
      token = token.replace('Bearer', '').trim();
    }
    return this.jwtService.decode(token) as DecodedTokenData;
  }
}
