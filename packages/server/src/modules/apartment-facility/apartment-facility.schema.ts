import { IApartmentFacility, LocaleStringSchema } from "@MiN1One/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IWithLocale } from "libs/interfaces/src/interfaces/locale.interface";
import slugify from 'slugify';

@Schema()
export class ApartmentFacility implements IApartmentFacility {
  @Prop({ type: LocaleStringSchema, required: true })
  title: IWithLocale;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  description: string;
}

export const ApartmentFacilitySchema = SchemaFactory.createForClass(ApartmentFacility);
export type ApartmentFacilityDocument = ApartmentFacility & Document;

ApartmentFacilitySchema.pre('save', function(next) {
  this.handle = slugify(this.title.en);
  next();
});
