import express, { Router } from 'express';
import { DriverController } from './DriverController';

export const driverRouter = Router();
const driverController = new DriverController();

driverRouter.get('/', driverController.index);
driverRouter.get('/:driverId', driverController.show);
driverRouter.post('/', driverController.create);
driverRouter.patch('/:driverId', driverController.update);
driverRouter.delete('/:driverId', driverController.delete);
