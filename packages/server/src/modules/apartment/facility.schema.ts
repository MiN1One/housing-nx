import { IFacility } from "@MiN1One/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Facility implements IFacility {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  description: string;
}

export const FacilitySchema = SchemaFactory.createForClass(Facility);
export type FacilityDocument = Facility & Document;