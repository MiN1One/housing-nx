import { IBooking } from "./booking.interfaces";
import { CurrencyTypes, GenderTypes, IImage, IWithHandle, IWithTimeStamp, InstalmentTypes } from "./common.interfaces";
import { IReview } from "./review.interfaces";
import { IUser } from "./user.interfaces";

export interface IApartmentFacility extends IWithHandle {
  description: string;
  icon: string;
}

export interface IApartmentUtility extends IWithHandle {
  description: string;
  icon: string;
};

export interface IApartmentRule extends IWithHandle {
  description: string;
  icon: string;
}

export enum EAcceptedForTypes {
  STUDENTS = 'Students',
  FAMILY = 'Family'
}

export type AcceptedForTypes = keyof typeof EAcceptedForTypes;

export enum EAcceptedPaymentMethods {
  CASH = 'Cash',
  CARD = 'Card',
  ANY = 'Any'
}

export const DEFAULT_ACCEPTED_PAYMENT_METHOD: AcceptedPaymentMethodTypes = 'ANY';

export type AcceptedPaymentMethodTypes = keyof typeof EAcceptedPaymentMethods;

export enum EApartmentRooms {
  KITCHEN = 'Kitchen',
  LIVING_ROOM = 'Living room',
  DINING_ROOM = 'Dining room',
  BALCONY = 'Balcony',
  BEDROOM = 'Bedroom',
  BATHROOM = 'Bathroom'
}

export enum EApartmentConditions {
  NORMAL = 'Normal',
  OKAY = 'Okay',
  LUXE = 'Luxe'
}

export type ApartmentConditionTypes = keyof typeof EApartmentConditions;

export type ApartmentRoomTypes = keyof typeof EApartmentRooms;

export interface IApartmentAllocation {
  gender: GenderTypes;
  maxPeople: number;
  status: AcceptedForTypes;
}

export interface IApartmentPrice {
  instalment: InstalmentTypes;
  price: number;
  currencyAccepted: CurrencyTypes;
  method: AcceptedPaymentMethodTypes;
}

export interface IApartmentRooms {
  rooms: ApartmentRoomTypes;
  numberOfRooms: number;
}

export interface IApartment extends IWithTimeStamp, IWithHandle {
  rooms: IApartmentRooms;
  facilities: IApartmentFacility[];
  bills: IApartmentUtility[];
  address: string;
  condition: ApartmentConditionTypes;
  payment: any;
  allocation: IApartmentAllocation;
  price: IApartmentPrice;
  images: IImage[];
  available: boolean;
  landlord: IUser | string;
  bookings?: IBooking[] | string[];
  rules: IApartmentRule[];
  reviews?: IReview[] | string[];
  rating: number;
}