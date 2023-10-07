import { IApartmentRule, LocaleStringSchema } from '@MiN1One/interfaces';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IWithLocale } from 'libs/interfaces/src/interfaces/locale.interface';
import slugify from 'slugify';

export class ApartmentRule implements IApartmentRule {
  @Prop({ type: LocaleStringSchema, required: true })
  title: IWithLocale;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  icon: string;
}

export const ApartmentRuleSchema = SchemaFactory.createForClass(ApartmentRule);
export type ApartmentRuleDocument = ApartmentRule & Document;

ApartmentRuleSchema.pre('save', function(next) {
  this.handle = slugify(this.title.en);
  next();
});
