"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshTokenAccess = exports.generateTokenAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAccess = (data) => {
    try {
        const token = jsonwebtoken_1.default.sign(data, String(process.env.TOKEN_PRIVATE_KEY), { algorithm: "HS256", expiresIn: 60 * 60 });
        return token;
    }
    catch (error) {
        console.error('❌: ' + error);
        return error;
    }
};
exports.generateTokenAccess = generateTokenAccess;
const generateRefreshTokenAccess = (data) => {
    try {
        const refreshToken = jsonwebtoken_1.default.sign(data, String(process.env.TOKEN_PRIVATE_KEY_REFRESH), { algorithm: 'HS256', expiresIn: (7 * 24 * 60 * 60) });
        return refreshToken;
    }
    catch (error) {
        console.error('❌: ' + error);
        return error;
    }
};
exports.generateRefreshTokenAccess = generateRefreshTokenAccess;
