import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { IOptions, Controller, validate } from '@/components';
import { HttpStatus, response, pick, ApiError } from '@/utils';

import VehicleService from './VehicleService';
import { VehicleValidation } from './VehicleValidation';


export class VehicleController extends Controller {

    @validate(VehicleValidation.index)
    public async index(req: Request, res: Response){
        const filter = pick(req.query, ['make', 'model']);
        const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
        const result = await VehicleService.queryVehicles(filter, options);
        response(HttpStatus.OK, res, result)
    };

    @validate(VehicleValidation.show)
    public async show(req: Request, res: Response){
        const vehicle = await VehicleService.getVehicleById(req.params.vehicleId);
        if (!vehicle) {
            throw new ApiError(HttpStatus.NOT_FOUND, 'Vehicle not found');
        }
        response(HttpStatus.OK, res, vehicle)
    };

    @validate(VehicleValidation.create)
    public async create(req: Request, res: Response){
        const vehicle = await VehicleService.createVehicle(req.body);
        response(HttpStatus.CREATED, res, vehicle)
    };


    @validate(VehicleValidation.update)
    public async update(req: Request, res: Response){
        const vehicle = await VehicleService.updateVehicleById(new mongoose.Types.ObjectId(req.params.vehicleId), req.body);

        if (vehicle) {
            response(HttpStatus.OK, res, vehicle)
        } else {
            response(HttpStatus.NOT_FOUND, res)
        }
    };


    @validate(VehicleValidation.delete)
    public async delete(req: Request, res: Response){
        await VehicleService.deleteVehicleById(req.params.vehicleId);
        response(HttpStatus.NO_CONTENT, res)
    };
}
