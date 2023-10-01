import { API_BASE } from '@MiN1One/interfaces';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import fastifyCookie from '@fastify/cookie';
import { ConfigType } from '@nestjs/config';
import { appConfigLoader } from './modules/app/app.config';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const appConfig = app.get<ConfigType<typeof appConfigLoader>>(
    appConfigLoader.KEY
  );

  app.setGlobalPrefix(API_BASE);

  // @ts-ignore
  await app.register(fastifyCookie, {
    secret: appConfig.cookieSecret,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = appConfig.appPort ?? 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${API_BASE}`
  );
}

bootstrap().catch((er) => {
  Logger.error('bootstrap', er);
});
