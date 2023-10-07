import { Module } from '@nestjs/common';
import { FactoryModule } from '@MiN1One/api-factory';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  ApartmentFacilityDocument,
  ApartmentFacilitySchema,
} from './apartment-facility.schema';
import { appConfigLoader } from '../app/app.config';
import { ApartmentFacilityController } from './apartment-facility.controller';
import { ApartmentFacilityService } from './apartment-facility.service';

@Module({
  controllers: [ApartmentFacilityController],
  providers: [ApartmentFacilityService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ApartmentFacilityDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          { name: 'ApartmentFacility', schema: ApartmentFacilitySchema },
        ]),
      ],
      inject: [getModelToken('ApartmentFacility'), appConfigLoader.KEY],
    }),
  ],
})
export class ApartmentFacilityModule {}
