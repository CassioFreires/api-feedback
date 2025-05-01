import { Request, Response } from "express";
import AuthService from "../services/auth.services";
import { SignupDto } from "../dtos/auth/SignupDto";
import { IResponseSignup } from "../interfaces/dtos/auth/IResponseSignup";
import passwordCrypt from "../utils/generatePwdCrypt";

export default class AuthController {
    private auth_service:AuthService;

    constructor(){
        this.auth_service = new AuthService();
    }

    async signup(req:Request, res:Response): Promise<Response<IResponseSignup>>{
        try {
            const {email, password_hash, name, role} = req.body;
            const newSignupUser = new SignupDto(email, password_hash, name, role);
            
            const signupUser = await this.auth_service.signup(newSignupUser);

            return res.json({message: "✅ Usuário criado com sucesso!", status: 201, data: signupUser});
        }catch(error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        
            return res.status(500).json({ message: '❌ Erro de servidor', status: 500, data:[]});
        }
    }
}