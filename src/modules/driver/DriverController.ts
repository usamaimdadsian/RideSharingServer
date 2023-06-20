import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { IOptions, Controller, validate } from '@/components';
import { HttpStatus, response, pick, ApiError } from '@/utils';

import DriverService from './DriverService';
import { DriverValidation } from './DriverValidation';


export class DriverController extends Controller {

    @validate(DriverValidation.index)
    public async index(req: Request, res: Response){
        const filter = pick(req.query, ['name', 'role']);
        const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
        const result = await DriverService.queryDrivers(filter, options);
        response(HttpStatus.OK, res, result)
    };

    @validate(DriverValidation.show)
    public async show(req: Request, res: Response){
        const <name> = await DriverService.getDriverById(req.params.<name>Id);
        if (!<name>) {
            throw new ApiError(HttpStatus.NOT_FOUND, 'Driver not found');
        }
        response(HttpStatus.OK, res, <name>)
    };

    @validate(DriverValidation.create)
    public async create(req: Request, res: Response){
        const <name> = await DriverService.createDriver(req.body);
        response(HttpStatus.CREATED, res, <name>)
    };


    @validate(DriverValidation.update)
    public async update(req: Request, res: Response){
        const <name> = await DriverService.updateDriverById(new mongoose.Types.ObjectId(req.params.<name>Id), req.body);

        if (<name>) {
            response(HttpStatus.OK, res, <name>)
        } else {
            response(HttpStatus.NOT_FOUND, res)
        }
    };


    @validate(DriverValidation.delete)
    public async delete(req: Request, res: Response){
        await DriverService.deleteDriverById(req.params.<name>Id);
        response(HttpStatus.NO_CONTENT, res)
    };
}
