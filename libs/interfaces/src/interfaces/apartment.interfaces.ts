import { IBooking } from "./booking.interfaces";
import { CurrencyTypes, GenderTypes, IImage, IWithHandle, IWithTimeStamp, InstalmentTypes } from "./common.interfaces";
import { IReview } from "./review.interfaces";
import { IUser } from "./user.interfaces";

export interface IFacility extends IWithHandle {
  description: string;
  icon: string;
}

export interface IBill extends IWithHandle {
  description: string;
  icon: string;
}

export interface IApartmentRule extends IWithHandle {
  description: string;
  icon: string;
}

export enum EAcceptedTypes {
  STUDENTS = 'Students',
  FAMILY = 'Family'
}

export type AcceptedTypes = keyof typeof EAcceptedTypes;

export enum EAcceptedPaymentMethods {
  CASH = 'Cash',
  CARD = 'Card',
  ANY = 'Any'
}

export type AcceptedPaymentMethodTypes = keyof typeof EAcceptedPaymentMethods;

export interface IApartmentAllocation {
  gender: GenderTypes;
  maxPeople: number;
  type: AcceptedTypes;
}

export interface IApartmentPrice {
  instalment: InstalmentTypes;
  price: number;
  currencyAccepted: CurrencyTypes;
  method: AcceptedPaymentMethodTypes;
}

export interface IApartment extends IWithTimeStamp, IWithHandle {
  numberOfRooms: number;
  facilities: IFacility[];
  bills: IBill[];
  address: string;
  condition: 'OKAY' | 'NORMAL' | 'LUXE';
  payment: any;
  allocation: IApartmentAllocation;
  price: IApartmentPrice;
  images: IImage[];
  available: boolean;
  landlord: IUser | string;
  bookings: IBooking[] | string[];
  rules: IApartmentRule[];
  reviews: IReview[] | string[];
  rating: number;
}