import { Module } from '@nestjs/common';
import { FactoryModule } from '@MiN1One/api-factory';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  ApartmentRuleDocument,
  ApartmentRuleSchema,
} from './apartment-rule.schema';
import { appConfigLoader } from '../app/app.config';
import { ApartmentRuleController } from './apartment-rule.controller';
import { ApartmentRuleService } from './apartment-rule.service';

@Module({
  controllers: [ApartmentRuleController],
  providers: [ApartmentRuleService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ApartmentRuleDocument>, appConfig) => ({
        model,
        appConfig,
      }),
      imports: [
        MongooseModule.forFeature([
          { name: 'ApartmentRule', schema: ApartmentRuleSchema },
        ]),
      ],
      inject: [getModelToken('ApartmentRule'), appConfigLoader.KEY],
    }),
  ],
})
export class ApartmentRuleModule {}
