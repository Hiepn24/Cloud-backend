import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { winstonConfig } from './logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  // CORS cho development và production
  const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL, // Thêm environment variable cho production
  ].filter(Boolean); // Loại bỏ undefined

  app.enableCors({
    origin: allowedOrigins,
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for Task Management with High Availability')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3002);
  console.log(`🚀 Backend running on port ${process.env.PORT ?? 3002}`);
  console.log(`📚 API Documentation: http://localhost:${process.env.PORT ?? 3002}/api`);
}
bootstrap();
