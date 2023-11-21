import mongoose, { Document, Model } from "mongoose"

import { QueryResult } from "@/components";

export interface IDriver {
  name: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  cnic: string;

  licenseNumber: string;
  licenseExpiryDate: Date;
  licenseType: string;

  emergencyContact: string;
  drivingRecord: string;
  
  criminalRecord: string;
  performance: number;
  ratings: number;
  applicationStatus: 'pending' | 'approved' | 'rejected';
}
  
export interface IDriverDoc extends IDriver, Document {
  
}

export interface IDriverModel extends Model<IDriverDoc> {
  isEmailTaken(email: string, excludeDriverId?: mongoose.Types.ObjectId): Promise<boolean>;
  isCnicTaken(cnic: string, excludeDriverId?: mongoose.Types.ObjectId): Promise<boolean>;
  isLicenseTaken(licenseNumber: string, excludeDriverId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateDriverBody = Partial<IDriver>;


export type NewCreatedDriver = Omit<IDriver, 'performance' | 'ratings' | 'applicationStatus' | 'criminalRecord'>;