import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle("title")
    .setDescription("version. 1")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // dto를 위해 useGlobalPipes 추가
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  SwaggerModule.setup('/api-docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
