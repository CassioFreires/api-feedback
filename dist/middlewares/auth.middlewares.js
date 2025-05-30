import decodeTokenAuth from '../utils/decodeTokenAuth.js';
export default class AuthMiddleware {
    async validate(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization)
                return res.status(401).json({ message: '❌ Acesso negado!' });
            const index = authorization.split(' ');
            const [bearer, token] = index;
            if (index.length <= 0 || !bearer || !token)
                return res.status(401).json({ message: '❌ Acesso negado!' });
            const decode = await decodeTokenAuth(token);
            req.data = decode;
            next();
        }
        catch (error) {
            console.error('❌: Erro ao tentar acessar o relatório de usuários ativos!' + error);
            return res.status(500).json({ message: "❌" + error });
        }
    }
    async validateRole(req, res, next, allowedRoles) {
        try {
            const { id, email, name, role_name, description } = req.data;
            // Verifica se o role do usuário está entre os permitidos
            if (!allowedRoles.includes(role_name)) {
                return res.status(403).json({ message: '❌ Acesso negado: perfil sem permissão!' });
            }
            console.log(`✅ Usuário ${email} com permissão de acesso (${role_name})`);
            next();
        }
        catch (error) {
            console.error('❌: Erro ao tentar validar acesso com base no perfil do usuário');
            return res.status(500).json({ message: '❌: ' + error });
        }
    }
}
