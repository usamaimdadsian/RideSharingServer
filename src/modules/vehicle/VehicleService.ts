import mongoose from 'mongoose';


import Vehicle from './Vehicle';
import { QueryResult, IOptions } from '@/components';
import { ApiError, HttpStatus } from '@/utils';
import { VehicleBody, IVehicleDoc } from "./VehicleInterface"


class VehicleService {
  /**
 * Create a vehicle
 * @param {VehicleBody} vehicleBody
 * @returns {Promise<IVehicleDoc>}
 */
  static async createVehicle(vehicleBody: VehicleBody): Promise<IVehicleDoc> {
    if (await Vehicle.isRegistrationNumberTaken(vehicleBody.registrationNumber)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Registration number already taken');
    }
    return Vehicle.create(vehicleBody);
  };

  /**
   * Register a vehicle
   * @param {VehicleBody} vehicleBody
   * @returns {Promise<IVehicleDoc>}
   */
  static async registerVehicle(vehicleBody: VehicleBody): Promise<IVehicleDoc> {
    if (await Vehicle.isRegistrationNumberTaken(vehicleBody.registrationNumber)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Registration number already taken');
    }
    return Vehicle.create(vehicleBody);
  };

  /**
 * Query for vehicles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
  static async queryVehicles(filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
    const vehicles = await Vehicle.paginate(filter, options);
    return vehicles;
  };


  /**
 * Get vehicle by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IVehicleDoc | null>}
 */
  static async getVehicleById(id: mongoose.Types.ObjectId): Promise<IVehicleDoc | null> { return Vehicle.findById(id) };

  /**
   * Get vehicle by email
   * @param {string} email
   * @returns {Promise<IVehicleDoc | null>}
   */
  static async getVehicleByRegistrationNumber(email: string): Promise<IVehicleDoc | null> { return Vehicle.findOne({ email }) };

  /**
   * Update vehicle by id
   * @param {mongoose.Types.ObjectId} vehicleId
   * @param {VehicleBody} updateBody
   * @returns {Promise<IVehicleDoc | null>}
   */
  static async updateVehicleById(
    vehicleId: mongoose.Types.ObjectId,
    updateBody: VehicleBody
  ): Promise<IVehicleDoc | null> {
    const vehicle = await this.getVehicleById(vehicleId);
    if (!vehicle) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Vehicle not found');
    }
    if (updateBody.registrationNumber && (await Vehicle.isRegistrationNumberTaken(updateBody.registrationNumber, vehicleId))) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Registration number already taken');
    }
    Object.assign(vehicle, updateBody);
    await vehicle.save();
    return vehicle;
  };

  /**
   * Delete vehicle by id
   * @param {mongoose.Types.ObjectId} vehicleId
   * @returns {Promise<IVehicleDoc | null>}
   */
  static async deleteVehicleById(vehicleId: mongoose.Types.ObjectId): Promise<IVehicleDoc | null> {
    const vehicle = await this.getVehicleById(vehicleId);
    if (!vehicle) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Vehicle not found');
    }
    await vehicle.deleteOne();
    return vehicle;
  };


}

export default VehicleService;
