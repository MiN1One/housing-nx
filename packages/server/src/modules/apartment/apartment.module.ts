import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { FactoryModule } from '@MiN1One/api-factory';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ApartmentDocument, ApartmentSchema } from './apartment.schema';
import { ApartmentService } from './apartment.service';
import { appConfigLoader } from '../app/app.config';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ApartmentDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          { name: 'Apartment', schema: ApartmentSchema },
        ]),
      ],
      inject: [getModelToken('Apartment'), appConfigLoader.KEY],
    }),
  ],
})
export class ApartmentModule {}
