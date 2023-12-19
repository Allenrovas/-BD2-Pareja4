import chalk from "chalk";
import inquirer from "inquirer";
import {  session } from "../config/constants.js";
import clear from "clear";

import menuCrud from "./crud.js";
import { poolLog } from "../db/connectionLog.js";
import verificarPermisos from "./permisos.js";

const deletes = async (connection, tabla) => {

    let permisos = true;

    if (session.role !== "Administrador") {
        permisos = await verificarPermisos(tabla, 'DELETE');
    }

    console.log(chalk.bgBlue.bold("\n---------------- ELIMINAR REGISTROS ----------------"));

    if(!permisos)
    {
        console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
        console.log(chalk.red.bold("\n> No tiene permisos para eliminar registros."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó eliminar un registro, no tiene los permisos correspondiente a su rol`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        return await menuCrud(4,connection);
    }



    const id = await inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: `Ingrese el id del registro a eliminar de la tabla ${tabla}: `,
        },
    ]);


    

    if (tabla === "paciente") {
        var registro = await connection.query(`SELECT * FROM bd2_practica2.${tabla} WHERE idPaciente = ?`, [id.id]);
    } else if(tabla === "habitacion") {
        var registro = await connection.query(`SELECT * FROM bd2_practica2.${tabla} WHERE idHabitacion = ?`, [id.id]);
    } else if(tabla === "log_actividad") {
        var registro = await connection.query(`SELECT * FROM bd2_practica2.${tabla} WHERE id_log_actividad = ?`, [id.id]);
    } else if(tabla === "log_habitacion") {
        var registro = await connection.query(`SELECT * FROM bd2_practica2.${tabla} WHERE id_log_habitacion = ?`, [id.id]);
    }


    if (registro[0].length == 0) {
        console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
        console.log(chalk.red.bold("\n> El registro no existe."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó eliminar un registro que no existe`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        return await menuCrud(4, connection);
    }

    //quitar el \r de los registros

    const registroFormateado = registro[0].map(fila => {
        const filaFormateada = { ...fila };
        Object.keys(filaFormateada).forEach(key => {
            if (typeof filaFormateada[key] === 'string') {
                filaFormateada[key] = filaFormateada[key].replace(/\r/g, ''); // Reemplazar \r con cadena vacía
            }
        });
        return filaFormateada;
    });

    //Mostrar el registro a actualizar
    console.log(chalk.bgBlue.bold("\n---------------- REGISTRO A ELIMINAR ----------------"));
    console.table(registroFormateado[0]);

    const { confirm } = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "¿Está seguro de eliminar el registro?",
        },
    ]);

    if (!confirm) {
        return await menuCrud(4, connection);
    }

    if (tabla === "paciente") {
        await connection.query(`DELETE FROM bd2_practica2.${tabla} WHERE idPaciente = ?`, [id.id]);
    } else if(tabla === "habitacion") {
        await connection.query(`DELETE FROM bd2_practica2.${tabla} WHERE idHabitacion = ?`, [id.id]);
    } else if(tabla === "log_actividad") {
        await connection.query(`DELETE FROM bd2_practica2.${tabla} WHERE id_log_actividad = ?`, [id.id]);
    } else if(tabla === "log_habitacion") {
        await connection.query(`DELETE FROM bd2_practica2.${tabla} WHERE id_log_habitacion = ?`, [id.id]);
    }

    console.log(chalk.bgGreen.bold("\n---------------- REGISTRO ELIMINADO ----------------"));

    await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Eliminó un registro`, session.user]);

    await inquirer.prompt([
        {
            type: "input",
            name: "continue",
            message: "Presione enter para continuar...",
        },
    ]);

    return await menuCrud(4, connection);

};

export default deletes;