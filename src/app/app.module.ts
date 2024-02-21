import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AppModuleControllers,
  AppModuleService,
} from './constants/app.module.constants';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), HttpModule],
  controllers: AppModuleControllers,
  providers: AppModuleService,
})
export class AppModule {}
