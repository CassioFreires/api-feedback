import knex from 'knex';
import chalk from 'chalk';

const db = knex({

  
  client: process.env.MYSQL_NAME,
  connection: {
    host: process.env.MYSQL_LOCALHOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  pool: { min: 2, max: 10 },
})

export async function testarConexao() {
  try {
    // Verifica a conexão com o banco de dados executando uma consulta simples
    await db.raw('SELECT 1+1 AS result');
    console.log(chalk.green('✅ Conexão com o banco realizada! ✅'));
  } catch (err) {
    console.error(chalk.red('🚨Erro ao conectar com o banco de dados: 🚨', err));
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}


export default db;
