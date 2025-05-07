"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
// Variáveis
const authRouter = (0, express_1.Router)();
const auth_controller = new auth_controllers_1.default();
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
exports.default = authRouter;
