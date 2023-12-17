import bcrypt from 'bcrypt';

export const userRoles = {
    ASISTENTE: 1,
    DOCTOR: 2,
    SOPORTE: 3,
    ADMINISTRADOR: 4
};

export const menuOptions = {
    CONSULTAS: 1,
    ACTUALIZAR: 2,
    AGREGAR: 3,
    ELIMINAR: 4,
    RESPALDO: 5,
    VER_RESPALDOS: 6,
    RESTAURAR_RESPALDO: 7
};

export const session = {
    user: null,
    role: null
};

export const mainTitle = `
  ___ _    ___   _  _  ___  ___ ___ ___ _____ _   _    
 / __| |  |_ _| | || |/ _ \\/ __| _ \\_ _|_   _/_\\ | |   
| (__| |__ | |  | __ | (_) \\__ \\  _/| |  | |/ _ \\| |__ 
 \\___|____|___| |_||_|\\___/|___/_| |___| |_/_/ \\_\\____|
`;

export const menuTitle = `
                \\  |  __|   \\ |  |  |   
               |\\/ |  _|   .  |  |  |   
              _|  _| ___| _|\\_| \\__/
`;

export const encriptarPassword = (password) => {
    const salt = bcrypt.genSaltSync(4);
    return bcrypt.hashSync(password, salt);
}

export const validarPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}