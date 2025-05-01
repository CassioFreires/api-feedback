import { ISignup } from '../interfaces/dtos/auth/ISignup';
import db from '../config/db.config';
import { ISignin } from '../interfaces/dtos/auth/ISignin';

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
        } catch (error: any) {
            return error;
        }
    }

    async signin(signin: ISignin): Promise<any> {
        try {
            const auth = await db('auth').select('*').where({ email: signin.email, password_hash: signin.password }).first();
            return auth;
        } catch (error) {
            return error;
        }
    }

}