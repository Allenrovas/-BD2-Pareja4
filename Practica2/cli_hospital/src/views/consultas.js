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
        await menuCrud(1,connection);
    }

    //Realizar consulta de los ultimos 25 registros
    console.log(chalk.bgBlue.bold("\n---------------- CONSULTA ----------------"));
    
    if (tabla == "paciente") {
        var consulta = await connection.query(`SELECT * FROM bd2_practica2.paciente ORDER BY idPaciente DESC LIMIT 25`);
    } else if (tabla == "habitacion") {
        var consulta = await connection.query(`SELECT * FROM bd2_practica2.habitacion ORDER BY idHabitacion DESC LIMIT 25`);
    } else if (tabla == "log_actividad") {
        var consulta = await connection.query(`SELECT * FROM bd2_practica2.log_actividad ORDER BY id_log_actividad DESC LIMIT 25`);
    } else if (tabla == "log_habitacion") {
        var consulta = await connection.query(`SELECT * FROM bd2_practica2.log_habitacion ORDER BY idHabitacion DESC LIMIT 25`);
    }

    
    const resultadosFormateados = consulta[0].map(fila => {
        const filaFormateada = { ...fila };
        Object.keys(filaFormateada).forEach(key => {
          if (typeof filaFormateada[key] === 'string') {
            filaFormateada[key] = filaFormateada[key].replace(/\r/g, ''); // Reemplazar \r con cadena vacía
          }
        });
        return filaFormateada;
      });
      
    console.table(resultadosFormateados);

    await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Realizó una consulta a la tabla ${tabla}`, session.user]);


    //Regresar al crud
    await inquirer.prompt([
        {
            type: "input",
            name: "continue",
            message: "Presione enter para continuar...",
        },
    ]);
    //Limpiar la consola
    clear();
    await menuCrud(1,connection);


};

export default consulta;