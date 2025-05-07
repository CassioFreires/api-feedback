"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_repository_1 = __importDefault(require("../repository/users.repository"));
class UserService {
    constructor() {
        this.users_repository = new users_repository_1.default();
    }
    async getUsersActive() {
        try {
            const result = await this.users_repository.getUsersActive();
            if (!result)
                return { message: "usuário não encontrado", data: null };
            return result;
        }
        catch (error) {
            console.error('❌: Erro no serviço ao tentar listar usuários ativos: ' + error);
            throw new Error("❌: " + error);
        }
    }
}
exports.default = UserService;
