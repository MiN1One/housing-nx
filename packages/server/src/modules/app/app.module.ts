import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { appConfigLoader } from './app.config';
import { ApartmentModule } from '../apartment/apartment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModule } from '../booking/booking.module';
import { ReviewModule } from '../review/review.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigLoader],
      isGlobal: true,
      cache: true,
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
    BookingModule,
    ReviewModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
