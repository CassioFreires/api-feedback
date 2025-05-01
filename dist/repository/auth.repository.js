"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class AuthRepository {
    async signup(signup) {
        try {
            const dataSignup = await (0, db_config_1.default)('auth').insert({
                email: signup.email,
                password_hash: signup.password_hash,
                name: signup.name,
                role: signup.role
            });
            return dataSignup;
        }
        catch (error) {
            return error;
        }
    }
    async signin(signin) {
        try {
            const auth = await (0, db_config_1.default)('auth').select('*').where({ email: signin.email, password_hash: signin.password }).first();
            return auth;
        }
        catch (error) {
            return error;
        }
    }
    // Função que irá salvar o refresh token
    async saveRefreshToken(authId, refreshToken, userAgent, rawIp, proxyIp) {
        try {
            // Salvar o refresh token na base de dados sem gerá-lo novamente
            const refreshtoken = await (0, db_config_1.default)('refresh_tokens').insert({
                auth_id: authId, // ID do usuário autenticado
                token: refreshToken, // O mesmo token gerado no controller
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
                user_agent: userAgent,
                ip_address: rawIp,
                proxy_ip_address: proxyIp
            });
            return refreshtoken;
        }
        catch (error) {
            console.error('❌ Erro ao salvar o refresh token:', error);
            return error;
        }
    }
    async logout(refreshToken, authId) {
        try {
            const removeRefreshToken = await (0, db_config_1.default)('refresh_tokens')
                .where({ auth_id: authId, token: refreshToken })
                .del();
            if (removeRefreshToken === 0) {
                return removeRefreshToken; // ou lançar um erro
            }
            return { message: 'Logout successful' };
        }
        catch (error) {
            console.error('❌: ' + error);
            return { message: 'Internal server error' }; // garantir retorno do tipo IResponseAuth
        }
    }
}
exports.default = AuthRepository;
