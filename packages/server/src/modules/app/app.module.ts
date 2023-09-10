import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfigLoader } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigLoader],
      isGlobal: true,
      cache: true
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
