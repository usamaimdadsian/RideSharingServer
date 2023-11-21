import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import { toJSON, paginate } from '@/utils';
import { IRideDoc, IRideModel } from './RideInterface';

const rideSchema = new mongoose.Schema<IRideDoc, IRideModel>(
  {
    driver: {
      type: String,
      ref: 'Driver',
      required: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    pickupLocation: {
      type: Object,
      required: true
    },
    destination: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rideSchema.plugin(toJSON);
rideSchema.plugin(paginate);


rideSchema.pre('save', async function (next) {
  next();
});

const Ride = mongoose.model<IRideDoc, IRideModel>('Ride', rideSchema);

export default Ride;
