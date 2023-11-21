import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { IOptions, Controller, validate } from '@/components';
import { HttpStatus, response, pick, ApiError } from '@/utils';

import DriverService from './DriverService';
import { DriverValidation } from './DriverValidation';


export class DriverController extends Controller {

    @validate(DriverValidation.index)
    public async index(req: Request, res: Response){
        const filter = pick(req.query, ['name']);
        const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
        const result = await DriverService.queryDrivers(filter, options);
        response(HttpStatus.OK, res, result)
    };

    @validate(DriverValidation.show)
    public async show(req: Request, res: Response){
        const driver = await DriverService.getDriverById(req.params.driverId);
        if (!driver) {
            throw new ApiError(HttpStatus.NOT_FOUND, 'Driver not found');
        }
        response(HttpStatus.OK, res, driver)
    };

    @validate(DriverValidation.create)
    public async create(req: Request, res: Response){
        const driver = await DriverService.createDriver(req.body);
        response(HttpStatus.CREATED, res, driver)
    };


    @validate(DriverValidation.update)
    public async update(req: Request, res: Response){
        const driver = await DriverService.updateDriverById(new mongoose.Types.ObjectId(req.params.driverId), req.body);

        if (driver) {
            response(HttpStatus.OK, res, driver)
        } else {
            response(HttpStatus.NOT_FOUND, res)
        }
    };


    @validate(DriverValidation.delete)
    public async delete(req: Request, res: Response){
        await DriverService.deleteDriverById(req.params.driverId);
        response(HttpStatus.NO_CONTENT, res)
    };
}
