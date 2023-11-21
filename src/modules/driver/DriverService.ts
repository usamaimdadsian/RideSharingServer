import mongoose from 'mongoose';


import Driver from './Driver';
import { ApiError, HttpStatus } from '@/utils';
import { QueryResult, IOptions } from '@/components';
import { NewCreatedDriver, UpdateDriverBody, IDriverDoc } from "./DriverInterface"


class DriverService {
  /**
 * Create a driver
 * @param {NewCreatedDriver} driverBody
 * @returns {Promise<IDriverDoc>}
 */
  static async createDriver(driverBody: NewCreatedDriver): Promise<IDriverDoc> {

    if (await Driver.isEmailTaken(driverBody.email)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (await Driver.isCnicTaken(driverBody.cnic)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'CNIC already taken');
    }
    if (await Driver.isLicenseTaken(driverBody.licenseNumber)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'License number already taken');
    }
    return Driver.create(driverBody);
  };


  /**
 * Query for drivers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
  static async queryDrivers(filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
    const drivers = await Driver.paginate(filter, options);
    return drivers;
  };


  /**
 * Get driver by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IDriverDoc | null>}
 */
  static async getDriverById(id: mongoose.Types.ObjectId): Promise<IDriverDoc | null> { return Driver.findById(id) };

  /**
   * Get driver by email
   * @param {string} email
   * @returns {Promise<IDriverDoc | null>}
   */
  static async getDriverByEmail(email: string): Promise<IDriverDoc | null> { return Driver.findOne({ email }) };

  /**
   * Get driver by email
   * @param {string} email
   * @returns {Promise<IDriverDoc | null>}
   */
  static async getDriverByCnic(cnic: string): Promise<IDriverDoc | null> { return Driver.findOne({ cnic }) };

  /**
   * Get driver by email
   * @param {string} email
   * @returns {Promise<IDriverDoc | null>}
   */
  static async getDriverByLicense(licenseNumber: string): Promise<IDriverDoc | null> { return Driver.findOne({ licenseNumber }) };

  /**
   * Update driver by id
   * @param {mongoose.Types.ObjectId} driverId
   * @param {UpdateDriverBody} updateBody
   * @returns {Promise<IDriverDoc | null>}
   */
  static async updateDriverById(
    driverId: mongoose.Types.ObjectId,
    updateBody: UpdateDriverBody
  ): Promise<IDriverDoc | null> {
    const driver = await this.getDriverById(driverId);
    if (!driver) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Driver not found');
    }
    if (updateBody.email && (await Driver.isEmailTaken(updateBody.email, driverId))) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (updateBody.cnic && (await Driver.isCnicTaken(updateBody.cnic, driverId))) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'CNIC already taken');
    }
    if (updateBody.licenseNumber && (await Driver.isLicenseTaken(updateBody.licenseNumber, driverId))) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'License already taken');
    }
    Object.assign(driver, updateBody);
    await driver.save();
    return driver;
  };

  /**
   * Delete driver by id
   * @param {mongoose.Types.ObjectId} driverId
   * @returns {Promise<IDriverDoc | null>}
   */
  static async deleteDriverById(driverId: mongoose.Types.ObjectId): Promise<IDriverDoc | null> {
    const driver = await this.getDriverById(driverId);
    if (!driver) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Driver not found');
    }
    await driver.deleteOne();
    return driver;
  };


}

export default DriverService;
