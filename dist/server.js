"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const db_config_1 = require("./config/db.config");
// rotas
const auth_routers_1 = __importDefault(require("./routers/auth.routers"));
const users_routers_1 = __importDefault(require("./routers/users.routers"));
app.use(express_1.default.json());
app.use('/auth', auth_routers_1.default);
app.use('/users', users_routers_1.default);
(0, db_config_1.testarConexao)()
    .then(() => {
    app.listen(process.env.HTTP_PORT, () => {
        console.log(chalk_1.default.green('✅ Server running in port: ✅ ' + process.env.HTTP_PORT));
    });
})
    .catch((error) => {
    console.error(chalk_1.default.red('❌ Erro ao conectar no banco de dados: ❌', error));
    throw error;
});
