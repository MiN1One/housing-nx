import { IApartmentRule } from '@MiN1One/interfaces';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class ApartmentRule implements IApartmentRule {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  icon: string;
}

export const ApartmentRuleSchema = SchemaFactory.createForClass(ApartmentRule);
export type ApartmentRuleDocument = ApartmentRule & Document;
