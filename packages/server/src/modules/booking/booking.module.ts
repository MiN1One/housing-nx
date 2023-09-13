import { FactoryModule } from '@MiN1One/api-factory';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { Booking, BookingDocument, BookingSchema } from './booking.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<BookingDocument>) => ({ model }),
      imports: [
        MongooseModule.forFeature([
          {
            name: Booking.name,
            schema: BookingSchema,
          },
        ]),
      ],
      inject: [getModelToken(Booking.name)],
    }),
  ],
})
export class BookingModule {}
