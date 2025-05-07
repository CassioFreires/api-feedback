import jwt from 'jsonwebtoken';
export const generateTokenAccess = (data) => {
    try {
        const token = jwt.sign(data, String(process.env.TOKEN_PRIVATE_KEY), { algorithm: "HS256", expiresIn: 60 * 60 });
        return token;
    }
    catch (error) {
        console.error('❌: ' + error);
        return error;
    }
};
export const generateRefreshTokenAccess = (data) => {
    try {
        const refreshToken = jwt.sign(data, String(process.env.TOKEN_PRIVATE_KEY_REFRESH), { algorithm: 'HS256', expiresIn: (7 * 24 * 60 * 60) });
        return refreshToken;
    }
    catch (error) {
        console.error('❌: ' + error);
        return error;
    }
};
