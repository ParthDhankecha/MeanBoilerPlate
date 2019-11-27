import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import * as compression from 'compression';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.useGlobalInterceptors(new RefreshTokenInterceptor());
  app.enableCors();
  await app.listen(new ConfigService().get('PORT'));
}
bootstrap();
