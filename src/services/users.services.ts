import IUsersResponse from "../interfaces/dtos/users/IUsersResponse";
import UserRepository from "../repository/users.repository";


export default class UserService  {
    private users_repository: UserRepository;

    constructor(){
        this.users_repository = new UserRepository();
    }
    
    async getUsersActive(): Promise<IUsersResponse>{
        try {
            const result = await this.users_repository.getUsersActive();
            if(!result) return {message: "usuário não encontrado", data: null};
            return result;
        }catch(error) {
            console.error('❌: Erro no serviço ao tentar listar usuários ativos: ' + error);
            throw new Error("❌: " + error); 
        }
    }
}