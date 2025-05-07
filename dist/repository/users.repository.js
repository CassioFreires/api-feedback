"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class UserRepository {
    async getUsersActive() {
        try {
            const data = await (0, db_config_1.default)('auth as a')
                .join('roles as r', 'r.id', '=', 'a.role_id')
                .select('a.id', 'a.email', 'a.name', 'a.last_login', 'a.two_factor_enabled', 'a.is_active', 'r.role_name', 'r.description')
                .where('a.is_active', true);
            if (!data)
                return { message: 'Não foram encontrado usuários ativos', data: null };
            return data;
        }
        catch (error) {
            console.error("❌ Error na persistencia de dados ao tentar listar os usuários ativos!");
            throw new Error("❌: " + error);
        }
    }
}
exports.default = UserRepository;
