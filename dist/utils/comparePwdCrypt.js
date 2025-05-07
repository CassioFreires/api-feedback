import bycript from 'bcryptjs';
const comparePwdCrypt = (password, password_hash) => {
    const isValid = bycript.compare(password, password_hash);
    return isValid;
};
export default comparePwdCrypt;
