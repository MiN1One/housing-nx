import { IApartmentUtility } from "@MiN1One/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ApartmentUtility implements IApartmentUtility {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  description: string;
}

export const ApartmentUtilitySchema = SchemaFactory.createForClass(ApartmentUtility);
export type ApartmentUtilityDocument = ApartmentUtility & Document;