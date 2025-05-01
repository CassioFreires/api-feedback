"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const generatePwdCrypt_1 = __importDefault(require("../utils/generatePwdCrypt"));
class AuthService {
    constructor() {
        this.auth_repository = new auth_repository_1.default();
    }
    async signup(signup) {
        try {
            const generatePwdCrypt = await (0, generatePwdCrypt_1.default)(signup.password_hash);
            const signupFormated = {
                email: signup.email.toLowerCase(),
                password_hash: generatePwdCrypt,
                name: signup.name.toLowerCase(),
                role: signup.role?.toLocaleLowerCase()
            };
            const dataSignup = await this.auth_repository.signup(signupFormated);
            return dataSignup;
        }
        catch (error) {
            console.log('❌ Erro interno no servidor');
            throw error;
        }
    }
}
exports.default = AuthService;
