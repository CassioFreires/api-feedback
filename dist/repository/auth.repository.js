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
}
exports.default = AuthRepository;
