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

    // Função que irá salvar o refresh token
    async saveRefreshToken(authId: number, refreshToken: string, userAgent: string, rawIp: string, proxyIp: string): Promise<any> {
        try {
            // Salvar o refresh token na base de dados sem gerá-lo novamente
            const refreshtoken = await db('refresh_tokens').insert({
                auth_id: authId,      // ID do usuário autenticado
                token: refreshToken,  // O mesmo token gerado no controller
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
                user_agent: userAgent,
                ip_address: rawIp,
                proxy_ip_address: proxyIp
            });

            return refreshtoken;
        } catch (error) {
            console.error('❌ Erro ao salvar o refresh token:', error);
            return error;
        }
    }

    async logout(refreshToken: string, authId: number): Promise<any> {
        try {
            const removeRefreshToken = await db('refresh_tokens')
                .where({ auth_id: authId, token: refreshToken })
                .del();

            if (removeRefreshToken === 0) {
                return removeRefreshToken; // ou lançar um erro
            }

            return { message: 'Logout successful' };
        } catch (error) {
            console.error('❌: ' + error);
            return { message: 'Internal server error' }; // garantir retorno do tipo IResponseAuth
        }
    }



}