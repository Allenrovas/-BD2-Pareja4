import chalk from "chalk";
import inquirer from "inquirer";
import {  session } from "../config/constants.js";
import clear from "clear";

import menuCrud from "./crud.js";
import { poolLog } from "../db/connectionLog.js";
import verificarPermisos from "./permisos.js";

const update = async (connection, tabla) => {

    let permisos = true;

    if (session.role !== "Administrador") {
        permisos = await verificarPermisos(tabla, 'UPDATE');
    }

   if (!permisos) {
       console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
       console.log(chalk.red.bold("\n> No tiene permisos para actualizar registros."));
       await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, no tiene los permisos correspondiente a su rol`, session.user]);

       await inquirer.prompt([
           {
               type: "input",
               name: "continue",
               message: "Presione enter para continuar...",
           },
       ]);
       return await menuCrud(2, connection);
   }

   //Pedir el id del registro a actualizar


    console.log(chalk.bgBlueBright.bold("------------------ ACTUALIZAR -------------------\n"));

    const id = await inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: `Ingrese el id del registro a actualizar de la tabla ${tabla}: `,
        },
    ]);

    //Verificar si el registro existe
    
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
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro que no existe`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        return await menuCrud(2, connection);
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
    console.log(chalk.bgBlue.bold("\n---------------- REGISTRO A ACTUALIZAR ----------------"));
    console.table(registroFormateado[0]);

    //Pedir los nuevos datos
    if (tabla === "paciente") {
        let { edad, genero } = await inquirer.prompt([
            {
                type: "input",
                name: "edad",
                message: `Ingrese la nueva edad: `,
            },
            {
                type: "input",
                name: "genero",
                message: `Ingrese el nuevo género (M/F/O): `,
            },
        ]);

        //Verificar que edad sea un numero entero mayor a 0

        if (isNaN(edad)|| edad < 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> La edad debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, la edad no es un número entero`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Verificar que genero sea M o F
        //Hacer uppercase para que no importe si es mayuscula o minuscula

        genero = genero.toUpperCase();

        if (genero !== "M" && genero !== "F" && genero !== "O") {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El género debe ser M o F u O."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el género no es M o F u O`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Preguntar si en verdad se quiere actualizar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea actualizar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, no confirmó la actualización`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }


        if (genero === "M") {
            await connection.query(`UPDATE bd2_practica2.${tabla} SET edad = ?, genero = ? WHERE idPaciente = ?`, [edad, "Masculino", id.id]);
        } else if (genero === "F") {
            await connection.query(`UPDATE bd2_practica2.${tabla} SET edad = ?, genero = ? WHERE idPaciente = ?`, [edad, "Femenino", id.id]);
        } else if (genero === "O") {
            await connection.query(`UPDATE bd2_practica2.${tabla} SET edad = ?, genero = ? WHERE idPaciente = ?`, [edad, "Otro", id.id]);
        }


        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Actualizó un registro de la tabla con id ${id.id}`, session.user]);
    
        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se actualizó el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(2, connection);

    } else if (tabla === "habitacion") {
        let { habitacion } = await inquirer.prompt([
            {
                type: "input",
                name: "habitacion",
                message: `Ingrese el nuevo nombre de habitación: `,
            },
        ]);

        //Verificar que habitacion sea menos de 50 caracteres
        
        if (habitacion.length > 50) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> La habitación debe tener menos de 50 caracteres."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, la habitación tiene más de 50 caracteres`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Preguntar si en verdad se quiere actualizar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea actualizar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, no confirmó la actualización`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        await connection.query(`UPDATE bd2_practica2.${tabla} SET habitacion = ? WHERE idHabitacion = ?`, [habitacion, id.id]);

        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Actualizó un registro de la tabla con id ${id.id}`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se actualizó el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(2, connection);

    } else if (tabla === "log_actividad") {
        let { actividad, idHabitacion, idPaciente } = await inquirer.prompt([
            {
                type: "input",
                name: "actividad",
                message: `Ingrese la nueva actividad: `,
            },
            {
                type: "input",
                name: "idHabitacion",
                message: `Ingrese el nuevo id de habitación: `,
            },
            {
                type: "input",
                name: "idPaciente",
                message: `Ingrese el nuevo id de paciente: `,
            },
        ]);

        

        //Verificar que actividad sea menos de 500 caracteres

        if (actividad.length > 500) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> La actividad debe tener menos de 500 caracteres."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, la actividad tiene más de 500 caracteres`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Verificar que idHabitacion sea un numero entero

        if (isNaN(idHabitacion)) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el id de habitación no es un número entero`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Verificar que idPaciente sea un numero entero

        if (isNaN(idPaciente)) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de paciente debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el id de paciente no es un número entero`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Verificar que idHabitacion exista

        const habitacion = await connection.query(`SELECT * FROM bd2_practica2.habitacion WHERE idHabitacion = ?`, [idHabitacion]);

        if (habitacion[0].length == 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación no existe."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el id de habitación no existe`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }

        //Verificar que idPaciente exista

        const paciente = await connection.query(`SELECT * FROM bd2_practica2.paciente WHERE idPaciente = ?`, [idPaciente]);

        if (paciente[0].length == 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de paciente no existe."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el id de paciente no existe`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }


        //Preguntar si en verdad se quiere actualizar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea actualizar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, no confirmó la actualización`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(2, connection);
        }


        await connection.query(`UPDATE bd2_practica2.${tabla} SET actividad = ?, idHabitacion = ?, idPaciente = ? WHERE id_log_actividad = ?`, [ actividad, idHabitacion, idPaciente, id.id]);

        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Actualizó un registro de la tabla con id ${id.id}`, session.user]);


        //Decir que se actualizó el registro

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se actualizó el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(2, connection);

    } else if (tabla === "log_habitacion") {
        let { statux, idHabitacion } = await inquirer.prompt([
            {
                type: "input",
                name: "statux",
                message: `Ingrese el nuevo status de la habitación: `,
            },
            {
                type: "input",
                name: "idHabitacion",
                message: `Ingrese el nuevo id de habitación: `,
            },
        ]);

        

        //Verificar que statux sea menor de 45 caracteres

        if (statux.length > 45) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El status debe tener menos de 45 caracteres."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el status tiene más de 45 caracteres`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(2, connection);
        }

        //Verificar que idHabitacion sea un numero entero

        if (isNaN(idHabitacion)) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el id de habitación no es un número entero`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(2, connection);
        }

        //Verificar que idHabitacion exista

        const habitacion = await connection.query(`SELECT * FROM bd2_practica2.habitacion WHERE idHabitacion = ?`, [idHabitacion]);

        if (habitacion[0].length == 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación no existe."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, el id de habitación no existe`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(2, connection);
        }

        //Preguntar si en verdad se quiere actualizar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea actualizar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, no confirmó la actualización`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(2, connection);

        }

        await connection.query(`UPDATE bd2_practica2.${tabla} SET  statusx = ?, idHabitacion = ? WHERE id_log_habitacion = ?`, [ statux, idHabitacion, id.id]);

        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Actualizó un registro de la tabla con id ${id.id}`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se actualizó el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(2, connection);
    }

};

export default update;