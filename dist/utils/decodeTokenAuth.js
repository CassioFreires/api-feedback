import jwt from 'jsonwebtoken';
const decodeTokenAuth = async (token) => {
    try {
        const decode = await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
        return decode;
    }
    catch (error) {
        console.error("❌ Não foi possível descriptografar o token de acesso");
        throw new Error('❌:' + error);
    }
};
export default decodeTokenAuth;
