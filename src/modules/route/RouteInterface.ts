import mongoose, { Document, Model } from "mongoose"

import { QueryResult } from "@/components";
import { AccessAndRefreshTokens } from "@/modules/token/TokenInterface";

export interface Coordinate{
  longitude: number,
  latitude: number
}

export interface IRoute {
  name: string;
  distance: number; // in meters
  duration: number; // in seconds
  trafficCondition: string,
  roadType: string, //highway, local road or toll road
  wayPoints: Coordinate[]
}
  
export interface IRouteDoc extends IRoute, Document {}

export interface IRouteModel extends Model<IRouteDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}