import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomHttpExceptionFilter } from './app/utility/filters/custom-http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpRef = app.getHttpServer();
  app.useGlobalFilters(new CustomHttpExceptionFilter(httpRef));
  app.setGlobalPrefix('v1');
  app.use(helmet());
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
