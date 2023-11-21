import express, { Router } from 'express';
import { VehicleController } from './VehicleController';

export const vehicleRouter = Router();
const vehicleController = new VehicleController();

vehicleRouter.get('/', vehicleController.index);
vehicleRouter.get('/:vehicleId', vehicleController.show);
vehicleRouter.post('/', vehicleController.create);
vehicleRouter.patch('/:vehicleId', vehicleController.update);
vehicleRouter.delete('/:vehicleId', vehicleController.delete);
