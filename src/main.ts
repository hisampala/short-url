import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/modules';
import { ConfigService } from '@nestjs/config';
import { TEnv } from './domain/validate';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const conf = new ConfigService<TEnv>();
  const app = await NestFactory.create(AppModule);
  const port = conf.get('PORT') || 3000;
  await app.listen(3000).then(() => {
    new Logger('NestApplication').log(`Listening on port ${port}`);
  });
}
bootstrap();
