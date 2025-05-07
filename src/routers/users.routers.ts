import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/users.controllers.js';
import AuthMiddleware from '../middlewares/auth.middlewares.js';

const usersRouter = express.Router();

const users_controller = new UserController();
const auth_middleware = new AuthMiddleware();

usersRouter.get('/active',
    async function (req: Request, res: Response, next: NextFunction) { await auth_middleware.validate(req, res, next)},
    async function(req:Request, res:Response, next:NextFunction) {await auth_middleware.validateRole(req, res, next, ['admin', 'gestor'])},
    async function (req: Request, res: Response) {await users_controller.getUserActive(req, res)});


    usersRouter.get('/edit/:id',
        async function (req: Request, res: Response, next: NextFunction) { await auth_middleware.validate(req, res, next)},
        async function(req:Request, res:Response, next:NextFunction) {await auth_middleware.validateRole(req, res, next, ['admin'])},
        async function (req: Request, res: Response) {await users_controller.updateUsers(req, res)});
export default usersRouter;