"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenDto = void 0;
class RefreshTokenDto {
    constructor(auth_id, refreshToken, expires_at, created_at, user_agent, ip_address) {
        this.auth_id = auth_id;
        this.refreshToken = refreshToken;
        this.expires_at = expires_at;
        this.created_at = created_at;
        this.user_agent = user_agent;
        this.ip_address = ip_address;
    }
    validate() {
        if (!this.auth_id || !this.refreshToken || !this.expires_at || !this.created_at) {
            throw new Error('É necessário preencher todos os campos para inscrever-se');
        }
    }
    getData() {
        return {
            auth_id: this.auth_id,
            refreshToken: this.refreshToken,
            expires_at: this.expires_at,
            created_at: this.created_at,
        };
    }
}
exports.RefreshTokenDto = RefreshTokenDto;
