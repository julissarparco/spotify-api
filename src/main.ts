import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigurationService } from './configuration/configuration.service';

async function bootstrap() {
  const api = await NestFactory.create(AppModule, {
    cors: true,
    logger: new ConsoleLogger(),
  });

  const config = new DocumentBuilder()
    .setTitle('Spotify API')
    .setDescription('API for interacting with Spotify')
    .setVersion('1.0')
    .addTag('Spotify')
    .build();

  const document = SwaggerModule.createDocument(api, config);
  SwaggerModule.setup('docs', api, document);

  api.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configurationService = api.get(ConfigurationService);
  await api.listen(configurationService.httpPort());
}
bootstrap();
