import bcrypt from 'bcrypt';

export const cifrarPassword = async (password) => {
    const salt = await bcrypt.genSalt(4);
    return await bcrypt.hash(password, salt);
}

export const compararPassword = async (password, passwordCifrado) => {
    return await bcrypt.compare(password, passwordCifrado);
}