import mongoose, { Document, Model } from "mongoose"

import { QueryResult } from "@/components";
import { AccessAndRefreshTokens } from "@/modules/token/TokenInterface";

export interface IDriver {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}
  
export interface IDriverDoc extends IDriver, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IDriverModel extends Model<IDriverDoc> {
  isEmailTaken(email: string, excludeDriverId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateDriverBody = Partial<IDriver>;

export type NewRegisteredDriver = Omit<IDriver, 'role' | 'isEmailVerified'>;

export type NewCreatedDriver = Omit<IDriver, 'isEmailVerified'>;

export interface IDriverWithTokens {
  user: IDriverDoc;
  tokens: AccessAndRefreshTokens;
}