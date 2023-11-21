import mongoose from 'mongoose';
import validator from 'validator';


import { toJSON, paginate } from '@/utils';
import { IDriverDoc, IDriverModel } from './DriverInterface';

const driverSchema = new mongoose.Schema<IDriverDoc, IDriverModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
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
    cnic: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    licenseExpiryDate: {
      type: Date,
      trim: true,
    },
    licenseType: {
      type: String,
      trim: true,
    },

    emergencyContact: {
      type: String,
      trim: true,
    },
    drivingRecord: {
      type: String,
      trim: true,
    },


    criminalRecord: {
      type: String,
      trim: true,
    },
    performance: {
      type: Number,
      trim: true,
    },
    ratings: {
      type: Number,
      trim: true,
    },
    applicationStatus: {
      type: String,
      trim: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
driverSchema.plugin(toJSON);
driverSchema.plugin(paginate);

/**
 * Check if cnic is taken
 * @param {string} cnic - The driver's cnic
 * @param {ObjectId} [excludeDriverId] - The id of the driver to be excluded
 * @returns {Promise<boolean>}
 */
driverSchema.static('isCnicTaken', async function (cnic: string, excludeDriverId: mongoose.ObjectId): Promise<boolean> {
  const driver = await this.findOne({ cnic, _id: { $ne: excludeDriverId } });
  return !!driver;
});

/**
 * Check if licenseNumber is taken
 * @param {string} licenseNumber - The driver's licenseNumber
 * @param {ObjectId} [excludeDriverId] - The id of the driver to be excluded
 * @returns {Promise<boolean>}
 */
driverSchema.static('isLicenseTaken', async function (licenseNumber: string, excludeDriverId: mongoose.ObjectId): Promise<boolean> {
  const driver = await this.findOne({ licenseNumber, _id: { $ne: excludeDriverId } });
  return !!driver;
});

/**
 * Check if licenseNumber is taken
 * @param {string} licenseNumber - The driver's licenseNumber
 * @param {ObjectId} [excludeDriverId] - The id of the driver to be excluded
 * @returns {Promise<boolean>}
 */
driverSchema.static('isEmailTaken', async function (email: string, excludeDriverId: mongoose.ObjectId): Promise<boolean> {
  const driver = await this.findOne({ email, _id: { $ne: excludeDriverId } });
  return !!driver;
});



driverSchema.pre('save', async function (next) {
  const driver = this;
  next();
});

const Driver = mongoose.model<IDriverDoc, IDriverModel>('Driver', driverSchema);

export default Driver;
