import mongoose from 'mongoose';


import Driver from './Driver';
import { ApiError, HttpStatus } from '@/utils';
import { QueryResult, IOptions } from '@/components';
import { NewCreatedDriver, UpdateDriverBody, IDriverDoc, NewRegisteredDriver } from "./DriverInterface"


class DriverService {
  /**
 * Create a <name>
 * @param {NewCreatedDriver} <name>Body
 * @returns {Promise<IDriverDoc>}
 */
  static async createDriver(<name>Body: NewCreatedDriver): Promise<IDriverDoc> {
    if (await Driver.isEmailTaken(<name>Body.email)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already taken');
    }
    return Driver.create(<name>Body);
  };

  /**
   * Register a <name>
   * @param {NewRegisteredDriver} <name>Body
   * @returns {Promise<IDriverDoc>}
   */
  static async registerDriver(<name>Body: NewRegisteredDriver): Promise<IDriverDoc> {
    if (await Driver.isEmailTaken(<name>Body.email)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already taken');
    }
    return Driver.create(<name>Body);
  };

  /**
 * Query for <name>s
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
  static async queryDrivers(filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
    const <name>s = await Driver.paginate(filter, options);
    return <name>s;
  };


  /**
 * Get <name> by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IDriverDoc | null>}
 */
  static async getDriverById(id: mongoose.Types.ObjectId): Promise<IDriverDoc | null> { return Driver.findById(id) };

  /**
   * Get <name> by email
   * @param {string} email
   * @returns {Promise<IDriverDoc | null>}
   */
  static async getDriverByEmail(email: string): Promise<IDriverDoc | null> { return Driver.findOne({ email }) };

  /**
   * Update <name> by id
   * @param {mongoose.Types.ObjectId} <name>Id
   * @param {UpdateDriverBody} updateBody
   * @returns {Promise<IDriverDoc | null>}
   */
  static async updateDriverById(
    <name>Id: mongoose.Types.ObjectId,
    updateBody: UpdateDriverBody
  ): Promise<IDriverDoc | null> {
    const <name> = await this.getDriverById(<name>Id);
    if (!<name>) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Driver not found');
    }
    if (updateBody.email && (await Driver.isEmailTaken(updateBody.email, <name>Id))) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(<name>, updateBody);
    await <name>.save();
    return <name>;
  };

  /**
   * Delete <name> by id
   * @param {mongoose.Types.ObjectId} <name>Id
   * @returns {Promise<IDriverDoc | null>}
   */
  static async deleteDriverById(<name>Id: mongoose.Types.ObjectId): Promise<IDriverDoc | null> {
    const <name> = await this.getDriverById(<name>Id);
    if (!<name>) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Driver not found');
    }
    await <name>.deleteOne();
    return <name>;
  };


}

export default DriverService;
