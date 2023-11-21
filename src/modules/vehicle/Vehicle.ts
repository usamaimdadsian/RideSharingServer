import mongoose from 'mongoose';
import { toJSON, paginate } from '@/utils';
import { IVehicleDoc, IVehicleModel } from './VehicleInterface';


const vehicleSchema = new mongoose.Schema<IVehicleDoc, IVehicleModel>(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      trim: true,
    },

    insuranceProvider: {
      type: String,
      trim: true,
    },
    insurancePolicyNumber: {
      type: String,
      trim: true,
    },
    insuranceValidFrom: {
      type: Date,
      trim: true,
    },
    insuranceValidTo: {
      type: Date,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vehicleSchema.plugin(toJSON);
vehicleSchema.plugin(paginate);

/**
 * Check if registrationNumber is taken
 * @param {string} registrationNumber - The vehicle's registrationNumber
 * @param {ObjectId} [excludeVehicleId] - The id of the vehicle to be excluded
 * @returns {Promise<boolean>}
 */
vehicleSchema.static('isRegistrationNumberTaken', async function (registrationNumber: string, excludeVehicleId: mongoose.ObjectId): Promise<boolean> {
  const vehicle = await this.findOne({ registrationNumber, _id: { $ne: excludeVehicleId } });
  return !!vehicle;
});


vehicleSchema.pre('save', async function (next) {
  next();
});

const Vehicle = mongoose.model<IVehicleDoc, IVehicleModel>('Vehicle', vehicleSchema);

export default Vehicle;
