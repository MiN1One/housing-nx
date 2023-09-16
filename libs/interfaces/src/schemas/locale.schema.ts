import { Schema, Prop } from '@nestjs/mongoose';
import { IWithLocale, LocaleTypes } from '../interfaces/locale.interface';

@Schema()
export class LocaleStringSchema implements IWithLocale {
  @Prop({ type: String, required: true })
  ru: LocaleTypes;

  @Prop({ type: String, required: true })
  uz: LocaleTypes;

  @Prop({ type: String, required: true })
  en: LocaleTypes;
}
