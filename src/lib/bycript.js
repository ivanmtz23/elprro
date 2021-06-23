import { hashSync, compareSync } from 'bcrypt';

export const encrypt = (password) => {
    const encryptedPassword = hashSync(password, 10);
    return encryptedPassword;
 }

export const comparePassword = (password, hash) => {
    const isEquals = compareSync(password, hash);
    return isEquals;
 }