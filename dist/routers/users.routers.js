"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const usersRouter = express_1.default.Router();
const users_controller = new users_controllers_1.default();
const auth_middleware = new auth_middlewares_1.default();
usersRouter.get('/active', async function (req, res, next) { await auth_middleware.validate(req, res, next); }, async function (req, res, next) { await auth_middleware.validateRole(req, res, next, ['admin', 'gestor']); }, async function (req, res) { await users_controller.getUserActive(req, res); });
usersRouter.get('/edit/:id', async function (req, res, next) { await auth_middleware.validate(req, res, next); }, async function (req, res, next) { await auth_middleware.validateRole(req, res, next, ['admin']); }, async function (req, res) { await users_controller.updateUsers(req, res); });
exports.default = usersRouter;
