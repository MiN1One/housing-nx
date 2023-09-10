import { IWithHandle } from "./common.interfaces";

export interface IUniversity extends IWithHandle {
  location: string;
  distance: string;
}

export interface INearbyPlace extends IWithHandle {
  distance: string; 
}