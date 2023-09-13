import { IApartment, IBooking, IUser } from "@MiN1One/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from 'mongoose';
import { Apartment } from "../apartment/apartment.schema";

@Schema({
  toJSON: { virtuals: true },
  timestamps: true
})
export class Booking implements IBooking {
  @Prop({ type: Boolean })
  accepted: boolean;

  @Prop({ type: String })
  requestMessage: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Apartment.name })
  apartment: string | IApartment;

  @Prop({ type: String })
  users: IUser[] | string[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
export type BookingDocument = Booking & Document;