import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { appConfigLoader } from './app.config';
import { ApartmentModule } from '../apartment/apartment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigLoader],
      isGlobal: true,
      cache: true,
      validate: (config) => {console.log(config); return {}}
    }),
    ApartmentModule,
    MongooseModule.forRootAsync({
      useFactory: ({ dbUrl }: ConfigType<typeof appConfigLoader>) => ({ 
        uri: dbUrl,
        retryDelay: 5000,
        retryAttempts: 5
      }),
      inject: [appConfigLoader.KEY]
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
