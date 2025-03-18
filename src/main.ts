import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/exceptions/excetions.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const logger = new Logger('PetsCare API');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // Obtener instancia de ConfigService
  const port = configService.get<number>('server.port');

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.useGlobalFilters( new ExceptionsFilter());

  await app.listen( port );

  logger.log(`Petscare api running on port ${port}`);
}
bootstrap();
