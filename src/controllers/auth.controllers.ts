import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import AuthService from "../services/auth.services.js";
import { SignupDto } from "../dtos/auth/SignupDto.js";
import { IResponseAuth } from "../interfaces/dtos/auth/IResponseAuth.js";
import { SigninDto } from "../dtos/auth/SigninDto.js";
import chalk from "chalk";
import { generateRefreshTokenAccess, generateTokenAccess } from "../utils/generateToken.js";
import { generateCodeTotp } from "../utils/generateCodeTotp.js";
import comparePwdCrypt from "../utils/comparePwdCrypt.js";
import { IAuthController } from "../interfaces/controllers/auth/IAuthController.js";

export default class AuthController implements IAuthController {
    private auth_service: AuthService;

    constructor() {
        this.auth_service = new AuthService();
    }

    async signup(req: Request, res: Response): Promise<Response<IResponseAuth>> {
        try {
            const { email, password_hash, name, role } = req.body;
            const newSignupUser = new SignupDto(email, password_hash, name, role);
            newSignupUser.validate();

            const signupUser = await this.auth_service.signup(newSignupUser);
            if (signupUser) {
                return res.json({ message: signupUser.message, status: signupUser.status });
            }

            return res.json({ message: "✅ Usuário criado com sucesso!", status: 201, data: signupUser });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: '❌' + error.message });
            }
            return res.status(500).json({ message: '❌: ' + error });
        }
    }

    async signin(req: Request, res: Response): Promise<Response<IResponseAuth>> {
        try {
            const { email, password } = req.body;

            const newAuth = new SigninDto(email, password);
            newAuth.validate();

            const auth: any = await this.auth_service.signin(newAuth);
            if (!auth) {
                return res.status(404).json({ message: '❌ Error: Usuário ou inválido!', status: 404 });
            }

            const isValidPassword = await comparePwdCrypt(password, auth.data.password_hash)
            if (!isValidPassword) {
                console.log('❌: Error: Usuário ou inválido!')
                return res.status(404).json({ message: '❌ Error: Usuário ou inválido!', status: 404 });
            }

            const dataToken = {
                id: auth.data.id,
                email: auth.data.email,
                name: auth.data.name,
                role_name: auth.data.role_name,
                description: auth.data.description
            }
            const token = generateTokenAccess(dataToken);
            const refreshToken = generateRefreshTokenAccess(dataToken);

            return res.status(200).json({ message: 'Login OK', status: 200, token: token, refreshToken: refreshToken });
        } catch (error) {
            console.error(chalk.red('🚨' + error));
            return res.status(500).json({ message: '❌: ' + error });
        }
    }

    async refresh(req: Request, res: Response): Promise<Response<IResponseAuth>> {
        const userAgent = req.headers['user-agent'];

        // Pega o IP real do usuário
        const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const proxyIp = req.socket.remoteAddress;

        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.status(401).json({ message: 'Token ausente' });

            const decoded = jwt.verify(refreshToken, String(process.env.TOKEN_PRIVATE_KEY_REFRESH));
            if(!decoded){
                return res.status(404).json({message: "❌: token de refresh inválido"})
            }

            if (typeof decoded === 'object' && 'id' in decoded) {
                const newAccessToken = generateTokenAccess(decoded.id); // OK
                await this.auth_service.saveRefreshToken(Number(decoded.id), String(refreshToken), String(userAgent), String(rawIp), String(proxyIp));
                return res.json({ accessToken: newAccessToken });

            } else {
                throw new Error('Token malformado');
            }
        } catch (error) {
            console.error('❌: ' + error);
            return res.status(500).json({ message: '❌: ' + error });
        }
    }

    async logout(req: Request, res: Response): Promise<Response<IResponseAuth>> {
        try {
            const refreshToken = req.body.refresh_token;
            const authId = req.body.auth_id;
            if (!refreshToken || !authId) {
                return res.status(400).json({ message: 'refresh_token e auth_id are são necessários' });
            }

            const result: any = await this.auth_service.logout(refreshToken, authId);

            if (!result || result == 0) {
                return res.status(401).json({
                    message: 'Token inválido ou já desconectado'
                });
            }

            return res.status(200).json({ message: 'Logout OK' });
        } catch (error) {
            console.error('❌: ' + error);
            return res.status(500).json({ message: '❌: ' + error });
        }
    }

    async enable2fa(req: Request, res: Response): Promise<Response<IResponseAuth>> {
        try {
            const { auth_id } = req.body;
            if (!auth_id) return res.status(400).json({ message: 'auth_id é obrigatório' });

            const { secret, qrcode } = await generateCodeTotp();

            const createEnable2fa = await this.auth_service.enable2fa(secret, qrcode, Number(auth_id));
            return res.status(200).json({ message: "✅ Código 2FA gerado", data: createEnable2fa });
        } catch (error) {
            console.error('❌:', error);
            return res.status(500).json({ message: "❌ Erro interno ao gerar 2FA" });
        }
    }
    async verify2fa(req: Request, res: Response): Promise<Response> {
        try {
            const { auth_id, entered_code } = req.body;

            if (!auth_id || !entered_code) return res.status(400).json({ message: 'Dados obrigatórios faltando' });

            const isValid = await this.auth_service.verify2fa(Number(auth_id), entered_code);
            if (!isValid || !isValid.valid) {
                return res.status(401).json({ message: '❌ Código 2FA inválido ou expirado!' });
            }
            return res.status(200).json({ message: '✅ Autenticado com sucesso via 2FA' });
        } catch (error) {
            console.error("❌: " + error);
            return res.status(500).json({ message: "Error: " + error });
        }
    }

    async disable2fa(req: Request, res: Response): Promise<Response> {
        try {
            const { auth_id } = req.body;

            if (!auth_id) {
                return res.status(400).json({ message: 'Dados obrigatórios faltando' });
            }

            const result = await this.auth_service.disable2fa(Number(auth_id));

            if (!result) {
                return res.status(401).json({ message: '❌ Erro ao tentar desativar 2FA!' });
            }

            return res.status(200).json({ message: '✅ 2FA desativado com sucesso' });
        } catch (error) {
            console.error("Erro no controller (disable2fa):", error);
            return res.status(500).json({ message: "Erro interno ao desativar 2FA" });
        }
    }

}