import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';


import config from '@/config/config';
import { toJSON, paginate } from '@/utils';
import { IDriverDoc, IDriverModel } from './DriverInterface';

const driverSchema = new mongoose.Schema<IDriverDoc, IDriverModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: config.roles,
      default: 'driver',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
driverSchema.plugin(toJSON);
driverSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The driver's email
 * @param {ObjectId} [excludeDriverId] - The id of the driver to be excluded
 * @returns {Promise<boolean>}
 */
driverSchema.static('isEmailTaken', async function (email: string, excludeDriverId: mongoose.ObjectId): Promise<boolean> {
  const driver = await this.findOne({ email, _id: { $ne: excludeDriverId } });
  return !!driver;
});

/**
 * Check if password matches the driver's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
driverSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const driver = this;
  return bcrypt.compare(password, driver.password);
});

driverSchema.pre('save', async function (next) {
  const driver = this;
  if (driver.isModified('password')) {
    driver.password = await bcrypt.hash(driver.password, 8);
  }
  next();
});

const Driver = mongoose.model<IDriverDoc, IDriverModel>('Driver', driverSchema);

export default Driver;
