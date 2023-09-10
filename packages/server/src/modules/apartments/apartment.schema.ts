import { IApartment } from '@MiN1One/interfaces';
import { SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Apartment implements IApartment {}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
export type ApartmentDocument = Apartment & Document;
