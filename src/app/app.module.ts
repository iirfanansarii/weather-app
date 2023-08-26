import { Module } from '@nestjs/common';
import { Master } from './constants/master.mapping.constants';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';
import { typeOrmConfig } from '../config/typeOrm.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  AppModuleControllers,
  AppModuleService,
} from './constants/app.module.constants';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature(Master),
  ],
  controllers: AppModuleControllers,
  providers: AppModuleService,
})
export class AppModule {}
