import IUsersResponse from "../interfaces/dtos/users/IUsersResponse.js";
import db from "../config/db.config.js";


export default class UserRepository {

    async getUsersActive(): Promise<IUsersResponse> {
        try {
            const data: any = await db('auth as a')
                .join('roles as r', 'r.id', '=', 'a.role_id')
                .select(
                    'a.id',
                    'a.email',
                    'a.name',
                    'a.last_login',
                    'a.two_factor_enabled',
                    'a.is_active',
                    'r.role_name',
                    'r.description' 
                )
                .where('a.is_active', true);
            if (!data) return { message: 'Não foram encontrado usuários ativos', data: null }
            return data;
        } catch (error) {
            console.error("❌ Error na persistencia de dados ao tentar listar os usuários ativos!");
            throw new Error("❌: " + error);
        }
    }
}