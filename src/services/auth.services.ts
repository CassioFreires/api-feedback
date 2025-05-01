import { IResponseSignup } from "../interfaces/dtos/auth/IResponseSignup";
import AuthRepository from "../repository/auth.repository";
import { ISignup } from "../interfaces/dtos/auth/ISignup";
import passwordCrypt from "../utils/generatePwdCrypt";

export default class AuthService {
    private auth_repository: AuthRepository;

    constructor() {
        this.auth_repository = new AuthRepository();
    }

    async signup(signup: ISignup): Promise<IResponseSignup> {
        try {
            const generatePwdCrypt = await passwordCrypt(signup.password_hash);

            const signupFormated = {
                email: signup.email.toLowerCase(),
                password_hash: generatePwdCrypt,
                name: signup.name.toLowerCase(),
                role: signup.role?.toLocaleLowerCase()
            }
            const dataSignup = await this.auth_repository.signup(signupFormated);
            return dataSignup;
        } catch (error) {
            console.log('❌ Erro interno no servidor');
            throw error;
        }
    }
}