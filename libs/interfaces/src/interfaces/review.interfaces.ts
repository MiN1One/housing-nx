import { IApartment } from "./apartment.interfaces";
import { IWithTimeStamp } from "./common.interfaces";
import { IUser } from "./user.interfaces";

export interface IReview extends IWithTimeStamp {
  reviewer: IUser | string;
  apartment: IApartment | string;
  review: string;
  rating: number;
  forReview?: IUser | string;
}