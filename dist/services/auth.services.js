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
            if (dataSignup) {
                if (dataSignup.code == 'ER_DUP_ENTRY' || dataSignup.sqlState == 'ER_DUP_ENTRY') {
                    console.error('❌: E-mail cadastrado, tente outro!');
                    return { message: "❌ E-mail cadastrado, tente outro!", status: 404 };
                }
            }
            return dataSignup;
        }
        catch (error) {
            console.error('❌ Erro interno ao tentar usuario no banco de dados');
            throw error;
        }
    }
    async signin(signin) {
        try {
            const newAuth = {
                email: signin.email.toLowerCase(),
                password: signin.password
            };
            const signinService = await this.auth_repository.signin(newAuth);
            if (!signinService) {
                console.error('❌ Error: Usuário ou inválido!');
                return signinService;
            }
            if (signinService.email !== newAuth.email || signinService.password_hash !== signin.password) {
                console.error('🚨 Usuário ou Senha inválido!');
            }
            // Retorna o usuário autenticado
            return { data: signinService };
        }
        catch (error) {
            console.error('❌:' + error);
            return error;
        }
    }
    async saveRefreshToken(authId, refreshToken, userAgent, rawIp, proxyIp) {
        try {
            const refreshData = await this.auth_repository.saveRefreshToken(authId, refreshToken, userAgent, rawIp, proxyIp);
            return refreshData;
        }
        catch (error) {
            console.error('❌: ' + error);
            return error;
        }
    }
    async logout(refreshToken, authId) {
        try {
            const result = await this.auth_repository.logout(refreshToken, authId);
            return result;
        }
        catch (error) {
            console.error('❌: ' + error);
            return error;
        }
    }
}
exports.default = AuthService;
