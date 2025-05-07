"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor() {
        this.getUserActive = async (req, res) => {
            try {
            }
            catch (error) {
                console.error('❌: ' + error);
                return res.status(500).json({ message: '❌' + 'Não foi possível retornar os usuários ativos!' });
            }
        };
    }
}
exports.default = UserController;
