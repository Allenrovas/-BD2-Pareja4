import { session } from "../config/constants.js";


const verificarPermisos = (tabla, operacion) => {
    if(session.permissions[tabla] !== undefined)
    {
        if(session.permissions[tabla].includes(operacion))
        {
            return true;
        }
    }
    return false;
}

export default verificarPermisos;