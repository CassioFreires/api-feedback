import { ISignup } from '../interfaces/dtos/auth/ISignup';
import db from '../config/db.config';

export default class AuthRepository {

    async signup(signup: ISignup): Promise<any> {
        
        try {
            const dataSignup = await db('auth').insert({
                email: signup.email,
                password_hash: signup.password_hash,
                name: signup.name,
                role: signup.role
            })
            return dataSignup;
        } catch (error) {
            console.error('❌ Erro interno ao tentar usuario no banco de dados');
            throw error;
        }
    }
}