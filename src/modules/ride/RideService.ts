import mongoose from 'mongoose';


import Ride from './Ride';
import { ApiError, HttpStatus } from '@/utils';
import { QueryResult, IOptions } from '@/components';
import { RideBody, IRideDoc } from "./RideInterface"


class RideService {
  /**
 * Create a ride
 * @param {RideBody} rideBody
 * @returns {Promise<IRideDoc>}
 */
  static async createRide(rideBody: RideBody): Promise<IRideDoc> {

    return Ride.create(rideBody);
  };



  /**
 * Query for rides
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
  static async queryRides(filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
    const rides = await Ride.paginate(filter, options);
    return rides;
  };


  /**
 * Get ride by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRideDoc | null>}
 */
  static async getRideById(id: mongoose.Types.ObjectId): Promise<IRideDoc | null> { return Ride.findById(id) };


  /**
   * Update ride by id
   * @param {mongoose.Types.ObjectId} rideId
   * @param {RideBody} updateBody
   * @returns {Promise<IRideDoc | null>}
   */
  static async updateRideById(
    rideId: mongoose.Types.ObjectId,
    updateBody: RideBody
  ): Promise<IRideDoc | null> {
    const ride = await this.getRideById(rideId);
    if (!ride) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Ride not found');
    }
    Object.assign(ride, updateBody);
    await ride.save();
    return ride;
  };

  /**
   * Delete ride by id
   * @param {mongoose.Types.ObjectId} rideId
   * @returns {Promise<IRideDoc | null>}
   */
  static async deleteRideById(rideId: mongoose.Types.ObjectId): Promise<IRideDoc | null> {
    const ride = await this.getRideById(rideId);
    if (!ride) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Ride not found');
    }
    await ride.deleteOne();
    return ride;
  };


}

export default RideService;
