import mongoose, { Document, Model } from "mongoose"

import { QueryResult } from "@/components";

export interface IVehicle {
  make: string;  // The manufacturer or brand of the vehicle (e.g., Toyota, Honda).
  model: string; // The specific model or variant of the vehicle (e.g., Camry, Civic).
  registrationNumber: string;
  capacity: number;

  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceValidFrom: Date;
  insuranceValidTo: Date;
}
  
export interface IVehicleDoc extends IVehicle, Document {}

export interface IVehicleModel extends Model<IVehicleDoc> {
  isPolicyNumberTaken(policyNumber: string, excludeInsuranceId?: mongoose.Types.ObjectId): Promise<boolean>;
  isRegistrationNumberTaken(registrationNumber: string, excludeVehicleId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type VehicleBody = Partial<IVehicle>;