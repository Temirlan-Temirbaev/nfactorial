import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Character, Episode, Location } from './core/entities';
import { WithPagination } from './shared/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  const config = new DocumentBuilder()
    .setTitle('Rick and Morty API')
    .setDescription('The Rick and Morty API documentation')
    .setVersion('1.0')
    .addTag('characters', 'Character endpoints')
    .addTag('locations', 'Location endpoints')
    .addTag('episodes', 'Episode endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Character, Episode, Location, WithPagination]
  });
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
