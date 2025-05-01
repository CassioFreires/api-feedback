import { IResponseAuth } from "../interfaces/dtos/auth/IResponseAuth";
import AuthRepository from "../repository/auth.repository";
import { ISignup } from "../interfaces/dtos/auth/ISignup";
import passwordCrypt from "../utils/generatePwdCrypt";
import { ISignin } from "../interfaces/dtos/auth/ISignin";

export default class AuthService {
    private auth_repository: AuthRepository;

    constructor() {
        this.auth_repository = new AuthRepository();
    }

    async signup(signup: ISignup): Promise<IResponseAuth> {
        try {
            const generatePwdCrypt = await passwordCrypt(signup.password_hash);

            const signupFormated = {
                email: signup.email.toLowerCase(),
                password_hash: generatePwdCrypt,
                name: signup.name.toLowerCase(),
                role: signup.role?.toLocaleLowerCase()
            }
            const dataSignup = await this.auth_repository.signup(signupFormated);
            if (dataSignup) {
                if (dataSignup.code == 'ER_DUP_ENTRY' || dataSignup.sqlState == 'ER_DUP_ENTRY') {
                    console.error('❌: E-mail cadastrado, tente outro!');
                    return { message: "❌ E-mail cadastrado, tente outro!", status: 404 }
                }
            }
            return dataSignup;
        } catch (error: any) {
            console.error('❌ Erro interno ao tentar usuario no banco de dados');
            throw error;
        }
    }

    async signin(signin: ISignin): Promise<IResponseAuth> {
        try {
            const newAuth = {
                email: signin.email.toLowerCase(),
                password: signin.password
            }

            const signinService = await this.auth_repository.signin(newAuth);
            if (!signinService) {
                console.error('❌ Error: Usuário ou inválido!');
                return signinService;
            }
            if (signinService.email !== newAuth.email || signinService.password_hash !== signin.password) {
                console.error('🚨Usuário ou Senha inválido! teste');
            }
            return signinService;
        } catch (error:any) {
            console.error('❌:' + error);
            return error;
        }
    }
}