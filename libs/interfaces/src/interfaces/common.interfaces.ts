export enum EInstalments {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  DAILY = 'Daily',
  WEEKLY = 'Weekly'
}

export type InstalmentTypes = keyof typeof EInstalments;

export interface IImage {
  alt: string | null;
  src: string;
}

export interface IWithHandle {
  title: string;
  handle: string;
}

export enum EGenders {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum ECurrencies {
  LOCAL = 'Local',
  FOREIGN = 'Foreign'
}

export interface IWithTimeStamp {
  updatedAt?: string;
  createdAT?: string;
}

export type CurrencyTypes = keyof typeof ECurrencies;

export type GenderTypes = keyof typeof EGenders;