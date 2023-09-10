import { IApartment } from "./apartment.interfaces";
import { IUser } from "./user.interfaces";

export interface IBooking {
  accepted: boolean;
  users: IUser[] | string[];
  requestMessage: string;
  apartment: IApartment | string;
}