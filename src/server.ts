import express from 'express';
import env from 'dotenv';
import chalk from 'chalk';
const app = express();
env.config();

import { testarConexao } from './config/db.config';



// rotas
import authRouter from './routers/auth.routers';


app.use(express.json());

app.use('/auth', authRouter);

testarConexao()
.then(() => {
    app.listen(process.env.HTTP_PORT, () => {
        console.log(chalk.green('✅ Server running in port: ✅ ' + process.env.HTTP_PORT));
    })
})
.catch((error) => {
    console.error(chalk.red('❌ Erro ao conectar no banco de dados: ❌', error));
    throw error;
})
