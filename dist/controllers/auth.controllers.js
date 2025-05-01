"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth.services"));
const SignupDto_1 = require("../dtos/auth/SignupDto");
class AuthController {
    constructor() {
        this.auth_service = new auth_services_1.default();
    }
    async signup(req, res) {
        try {
            const { email, password_hash, name, role } = req.body;
            const newSignupUser = new SignupDto_1.SignupDto(email, password_hash, name, role);
            const signupUser = await this.auth_service.signup(newSignupUser);
            return res.json({ message: "✅ Usuário criado com sucesso!", status: 201, data: signupUser });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: '❌ Erro de servidor', status: 500, data: [] });
        }
    }
}
exports.default = AuthController;
