import { Module } from '@nestjs/common';
import { FactoryModule } from '@MiN1One/api-factory';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  ApartmentUtilityDocument,
  ApartmentUtilitySchema
} from './apartment-utility.schema';
import { appConfigLoader } from '../app/app.config';
import { ApartmentUtilityController } from './apartment-utility.controller';
import { ApartmentUtilityService } from './apartment-utility.service';

@Module({
  controllers: [ApartmentUtilityController],
  providers: [ApartmentUtilityService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ApartmentUtilityDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          { name: 'ApartmentUtility', schema: ApartmentUtilitySchema },
        ]),
      ],
      inject: [getModelToken('ApartmentUtility'), appConfigLoader.KEY],
    }),
  ],
})
export class ApartmentUtilityModule {}
