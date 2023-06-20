import mongoose from 'mongoose';


import Route from './Route';
import { ApiError, HttpStatus } from '@/utils';
import { QueryResult, IOptions } from '@/components';
import { IRouteDoc } from "./RouteInterface"


class RouteService {
  /**type: [{
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true },
      }],
      required: true,
 * Create a route
 * @param {IRouteDoc} routeBody
 * @returns {Promise<IRouteDoc>}
 */
  static async createRoute(routeBody: IRouteDoc): Promise<IRouteDoc> {
    return Route.create(routeBody);
  };



  /**
 * Query for routes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
  static async queryRoutes(filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
    const routes = await Route.paginate(filter, options);
    return routes;
  };


  /**
 * Get route by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRouteDoc | null>}
 */
  static async getRouteById(id: mongoose.Types.ObjectId): Promise<IRouteDoc | null> { return Route.findById(id) };


  /**
   * Update route by id
   * @param {mongoose.Types.ObjectId} routeId
   * @param {IRouteDoc} updateBody
   * @returns {Promise<IRouteDoc | null>}
   */
  static async updateRouteById(
    routeId: mongoose.Types.ObjectId,
    updateBody: IRouteDoc
  ): Promise<IRouteDoc | null> {
    const route = await this.getRouteById(routeId);
    if (!route) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Route not found');
    }
    Object.assign(route, updateBody);
    await route.save();
    return route;
  };

  /**
   * Delete route by id
   * @param {mongoose.Types.ObjectId} routeId
   * @returns {Promise<IRouteDoc | null>}
   */
  static async deleteRouteById(routeId: mongoose.Types.ObjectId): Promise<IRouteDoc | null> {
    const route = await this.getRouteById(routeId);
    if (!route) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Route not found');
    }
    await route.deleteOne();
    return route;
  };


}

export default RouteService;
