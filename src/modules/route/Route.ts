import mongoose from 'mongoose';


import { toJSON, paginate } from '@/utils';
import { IRouteDoc, IRouteModel } from './RouteInterface';

const routeSchema = new mongoose.Schema<IRouteDoc, IRouteModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    trafficCondition: {
      type: String,
      default: 'normal',
      enum: ['low','normal','high']
    },
    roadType: {
      type: String,
      default: 'local',
      enum: ['local', 'toll_road', 'highway']
    },
    wayPoints: {
      type: [{
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
      }],
      required: true,
    }
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
routeSchema.plugin(toJSON);
routeSchema.plugin(paginate);


routeSchema.pre('save', async function (next) {
  next();
});

const Route = mongoose.model<IRouteDoc, IRouteModel>('Route', routeSchema);

export default Route;
