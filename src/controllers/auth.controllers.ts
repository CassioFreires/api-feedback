import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import AuthService from "../services/auth.services";
import { SignupDto } from "../dtos/auth/SignupDto";
import { IResponseAuth } from "../interfaces/dtos/auth/IResponseAuth";
import { SigninDto } from "../dtos/auth/SigninDto";
import chalk from "chalk";
import { generateRefreshTokenAccess, generateTokenAccess } from "../utils/generateToken";

export default class AuthController {
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
            const userAgent = req.headers['user-agent'];

            // Pega o IP real do usuário
            const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const proxyIp = req.socket.remoteAddress;

            const newAuth = new SigninDto(email, password);
            newAuth.validate();

            const auth = await this.auth_service.signin(newAuth);
            if (!auth) {
                return res.status(404).json({ message: '❌ Error: Usuário ou inválido!', status: 404 });
            }

            const token = generateTokenAccess(String(auth.data?.id));
            const refreshToken = generateRefreshTokenAccess(String(auth.data?.id));

            // Passa o refreshToken para o service
            const authWithRefreshToken = await this.auth_service.saveRefreshToken(Number(auth.data?.id), String(refreshToken), String(userAgent), String(rawIp), String(proxyIp));

            return res.status(200).json({ message: 'Login OK', status: 200, token: token, refreshToken: refreshToken });
        } catch (error) {
            console.error(chalk.red('🚨' + error));
            return res.status(500).json({ message: '❌: ' + error });
        }
    }

    async refresh(req: Request, res: Response): Promise<Response<IResponseAuth>> {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.status(401).json({ message: 'Token ausente' });

            const decoded = jwt.verify(refreshToken, String(process.env.TOKEN_PRIVATE_KEY_REFRESH));

            if (typeof decoded === 'object' && 'id' in decoded) {
                const newAccessToken = generateTokenAccess(decoded.id); // OK
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
}