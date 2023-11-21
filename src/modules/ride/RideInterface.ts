import mongoose, { Document, Model } from "mongoose"

import { QueryResult } from "@/components";
import { Coordinate } from "@/modules/route/RouteInterface";


export interface IRide {
  driver: String;
  user: String;
  pickupLocation: Coordinate;
  destination: Coordinate;
}
  
export interface IRideDoc extends IRide, Document {}

export interface IRideModel extends Model<IRideDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type RideBody = Partial<IRide>;