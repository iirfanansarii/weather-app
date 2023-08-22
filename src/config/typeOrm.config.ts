import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATA_BASE_HOST || '',
  port: parseInt(process.env.DATA_BASE_PORT || '5432'),
  username: process.env.DATA_BASE_USER_NAME || '',
  password: process.env.DATA_BASE_PASSWORD || '',
  database: process.env.DATA_BASE_NAME || '',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity.js', 'src/**/*.entity.js'],
  autoLoadEntities: true,
  extra: {
    trustedConnection: true,
  },
};

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
//   retryAttempts: number;
//   retryDelay: number;
//   extra: {
//     trustedConnection: boolean;
//   };
//   requestTimeout: number;
// }

// export const typeOrmConfig: TypeOrmConfig = {
//   type: 'mssql',
//   host: process.env.DATA_BASE_HOST || '',
//   port: parseInt(process.env.DATA_BASE_PORT || '3306'),
//   username: process.env.DATA_BASE_USER_NAME || '',
//   password: process.env.DATA_BASE_PASSWORD || '',
//   database: process.env.DATA_BASE_NAME || '',
//   synchronize: false,
//   retryAttempts: 10,
//   retryDelay: 3000,
//   logging: true,
//   entities: ['dist/**/*.entity.js', 'src/**/*.entity.js'],
//   schema: process.env.DATA_BASE_SCHEMA_NAME || '',
//   autoLoadEntities: true,
//   extra: {
//     trustedConnection: true,
//   },
//   requestTimeout: parseInt(process.env.API_REQUEST_TIMEOUT || '60000'),
// };
