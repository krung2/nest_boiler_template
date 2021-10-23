import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { setUpSwagger } from './config/swagger/swagger';

async function bootstrap() {
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: false }
  );
  const port: number = app.get(ConfigService).get('PORT');
  setUpSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
