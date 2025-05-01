import { ISignup } from "../../interfaces/dtos/auth/ISignup";

export class SignupDto implements ISignup {
    constructor(public email: string, public password_hash: string, public name: string, public role: string) { }

    private validate(): void {
        if(!this.email || !this.password_hash || !this.name) {
            throw new Error('É necessário preencher todos os campos para inscrever-se');
        }
        if(!this.email.includes('@')){
            throw new Error('E-mail inválido');
        }
        if(this.password_hash.length < 6) {
            throw new Error('Senha muito curta');
        }
        const allowedRoles = ['admin', 'gestor', 'colaborador', ''];

        if(!allowedRoles.includes(this.role)) {
            throw new Error('Role inválida')
        }
    }

    getData() {
        this.validate();
        return {
            email: this.email,
            password_hash: this.password_hash,
            name: this.name,
            role: this.role
        }
    }
}