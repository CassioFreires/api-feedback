"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupDto = void 0;
class SignupDto {
    constructor(email, password_hash, name, role) {
        this.email = email;
        this.password_hash = password_hash;
        this.name = name;
        this.role = role;
    }
    validate() {
        if (!this.email || !this.password_hash || !this.name) {
            throw new Error('É necessário preencher todos os campos para inscrever-se');
        }
        if (!this.email.includes('@')) {
            throw new Error('E-mail inválido');
        }
        if (this.password_hash.length < 6) {
            throw new Error('Senha muito curta');
        }
        const allowedRoles = ['admin', 'gestor', 'colaborador', ''];
        if (!allowedRoles.includes(this.role)) {
            throw new Error('Role inválida');
        }
    }
    getData() {
        this.validate();
        return {
            email: this.email,
            password_hash: this.password_hash,
            name: this.name,
            role: this.role
        };
    }
}
exports.SignupDto = SignupDto;
