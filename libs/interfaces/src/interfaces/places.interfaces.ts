import { IWithTitle } from "./common.interfaces";

export interface IUniversity extends IWithTitle {
  location: string;
  distance: string;
}

export interface INearbyPlace extends IWithTitle {
  distance: string; 
}