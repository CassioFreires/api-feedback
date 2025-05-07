import UserRepository from "../repository/users.repository.js";
export default class UserService {
    users_repository;
    constructor() {
        this.users_repository = new UserRepository();
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
