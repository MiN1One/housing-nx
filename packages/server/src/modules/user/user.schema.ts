import {
  DEFAULT_USER,
  EMaritalStatuses,
  EUserTypes,
  IUser,
  MaritalStatusTypes,
  UserTypes,
} from '@MiN1One/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IReview } from 'libs/interfaces/src/interfaces/review.interfaces';
import { SchemaTypes } from 'mongoose';
import { Review } from '../review/review.schema';

@Schema({
  toJSON: { virtuals: true },
  timestamps: true,
})
export class User implements IUser {
  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, unique: true, required: true })
  phoneNumber: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, enum: Object.keys(EMaritalStatuses), required: true })
  maritalStatus: MaritalStatusTypes;

  @Prop({ type: Number, default: 1 })
  rating: number;

  @Prop({ type: String, enum: Object.keys(EUserTypes), default: DEFAULT_USER })
  type: UserTypes;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Review.name }])
  reviews: IReview[] | string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
