import { IWithLocale, LocaleTypes } from '../interfaces/locale.interface';
import { IsString } from 'class-validator';

export class LocaleStringDto implements IWithLocale {
  @IsString()
  uz: LocaleTypes;

  @IsString()
  ru: LocaleTypes;

  @IsString()
  en: LocaleTypes;
}
