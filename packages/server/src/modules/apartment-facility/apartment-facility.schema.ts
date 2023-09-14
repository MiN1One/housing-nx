import { IApartmentFacility } from "@MiN1One/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ApartmentFacility implements IApartmentFacility {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  description: string;
}

export const ApartmentFacilitySchema = SchemaFactory.createForClass(ApartmentFacility);
export type ApartmentFacilityDocument = ApartmentFacility & Document;