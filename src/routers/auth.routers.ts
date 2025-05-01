import { Router } from 'express';
import { Request, Response } from 'express';

// Controllers
import AuthController from '../controllers/auth.controllers';

// Variáveis
const authRouter = Router();
const auth_controller = new AuthController();


// Rotas
authRouter.post('/signup', async function(req:Request, res:Response) {
    await auth_controller.signup(req, res);
})
authRouter.post('/signin', async function(req:Request, res:Response) {
    await auth_controller.signin(req, res);
})


export default authRouter;