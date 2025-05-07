import bycript from 'bcryptjs';

const comparePwdCrypt = (password: string, password_hash: string) => {
    const isValid =  bycript.compare(password, password_hash);
    return isValid;
}

export default comparePwdCrypt;