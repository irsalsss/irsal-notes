import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  // Strip potential quotes and trailing slashes
  const origins = frontendUrl
    .split(',')
    .map((url) => url.trim().replace(/\/$/, '').replace(/^['"]|['"]$/g, ''));

  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS: allowing origins: ${origins.join(', ')}`);

  app.enableCors({
    origin: origins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Set-Cookie',
      'Cookie',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Personal Engineering Platform API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  try {
    fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
    console.log(`Swagger JSON written to ${outputPath}`);
  } catch (error) {
    console.warn(`Could not write Swagger JSON to ${outputPath}: ${error.message}`);
  }

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
