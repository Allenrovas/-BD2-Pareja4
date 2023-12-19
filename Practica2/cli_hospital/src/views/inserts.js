import chalk from "chalk";
import inquirer from "inquirer";
import {  session } from "../config/constants.js";
import clear from "clear";

import menuCrud from "./crud.js";
import { poolLog } from "../db/connectionLog.js";
import verificarPermisos from "./permisos.js";

const insert = async (connection, tabla) => {

    let permisos = true;

    if (session.role !== "Administrador") {
        permisos = await verificarPermisos(tabla, 'INSERT');
    }

    if(!permisos)
    {
        console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
        console.log(chalk.red.bold("\n> No tiene permisos para agregar registros."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó agregar un registro, no tiene los permisos correspondiente a su rol`, session.user]);
        
        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        return await menuCrud(3,connection);
    }

    console.log(chalk.bgBlueBright.bold("---------------- AGREGAR REGISTRO ---------------\n"));

    if (tabla === "paciente") {
        let { edad, genero } = await inquirer.prompt([
            {
                type: "input",
                name: "edad",
                message: `Ingrese la edad: `,
            },
            {
                type: "input",
                name: "genero",
                message: `Ingrese el género (M/F/O): `,
            },
        ]);

        //Verificar que edad sea un numero entero mayor a 0

        if (isNaN(edad)|| edad < 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> La edad debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, la edad no es un número entero`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Verificar que genero sea M o F
        //Hacer uppercase para que no importe si es mayuscula o minuscula

        genero = genero.toUpperCase();

        if (genero !== "M" && genero !== "F" && genero !== "O") {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El género debe ser M o F u O."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el género no es M o F u O`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Preguntar si en verdad se quiere insertar el registro

        const confirmInsert = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea agregar el registro?",
                default: false,
            },
        ]);

        if (!confirmInsert.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó agregar un registro, no confirmó la inserción`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(3, connection);

        }


        if (genero === "M") {
            await connection.query(`INSERT INTO bd2_practica2.${tabla} (edad, genero) VALUES (?, 'Masculino')`, [edad]);
        } else if (genero === "F") {
            await connection.query(`INSERT INTO bd2_practica2.${tabla} (edad, genero) VALUES (?, 'Femenino')`, [edad]);
        } else if (genero === "O") {
            await connection.query(`INSERT INTO bd2_practica2.${tabla} (edad, genero) VALUES (?, 'Otro')`, [edad]);
        }


        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Agregó un registro a la tabla ${tabla}`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se agregó el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(3, connection);

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
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, la habitación tiene más de 50 caracteres`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Preguntar si en verdad se quiere insertar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea insertar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, no confirmó la inserción`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        await connection.query(`INSERT INTO bd2_practica2.${tabla} (habitacion) VALUES (?)`, [habitacion]);

        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Insertó un registro en la tabla habitacion`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se insertó el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(3, connection);

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
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, la actividad tiene más de 500 caracteres`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Verificar que idHabitacion sea un numero entero

        if (isNaN(idHabitacion)) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el id de habitación no es un número entero`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Verificar que idPaciente sea un numero entero

        if (isNaN(idPaciente)) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de paciente debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el id de paciente no es un número entero`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Verificar que idHabitacion exista

        const habitacion = await connection.query(`SELECT * FROM bd2_practica2.habitacion WHERE idHabitacion = ?`, [idHabitacion]);

        if (habitacion[0].length == 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación no existe."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el id de habitación no existe`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        //Verificar que idPaciente exista

        const paciente = await connection.query(`SELECT * FROM bd2_practica2.paciente WHERE idPaciente = ?`, [idPaciente]);

        if (paciente[0].length == 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de paciente no existe."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el id de paciente no existe`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }


        //Preguntar si en verdad se quiere insertar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea insertar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, no confirmó la inserción`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            return await menuCrud(3, connection);
        }

        const currentDay = new Date();
        const formattedDate = `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()} ${currentDay.getHours()}:${currentDay.getMinutes()}:${currentDay.getSeconds()}`;
        
        await connection.query(`INSERT INTO bd2_practica2.${tabla} (actividad, idHabitacion, idPaciente, timestampx) VALUES (?, ?, ?, ?)`, [actividad, idHabitacion, idPaciente, formattedDate]);
        
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Insertó un registro de la tabla log_actividad `, session.user]);
        
        console.log(chalk.green.bold("  > Registro insertado con éxito."));

        //Decir que se insertó el registro

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se inserto el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(3, connection);

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
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el status tiene más de 45 caracteres`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(3, connection);
        }

        //Verificar que idHabitacion sea un numero entero

        if (isNaN(idHabitacion)) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación debe ser un número entero."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el id de habitación no es un número entero`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(3, connection);
        }

        //Verificar que idHabitacion exista

        const habitacion = await connection.query(`SELECT * FROM bd2_practica2.habitacion WHERE idHabitacion = ?`, [idHabitacion]);

        if (habitacion[0].length == 0) {
            console.log(chalk.bgRed.bold("\n---------------- ERROR ----------------"));
            console.log(chalk.red.bold("\n> El id de habitación no existe."));
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, el id de habitación no existe`, session.user]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(3, connection);
        }

        //Preguntar si en verdad se quiere insertar el registro

        const confirmUpdate = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "¿Está seguro de que desea insertar el registro?",
                default: false,
            },
        ]);

        if (!confirmUpdate.confirm) {
            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó insertar un registro, no confirmó la inserción`, session.user]);

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            return await menuCrud(3, connection);

        }

        const currentDay = new Date();

        await connection.query(`INSERT INTO bd2_practica2.${tabla} (statusx, idHabitacion, timestampx) VALUES (?, ?, ?)`, [statux, idHabitacion, currentDay]);

        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Inserto un registro de la tabla con id log_habitacion`, session.user]);

        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Se inserto el registro. Presione enter para continuar...",
            },
        ]);

        return await menuCrud(3, connection);
    }

};

export default insert;