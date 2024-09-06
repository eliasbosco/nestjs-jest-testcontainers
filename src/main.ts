import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app/app.module';
import { Logger } from '@nestjs/common';
import { CustomExceptionFilter } from './infrastructure/config/custom-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  const API_PORT = parseInt(process.env.API_PORT || '3000');
  
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.API_LOGGER === 'debug'
        ? ['log', 'error', 'warn', 'debug', 'verbose']
        : ['log', 'error', 'warn'],
  });
  app.enableCors();
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(API_PORT).then(() => {
    logger.log(`Application is listening on port ${API_PORT}`);
  });
}
bootstrap();
