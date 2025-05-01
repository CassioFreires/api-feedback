import jwt from 'jsonwebtoken';

export const generateTokenAccess = (idUser: string) => {
    try {
        const token = jwt.sign({ id: idUser }, String(process.env.TOKEN_PRIVATE_KEY), { algorithm: "HS256", expiresIn: 60 * 60 });
        return token;
    } catch (error) {
        console.error('❌: ' + error);
        return error;
    }
}


export const generateRefreshTokenAccess = (idUser: string) => {
    try {
        const refreshToken = jwt.sign({ id: idUser }, String(process.env.TOKEN_PRIVATE_KEY_REFRESH), { algorithm: 'HS256', expiresIn: (7 * 24 * 60 * 60) });
        return refreshToken;
    } catch (error) {
        console.error('❌: ' + error);
        return error;
    }
}