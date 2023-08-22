import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Master } from './constants/master.mapping.constants';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from '../config/typeOrm.config';
import {
  AppModuleControllers,
  AppModuleService,
} from './constants/app.module.constants';

@Module({
  controllers: AppModuleControllers,
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature(Master),
  ],
  providers: AppModuleService,
})
export class AppModule {}
