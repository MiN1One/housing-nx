/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { API_BASE } from '@MiN1One/interfaces';

import { AppModule } from './modules/app/app.module';
import { appConfigLoader } from './modules/app/app.config';
import { ConfigType } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix(API_BASE);
  const configModules = app.get<ConfigType<typeof appConfigLoader>>(
    appConfigLoader.KEY
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = configModules.appPort ?? 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${API_BASE}`
  );
}

bootstrap().catch((er) => {
  Logger.error('bootstrap', er);
});
