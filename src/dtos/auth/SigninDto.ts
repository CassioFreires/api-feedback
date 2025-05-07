import { ISignin } from "../../interfaces/dtos/auth/ISignin.js";

export class SigninDto implements ISignin {
    constructor(public email: string, public password: string) { }

     validate(): void {
        if(!this.email || !this.password) {
            throw new Error('É necessário preencher todos os campos para inscrever-se');
        }
        if(!this.email.includes('@')){
            throw new Error('E-mail inválido');
        }
        if(this.password.length < 6) {
            throw new Error('Senha muito curta');
        }
    }

    getData() {
        return {
            email: this.email,
            password: this.password,
        }
    }
}