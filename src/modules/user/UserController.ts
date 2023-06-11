import { Request, Response } from 'express';

import {Controller} from '@/components';
import { User } from './User';
import { UserValidation } from './UserValidation';
import { HttpStatus, response } from '@/utils';

export class UserController extends Controller{

    public index(req: Request, res: Response) {
        // Logic to fetch all users from the database
        const users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ];

        response(HttpStatus.OK,res,users)
    }

    public show(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        // Logic to fetch user by ID from the database
        const user: User | undefined = { id: 1, name: 'John Doe' };

        if (user) {
            response(HttpStatus.OK,res,user)
        } else {
            response(HttpStatus.NOT_FOUND,res)
        }
    }

    public create(req: Request, res: Response) {
        const { name } = req.body;

        UserValidation.validate(req.body)

        // Logic to create a new user in the database
        const newUser: User = { id: 1, name };

        response(HttpStatus.CREATED,res,newUser)
    }

    public update(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const { name } = req.body;

        // Logic to update the user in the database
        const updatedUser: User | undefined = { id, name };

        if (updatedUser) {
            response(HttpStatus.OK,res,updatedUser)
        } else {
            response(HttpStatus.NOT_FOUND,res)
        }
    }

    public delete(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        // Logic to delete the user from the database
        // ...

        response(HttpStatus.OK,res)
    }
}
