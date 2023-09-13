import { FactoryModule } from '@MiN1One/api-factory';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { Booking, BookingDocument, BookingSchema } from './booking.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { appConfigLoader } from '../app/app.config';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<BookingDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          {
            name: Booking.name,
            schema: BookingSchema,
          },
        ]),
      ],
      inject: [getModelToken(Booking.name), appConfigLoader.KEY],
    }),
  ],
})
export class BookingModule {}
