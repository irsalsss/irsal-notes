import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Personal Engineering Platform API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`Swagger JSON written to ${outputPath}`);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
