import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AppModuleControllers,
  AppModuleService,
} from './constants/app.module.constants';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    HttpModule,
    ThrottlerModule.forRoot([
      {
        ttl: 10, // seconds
        limit: 2, // request limit in every 60 seconds
      },
    ]),
  ],
  controllers: AppModuleControllers,
  providers: AppModuleService,
})
export class AppModule {}
