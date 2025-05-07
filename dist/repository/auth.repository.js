import db from '../config/db.config.js';
import dayjs from 'dayjs';
export default class AuthRepository {
    async signup(signup) {
        try {
            const dataSignup = await db('auth').insert({
                email: signup.email,
                password_hash: signup.password_hash,
                name: signup.name,
                role: signup.role
            });
            return dataSignup;
        }
        catch (error) {
            return error;
        }
    }
    async signin(signin) {
        try {
            const auth = await db('auth as a')
                .join('roles as r', 'r.id', '=', 'a.role_id')
                .select('a.id', 'a.email', 'a.name', 'a.last_login', 'a.two_factor_enabled', 'a.is_active', 'a.password_hash', 'r.role_name', 'r.description')
                .where({ email: signin.email }).first();
            return auth;
        }
        catch (error) {
            return error;
        }
    }
    async saveRefreshToken(authId, refreshToken, userAgent, rawIp, proxyIp) {
        try {
            // Salvar o refresh token na base de dados sem gerá-lo novamente
            const refreshtoken = await db('refresh_tokens').insert({
                auth_id: authId, // ID do usuário autenticado
                token: refreshToken, // O mesmo token gerado no controller
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
                user_agent: userAgent,
                ip_address: rawIp,
                proxy_ip_address: proxyIp
            });
            return refreshtoken;
        }
        catch (error) {
            console.error('❌ Erro ao salvar o refresh token:', error);
            return error;
        }
    }
    async logout(refreshToken, authId) {
        try {
            const removeRefreshToken = await db('refresh_tokens')
                .where({ auth_id: authId, token: refreshToken })
                .del();
            if (removeRefreshToken === 0) {
                return removeRefreshToken; // ou lançar um erro
            }
            return { message: 'Logout successful' };
        }
        catch (error) {
            console.error('❌: ' + error);
            return { message: 'Internal server error' }; // garantir retorno do tipo IResponseAuth
        }
    }
    async enable2fa(secret, auth_id) {
        try {
            const expiresAt = dayjs().add(30, 'second').toDate();
            const insertAuth = await db('auth').where({ id: auth_id }).update({
                two_factor_enabled: true,
            });
            const insertEmailVerificationCodes = db('verification_codes_2FA').insert({
                auth_id: auth_id,
                code: secret,
                expires_at: expiresAt
            });
            return insertEmailVerificationCodes;
        }
        catch (error) {
            console.error('❌:', error);
            throw new Error('Erro ao salvar o segredo 2FA');
        }
    }
    async verify2fa(auth_id) {
        const result = await db('email_verification_codes')
            .where({ auth_id })
            .orderBy('id', 'desc')
            .first();
        if (!result)
            return null;
        return result.code;
    }
    async disable2fa(auth_id) {
        try {
            const user = await db('auth').where({ id: auth_id }).first();
            if (!user)
                return { success: false, reason: 'not_found' };
            await db('auth').where({ id: auth_id }).update({ two_factor_enabled: false });
            const teste = await db('verification_codes_2FA').select('*').where({ auth_id: auth_id }).first();
            if (!teste)
                return { success: false, reason: 'code_update_failed' };
            const updatedCode = await db('verification_codes_2FA')
                .where({ auth_id: auth_id })
                .update({ code: '' });
            if (!updatedCode)
                return { success: false, reason: 'code_update_failed' };
            return { success: true };
        }
        catch (error) {
            console.error("Erro no repository:", error);
            return { success: false, reason: 'db_error' };
        }
    }
}
