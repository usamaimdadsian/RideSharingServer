import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { IOptions, Controller, validate } from '@/components';
import { HttpStatus, response, pick, ApiError } from '@/utils';

import RouteService from './RouteService';
import { RouteValidation } from './RouteValidation';


export class RouteController extends Controller {

    @validate(RouteValidation.index)
    public async index(req: Request, res: Response){
        const filter = pick(req.query, ['name', 'roadType','trafficCondition']);
        const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
        const result = await RouteService.queryRoutes(filter, options);
        response(HttpStatus.OK, res, result)
    };

    @validate(RouteValidation.show)
    public async show(req: Request, res: Response){
        const route = await RouteService.getRouteById(req.params.routeId);
        if (!route) {
            throw new ApiError(HttpStatus.NOT_FOUND, 'Route not found');
        }
        response(HttpStatus.OK, res, route)
    };

    @validate(RouteValidation.create)
    public async create(req: Request, res: Response){
        const route = await RouteService.createRoute(req.body);
        response(HttpStatus.CREATED, res, route)
    };


    @validate(RouteValidation.update)
    public async update(req: Request, res: Response){
        const route = await RouteService.updateRouteById(new mongoose.Types.ObjectId(req.params.routeId), req.body);

        if (route) {
            response(HttpStatus.OK, res, route)
        } else {
            response(HttpStatus.NOT_FOUND, res)
        }
    };


    @validate(RouteValidation.delete)
    public async delete(req: Request, res: Response){
        await RouteService.deleteRouteById(req.params.routeId);
        response(HttpStatus.NO_CONTENT, res)
    };
}
