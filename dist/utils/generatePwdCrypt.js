"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passwordCrypt = async (password) => {
    try {
        const passwordHash = bcryptjs_1.default.hashSync(password, 10);
        return passwordHash;
    }
    catch (error) {
        console.error('🚨 Error ao tentar gerar senha criptograda');
        throw error;
    }
};
exports.default = passwordCrypt;
