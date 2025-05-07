import knex from 'knex';
import chalk from 'chalk';

const db = knex({

  
  client: process.env.MYSQL_NAME || 'mysql2',
  connection: {
    host: process.env.MYSQL_LOCALHOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Freires2@',
    database: process.env.MYSQL_DATABASE || 'insightflow',
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
