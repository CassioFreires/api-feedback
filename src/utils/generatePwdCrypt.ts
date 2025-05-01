import bcrypt from "bcryptjs";

const passwordCrypt = async (password:string) => {
    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        return passwordHash;
    }catch(error) {
        console.error('🚨 Error ao tentar gerar senha criptograda');
        throw error;
    }
}

export default passwordCrypt;