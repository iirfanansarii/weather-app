// export interface TypeOrmConfig {
//   database: string;
//   entities: string[];
//   host: string;
//   password: string;
//   port: number;
//   synchronize: boolean;
//   type: string;
//   schema: string;
//   logging: boolean;
//   username: string;
//   autoLoadEntities: boolean;
//   extra: {
//     trustedConnection: boolean;
//   };
//   requestTimeout: number;
// }
// export const typeOrmConfig: TypeOrmConfig = {
//   database: process.env.DATA_BASE_NAME || 'FRYDAY_FLAVORS_USER_MANAGEMENT',
//   entities: ['dist/**/*.entity.js', 'src/**/*.entity.js'],
//   host: process.env.DATA_BASE_HOST || 'localhost',
//   password: process.env.DATA_BASE_PASSWORD || 'faryday$flavors@123',
//   port: parseInt(process.env.DATA_BASE_PORT || '3306'),
//   synchronize: false,
//   type: 'mssql',
//   schema: process.env.DATA_BASE_SCHEMA_NAME || '',
//   logging: true,
//   username: process.env.DATA_BASE_USER_NAME || 'faryday-flavors',
//   autoLoadEntities: true,
//   extra: {
//     trustedConnection: true,
//   },
//   requestTimeout: parseInt(process.env.API_REQUEST_TIMEOUT || '60000'),
// };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'faryday-flavors',
  password: 'faryday$flavors@123',
  database: 'fryday_flavors_user_management',
  synchronize: false,
  retryAttempts: 10,
  retryDelay: 3000,
  logging: true,
  logger: 'advanced-console',
};

export default typeOrmConfig;
