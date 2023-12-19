import chalk from "chalk";
import inquirer from "inquirer";
import { menuTitle, session } from "../config/constants.js";
import clear from "clear";

import { main } from "../index.js";
import menuCrud from "./crud.js";
import { poolLog } from "../db/connectionLog.js";
import verificarPermisos from "./permisos.js";

const consulta = async (connection, tabla) => {


    const permisos = await verificarPermisos(tabla, 'SELECT');

    if(!permisos)
    {
        console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
        console.log(chalk.red.bold("\n> No tiene permisos para realizar consultas."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó realizar una consulta, no tiene los permisos correspondiente a su rol`, session.user]);
        
        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        await menuCrud(connection);
    }


};

export default consulta;