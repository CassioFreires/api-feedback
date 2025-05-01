"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninDto = void 0;
class SigninDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    validate() {
        if (!this.email || !this.password) {
            throw new Error('É necessário preencher todos os campos para inscrever-se');
        }
        if (!this.email.includes('@')) {
            throw new Error('E-mail inválido');
        }
        if (this.password.length < 6) {
            throw new Error('Senha muito curta');
        }
    }
    getData() {
        return {
            email: this.email,
            password: this.password,
        };
    }
}
exports.SigninDto = SigninDto;
