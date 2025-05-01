import { Request, Response } from "express";
import AuthService from "../services/auth.services";
import { SignupDto } from "../dtos/auth/SignupDto";
import { IResponseAuth } from "../interfaces/dtos/auth/IResponseAuth";
import { SigninDto } from "../dtos/auth/SigninDto";
import chalk from "chalk";

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
                return res.json({ message: signupUser.message, status: signupUser.status});
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

            const auth = await this.auth_service.signin(newAuth);
            if (!auth) {
                return res.status(404).json({ message: '❌ Error: Usuário ou inválido!', status: 404 });
            }
            return res.status(200).json({ message: 'Login OK', status: 200 });
        } catch (error) {
            console.error(chalk.red('🚨' + error));
            return res.status(500).json({ message: '❌: ' + error });
        }
    }
}