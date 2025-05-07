import { Router } from 'express';
// Controllers
import AuthController from '../controllers/auth.controllers.js';
// Variáveis
const authRouter = Router();
const auth_controller = new AuthController();
// Rotas
authRouter.post('/signup', async function (req, res) {
    await auth_controller.signup(req, res);
});
authRouter.post('/signin', async function (req, res) {
    await auth_controller.signin(req, res);
});
authRouter.post('/refresh', async function (req, res) {
    await auth_controller.refresh(req, res);
});
authRouter.post('/logout', async function (req, res) {
    await auth_controller.logout(req, res);
});
authRouter.post('/enable-2fa', async function (req, res) {
    await auth_controller.enable2fa(req, res);
});
authRouter.post('/verify-2fa', async function (req, res) {
    await auth_controller.verify2fa(req, res);
});
authRouter.post('/disable-2fa', async function (req, res) {
    await auth_controller.disable2fa(req, res);
});
export default authRouter;
