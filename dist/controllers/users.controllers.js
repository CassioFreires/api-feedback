"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_services_1 = __importDefault(require("../services/users.services"));
class UserController {
    constructor() {
        this.user_service = new users_services_1.default();
    }
    async getUserActive(req, res) {
        try {
            const usersActivers = await this.user_service.getUsersActive();
            if (!usersActivers)
                return res.status(404).json({ message: '❌ Usuários ativos não encontrados!' });
            return res.status(200).json({ message: '✅: Lista de usuário ativos: ', data: usersActivers });
        }
        catch (error) {
            console.error('❌: ' + error);
            return res.status(500).json({ message: '❌' + 'Não foi possível retornar os usuários ativos!' });
        }
    }
    async updateUsers(req, res) {
        try {
        }
        catch (error) {
        }
    }
}
exports.default = UserController;
