export enum ELocales {
  en = 'English',
  ru = 'Russian',
  uz = 'Uzbek'
}

export type LocaleTypes = keyof typeof ELocales;

export const LOCALES_LIST = Object.keys(ELocales);
export const DEFAULT_LOCALE: LocaleTypes = 'en';

export interface IWithLocale {
  en: LocaleTypes;
  ru: LocaleTypes;
  uz: LocaleTypes;
}