import { IWithLocale } from "./locale.interface";

export enum EInstalments {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  DAILY = 'Daily',
  WEEKLY = 'Weekly'
}

export const DEFAULT_INSTALMENT: InstalmentTypes = 'MONTHLY';

export type InstalmentTypes = keyof typeof EInstalments;

export interface IImage {
  alt: string | null;
  src: string;
}

export interface IWithTitle {
  title: IWithLocale;
  handle: string;
}

export enum EGenders {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum ECurrencies {
  LOCAL = 'Local',
  FOREIGN = 'Foreign',
  ANY = 'Any'
}

export const DEFAULT_CURRENCY_TYPE: CurrencyTypes = 'ANY';

export interface IWithTimeStamp {
  updatedAt?: string;
  createdAT?: string;
}

export type CurrencyTypes = keyof typeof ECurrencies;

export type GenderTypes = keyof typeof EGenders;