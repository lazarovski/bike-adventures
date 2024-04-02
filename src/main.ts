import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './filters/prisma.error.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  // filters
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // SwaggerModule
  const config = new DocumentBuilder()
    .setTitle('Bike adventures')
    .setDescription(
      'Bike Adventures is an application that allows users to discover and schedule bike events.',
    )
    .addServer('http://localhost:3000/', 'Local environment')
    .setVersion('1.0')
    .addTag('bikes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, document);

  await app.listen(3000);
}
bootstrap();
