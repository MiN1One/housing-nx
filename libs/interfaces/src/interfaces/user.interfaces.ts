import { IWithTimeStamp } from "./common.interfaces";
import { IReview } from "./review.interfaces";

export enum EMaritalStatuses {
  MARRIED = 'Married',
  NOT_MARRIED = 'Not married',
  DIVORCED = 'Divorced',
}

export enum EUserTypes {
  LANDLORD = 'Landlord',
  USER = 'User',
  ADMIN = 'Admin',
  MAINTAINER = 'Maintainer'
}

export const DEFAULT_USER: UserTypes = 'USER';

export type UserTypes = keyof typeof EUserTypes;

export type MaritalStatusTypes = keyof typeof EMaritalStatuses;

export interface IUser extends IWithTimeStamp {
  firstName: string;
  lastName: string;
  maritalStatus: MaritalStatusTypes;
  phoneNumber: string;
  email: string | null;
  type: UserTypes;
  reviews: IReview[] | string[];
  rating: number;
}