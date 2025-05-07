import speakeasy from 'speakeasy';
import QRcode from 'qrcode';
import crypto from 'crypto';


export const generateCodeTotp = async () => {
    try {
        // Gerar o segredo TOTP
        const secret: any = speakeasy.generateSecret({ length: 20, name: 'insighFlow' });

        // Gerar o código TOTP
        const token = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
        });

        console.log('Código TOTP gerado:', token);

        // Gerar o QR Code
        const qrCode = await QRcode.toDataURL(secret.otpauth_url);

        // Retornar o segredo e o QR Code gerado
        return {
            secret: secret.base32, // Segredo que deve ser guardado no banco
            qrcode: qrCode         // QR Code gerado para o app de autenticação
        };
    } catch (err) {
        console.error('Erro ao gerar o código TOTP:', err);
        throw new Error('Erro ao gerar o código TOTP');
    }
};



