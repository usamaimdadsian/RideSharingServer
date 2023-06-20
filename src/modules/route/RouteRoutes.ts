import express, { Router } from 'express';
import { RouteController } from './RouteController';

export const routeRouter = Router();
const routeController = new RouteController();

routeRouter.get('/', routeController.index);
routeRouter.get('/:routeId', routeController.show);
routeRouter.post('/', routeController.create);
routeRouter.patch('/:routeId', routeController.update);
routeRouter.delete('/:routeId', routeController.delete);
