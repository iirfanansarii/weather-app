import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
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
