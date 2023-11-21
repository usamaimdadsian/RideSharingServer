import { Router, Request, Response } from 'express';
import { userRouter, authRouter, routeRouter, driverRouter, vehicleRouter } from '@/modules';


export function configureRoutes(router: Router) {

    router.get('/', (req: Request, res: Response) => {
        // Example: Get an item from DynamoDB
        res.send('Hello, World!');
    });

    router.use('/users', userRouter);

    router.use('/auth', authRouter);

    router.use('/routes', routeRouter);

    router.use('/drivers', driverRouter);

    router.use('/vehicles', vehicleRouter);
}
