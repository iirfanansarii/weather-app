import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Master } from './constants/master.mapping.constants';
import {
  AppModuleControllers,
  AppModuleService,
} from './constants/app.module.constants';
import typeOrmConfig from '../config/typeOrm.config';

@Module({
  controllers: AppModuleControllers,
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeOrmConfig as TypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature(Master),
  ],
  providers: AppModuleService,
})
export class AppModule {}
