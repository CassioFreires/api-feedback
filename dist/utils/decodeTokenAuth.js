"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const decodeTokenAuth = async (token) => {
    try {
        const decode = await jsonwebtoken_1.default.verify(token, process.env.TOKEN_PRIVATE_KEY);
        return decode;
    }
    catch (error) {
        console.error("❌ Não foi possível descriptografar o token de acesso");
        throw new Error('❌:' + error);
    }
};
exports.default = decodeTokenAuth;
