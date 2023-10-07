import { IApartment, IReview, IUser } from '@MiN1One/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  toJSON: { virtuals: true },
  timestamps: true,
})
export class Review implements IReview {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  reviewer: string | IUser;

  @Prop({ type: String, required: true })
  review: string;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  forReview?: string | IUser;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Apartment',
    required: true,
  })
  apartment: string | IApartment;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
export type ReviewDocument = Review & Document;
