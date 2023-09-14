import {
  AcceptedForTypes,
  AcceptedPaymentMethodTypes,
  ApartmentConditionTypes,
  ApartmentRoomTypes,
  CurrencyTypes,
  DEFAULT_ACCEPTED_PAYMENT_METHOD,
  DEFAULT_CURRENCY_TYPE,
  DEFAULT_INSTALMENT,
  EAcceptedForTypes,
  EAcceptedPaymentMethods,
  EApartmentConditions,
  EApartmentRooms,
  ECurrencies,
  EGenders,
  EInstalments,
  GenderTypes,
  IApartment,
  IApartmentAllocation,
  IApartmentPrice,
  IApartmentRooms,
  IApartmentRule,
  IApartmentUtility,
  IApartmentFacility,
  IImage,
  IUser,
  InstalmentTypes,
} from '@MiN1One/interfaces';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Image } from '../../common/schema/image.schema';
import { ApartmentFacility } from '../apartment-facility/apartment-facility.schema';
import { User } from '../user/user.schema';
import { ApartmentUtility } from '../apartment-utility/apartment-utility.schema';
import { ApartmentRule } from '../apartment-rule/apartment-rule.schema';

@Schema()
class ApartmentRooms implements IApartmentRooms {
  @Prop({ type: String })
  numberOfRooms: number;

  @Prop({ type: String, enum: Object.keys(EApartmentRooms) })
  rooms: ApartmentRoomTypes;
}

@Schema()
class ApartmentPrice implements IApartmentPrice {
  @Prop({
    type: String,
    enum: Object.keys(EInstalments),
    default: DEFAULT_INSTALMENT,
  })
  instalment: InstalmentTypes;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({
    type: String,
    enum: Object.keys(ECurrencies),
    default: DEFAULT_CURRENCY_TYPE,
  })
  currencyAccepted: CurrencyTypes;

  @Prop({
    type: String,
    enum: Object.keys(EAcceptedPaymentMethods),
    default: DEFAULT_ACCEPTED_PAYMENT_METHOD,
  })
  method: AcceptedPaymentMethodTypes;
}

@Schema()
class ApartmentAllocation implements IApartmentAllocation {
  @Prop({ type: String, enum: Object.keys(EGenders), required: true })
  gender: GenderTypes;

  @Prop({ type: Number, required: true })
  maxPeople: number;

  @Prop({ type: String, required: true, enum: Object.keys(EAcceptedForTypes) })
  status: AcceptedForTypes;
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  virtuals: true,
})
export class Apartment implements IApartment {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  handle: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: ApartmentFacility.name, required: true }])
  facilities: IApartmentFacility[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: ApartmentUtility.name, required: true }])
  bills: IApartmentUtility[];

  @Prop({ type: ApartmentRooms, required: true })
  rooms: IApartmentRooms;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({
    type: String,
    enum: Object.keys(EApartmentConditions),
    required: true,
  })
  condition: ApartmentConditionTypes;

  @Prop({ type: Boolean })
  payment: any;

  @Prop({ type: Number, default: 1 })
  rating: number;

  @Prop({ type: Boolean, default: false })
  available: boolean;

  @Prop([{ type: Image }])
  images: IImage[];

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  landlord: string | IUser;

  @Prop({ type: ApartmentAllocation, required: true })
  allocation: IApartmentAllocation;

  @Prop([
    { type: SchemaTypes.ObjectId, ref: ApartmentRule.name, required: true },
  ])
  rules: IApartmentRule[];

  @Prop({ type: ApartmentPrice, required: true })
  price: IApartmentPrice;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
export type ApartmentDocument = Apartment & Document;

ApartmentSchema.virtual('reviews', {
  localField: '_id',
  foreignField: 'apartment',
  ref: 'Review',
  options: {
    populate: 'reviewer',
  },
});

ApartmentSchema.virtual('bookings', {
  localField: '_id',
  foreignField: 'apartment',
  ref: 'Booking',
});
