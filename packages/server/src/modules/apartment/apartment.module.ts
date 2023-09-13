import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { FactoryModule } from '@MiN1One/api-factory';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  Apartment,
  ApartmentDocument,
  ApartmentSchema,
} from './apartment.schema';
import { ApartmentService } from './apartment.service';
import { Facility, FacilitySchema } from './facility.schema';
import { Bill, BillSchema } from './bill.schema';
import { ApartmentRule, ApartmentRuleSchema } from './apartment-rule.schema';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<ApartmentDocument>) => ({ model }),
      imports: [
        MongooseModule.forFeature([
          { name: Apartment.name, schema: ApartmentSchema },
          { name: Facility.name, schema: FacilitySchema },
          { name: Bill.name, schema: BillSchema },
          { name: ApartmentRule.name, schema: ApartmentRuleSchema },
        ]),
      ],
      inject: [getModelToken(Apartment.name)],
    }),
  ],
})
export class ApartmentModule {}
