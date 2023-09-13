import { IApartment, IReview, IUser } from '@MiN1One/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from '../user/user.schema';
import { Apartment } from '../apartment/apartment.schema';

@Schema({
  toJSON: { virtuals: true },
  timestamps: true,
})
export class Review implements IReview {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  reviewer: string | IUser;

  @Prop({ type: String, required: true })
  review: string;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  forReview?: string | IUser;

  @Prop({ type: SchemaTypes.ObjectId, ref: Apartment.name, required: true })
  apartment: string | IApartment;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
export type ReviewDocument = Review & Document;
