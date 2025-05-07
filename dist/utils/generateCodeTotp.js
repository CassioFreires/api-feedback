"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeTotp = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const generateCodeTotp = async () => {
    try {
        // Gerar o segredo TOTP
        const secret = speakeasy_1.default.generateSecret({ length: 20, name: 'insighFlow' });
        // Gerar o código TOTP
        const token = speakeasy_1.default.totp({
            secret: secret.base32,
            encoding: 'base32',
        });
        console.log('Código TOTP gerado:', token);
        // Gerar o QR Code
        const qrCode = await qrcode_1.default.toDataURL(secret.otpauth_url);
        // Retornar o segredo e o QR Code gerado
        return {
            secret: secret.base32, // Segredo que deve ser guardado no banco
            qrcode: qrCode // QR Code gerado para o app de autenticação
        };
    }
    catch (err) {
        console.error('Erro ao gerar o código TOTP:', err);
        throw new Error('Erro ao gerar o código TOTP');
    }
};
exports.generateCodeTotp = generateCodeTotp;
