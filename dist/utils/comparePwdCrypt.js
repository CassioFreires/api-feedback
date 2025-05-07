"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const comparePwdCrypt = (password, password_hash) => {
    const isValid = bcryptjs_1.default.compare(password, password_hash);
    return isValid;
};
exports.default = comparePwdCrypt;
