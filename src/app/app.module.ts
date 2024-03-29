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
        ttl: 10,
        limit: 2,
      },
    ]),
  ],
  controllers: AppModuleControllers,
  providers: AppModuleService,
})
export class AppModule {}
