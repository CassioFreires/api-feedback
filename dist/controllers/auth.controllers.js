"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth.services"));
const SignupDto_1 = require("../dtos/auth/SignupDto");
const SigninDto_1 = require("../dtos/auth/SigninDto");
const chalk_1 = __importDefault(require("chalk"));
class AuthController {
    constructor() {
        this.auth_service = new auth_services_1.default();
    }
    async signup(req, res) {
        try {
            const { email, password_hash, name, role } = req.body;
            const newSignupUser = new SignupDto_1.SignupDto(email, password_hash, name, role);
            newSignupUser.validate();
            const signupUser = await this.auth_service.signup(newSignupUser);
            if (signupUser) {
                return res.json({ message: signupUser.message, status: signupUser.status });
            }
            return res.json({ message: "✅ Usuário criado com sucesso!", status: 201, data: signupUser });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: '❌' + error.message });
            }
            return res.status(500).json({ message: '❌: ' + error });
        }
    }
    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const newAuth = new SigninDto_1.SigninDto(email, password);
            newAuth.validate();
            const auth = await this.auth_service.signin(newAuth);
            if (!auth) {
                return res.status(404).json({ message: '❌ Error: Usuário ou inválido!', status: 404 });
            }
            return res.status(200).json({ message: 'Login OK', status: 200 });
        }
        catch (error) {
            console.error(chalk_1.default.red('🚨' + error));
            return res.status(500).json({ message: '❌: ' + error });
        }
    }
}
exports.default = AuthController;
