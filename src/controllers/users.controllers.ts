import { Request, Response } from "express"
import IUsersResponse from "../interfaces/dtos/users/IUsersResponse.js";
import UserService from "../services/users.services.js";

export default class UserController {
    private user_service:UserService;

    constructor(){
        this.user_service = new UserService();
    }

    async getUserActive(req:Request, res:Response): Promise<Response<IUsersResponse>> {
        try {
            const usersActivers = await this.user_service.getUsersActive();
            if(!usersActivers) return res.status(404).json({message: '❌ Usuários ativos não encontrados!'});
            return res.status(200).json({message: '✅: Lista de usuário ativos: ', data: usersActivers});
        }catch(error) {
            console.error('❌: ' + error);
            return res.status(500).json({message: '❌' + 'Não foi possível retornar os usuários ativos!'});
        }
    }


    async updateUsers(req:Request, res:Response) {
        try {

        }catch(error) {
            
        }
    }
}