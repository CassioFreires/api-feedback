import AuthRepository from "../repository/auth.repository.js";
import passwordCrypt from "../utils/generatePwdCrypt.js";
import speakeasy from 'speakeasy';
export default class AuthService {
    auth_repository;
    constructor() {
        this.auth_repository = new AuthRepository();
    }
    async signup(signup) {
        try {
            const generatePwdCrypt = await passwordCrypt(signup.password_hash);
            const signupFormated = {
                email: signup.email.toLowerCase(),
                password_hash: generatePwdCrypt,
                name: signup.name.toLowerCase(),
                role: signup.role?.toLocaleLowerCase()
            };
            const dataSignup = await this.auth_repository.signup(signupFormated);
            if (dataSignup) {
                if (dataSignup.code == 'ER_DUP_ENTRY' || dataSignup.sqlState == 'ER_DUP_ENTRY') {
                    console.error('❌: E-mail cadastrado, tente outro!');
                    return { message: "❌ E-mail cadastrado, tente outro!", status: 404 };
                }
            }
            return dataSignup;
        }
        catch (error) {
            console.error('❌ Erro interno ao tentar usuario no banco de dados');
            throw error;
        }
    }
    async signin(signin) {
        try {
            const newAuth = {
                email: signin.email.toLowerCase(),
                password: signin.password
            };
            const signinService = await this.auth_repository.signin(newAuth);
            if (!signinService) {
                console.error('❌ Error: Usuário não encontrado!');
                return signinService;
            }
            if (signinService.email !== newAuth.email) {
                console.error('🚨 Usuário ou Senha inválido!');
                return signinService;
            }
            // Retorna o usuário autenticado
            return { data: signinService };
        }
        catch (error) {
            console.error('❌:' + error);
            return error;
        }
    }
    async saveRefreshToken(authId, refreshToken, userAgent, rawIp, proxyIp) {
        try {
            const refreshData = await this.auth_repository.saveRefreshToken(authId, refreshToken, userAgent, rawIp, proxyIp);
            console.log(refreshData);
            return refreshData;
        }
        catch (error) {
            console.error('❌: ' + error);
            return error;
        }
    }
    async logout(refreshToken, authId) {
        try {
            const result = await this.auth_repository.logout(refreshToken, authId);
            return result;
        }
        catch (error) {
            console.error('❌: ' + error);
            return error;
        }
    }
    async enable2fa(secret, qrcode, auth_id) {
        try {
            if (!secret || !qrcode) {
                return { message: '❌ Falha ao gerar código de verificação!' };
            }
            await this.auth_repository.enable2fa(secret, auth_id); // 🔁 removi qrcode aqui, pois geralmente não é salvo
            return { message: '✅ 2FA habilitado com sucesso' };
        }
        catch (error) {
            console.error('❌', error);
            return { message: 'Erro interno ao ativar 2FA' };
        }
    }
    async verify2fa(auth_id, entered_code) {
        const secret = await this.auth_repository.verify2fa(auth_id);
        if (!secret) {
            return { message: '❌ Código 2FA inválido ou expirado!', valid: false };
        }
        const isEnteredCodeValid = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token: entered_code,
            window: 1
        });
        // // variavel que pega o token digitado pelo usuário
        // const testPostaman = speakeasy.totp({
        //     secret: secret,
        //     encoding: 'base32'
        // })
        console.log("O token é valido? " + isEnteredCodeValid);
        if (!isEnteredCodeValid) {
            return { message: '❌ Código 2FA inválido ou expirado!', valid: false };
        }
        return { message: '✅ Autenticação 2FA validada com sucesso!', valid: true };
    }
    async disable2fa(auth_id) {
        try {
            const updated = await this.auth_repository.disable2fa(auth_id);
            console.log(updated);
            return updated;
        }
        catch (error) {
            console.error("Erro no service (disable2fa):", error);
            throw new Error("Erro ao desativar 2FA no serviço");
        }
    }
}
