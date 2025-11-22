import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  try {
    // Disable DB connection for swagger generation
    process.env.SWAGGER_GEN = 'true';

    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });

    const config = new DocumentBuilder()
      .setTitle('Personal Engineering Platform API')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    
    const outputPath = path.resolve(process.cwd(), 'swagger.json');
    fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
    console.log(`Swagger JSON written to ${outputPath}`);

    await app.close();
  } catch (error) {
    console.error('Swagger generation failed:', error);
    process.exit(1);
  }
}
bootstrap();
