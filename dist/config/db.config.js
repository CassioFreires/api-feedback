"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testarConexao = testarConexao;
const knex_1 = __importDefault(require("knex"));
const chalk_1 = __importDefault(require("chalk"));
const db = (0, knex_1.default)({
    client: process.env.MYSQL_NAME,
    connection: {
        host: process.env.MYSQL_LOCALHOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    pool: { min: 2, max: 10 },
});
async function testarConexao() {
    try {
        // Verifica a conexão com o banco de dados executando uma consulta simples
        await db.raw('SELECT 1+1 AS result');
        console.log(chalk_1.default.green('✅ Conexão com o banco realizada! ✅'));
    }
    catch (err) {
        console.error(chalk_1.default.red('🚨Erro ao conectar com o banco de dados: 🚨', err));
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}
exports.default = db;
