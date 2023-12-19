import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import { exec } from "child_process";
import path from "path";
import { session } from "../config/constants.js";
import { poolLog } from "../db/connectionLog.js";

import menu from "./menu.js";

const crearBackup = async (connection) => {

    clear();

    if (session.role !== 'Administrador') {
        console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
        console.log(chalk.red.bold("\n> No tiene permisos para realizar respaldos."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó realizar un respaldo, no tiene los permisos correspondiente a su rol`, session.user]);
        
        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        await menu(connection);
    }

    await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Ingresó a la opcion de realizar un respaldo`, session.user]);

    console.log(chalk.bgBlue.bold('\n------------ REALIZAR RESPALDO COMPLETO -------------\n'));

    const { confirm } = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "¿Está seguro de que desea realizar el respaldo?",
            default: false,
        },
    ]);

    if (confirm) {
        console.log(chalk.green.bold("  > Realizando respaldo..."));
        const __dirname = path.resolve();
        const dir = path.join(__dirname, "../backups");
        
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const dateStr = `${day}-${month}-${year}`;

        const obtenerDosDigitos = (valor) => (valor < 10 ? `0${valor}` : valor);

        const hour = obtenerDosDigitos(date.getHours());
        const minutes = obtenerDosDigitos(date.getMinutes());
        const seconds = obtenerDosDigitos(date.getSeconds());
        const hourStr = `${hour}_${minutes}_${seconds}`;

        const fileName = `backup ${dateStr} ${hourStr}.sql`;

        exec(`mysqldump -u ${session.user} -p${session.password} bd2_practica2 > "${dir}/${fileName}"`, async (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                console.log(chalk.red.bold("  > ERROR: No se pudo realizar el respaldo."));
                await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó realizar un respaldo, ocurrio un error en la creacion`, session.user]);
                await inquirer.prompt([
                    {
                        type: "input",
                        name: "continue",
                        message: "Presione enter para continuar...",
                    },
                ]);
                await menu(connection);
            } else {
                console.log(chalk.green.bold(`  > Respaldo ${fileName} realizado con éxito.`));
                console.log(chalk.green.bold(`  > Ruta: ${dir}/${fileName}`));
                await connection.query(`INSERT INTO bd2_practica2.backups (nombre_archivo, ruta) VALUES (?, ?)`, [fileName, `${dir}/${fileName}`]);
                await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Realizó un respaldo completo con exito, ${fileName}`, session.user]);
                await inquirer.prompt([
                    {
                        type: "input",
                        name: "continue",
                        message: "Presione enter para continuar...",
                    },
                ]);
                await menu(connection);
            }
        });

    } else {
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó realizar un respaldo, no confirmó la acción`, session.user]);
        await menu(connection);
    }
};

export default crearBackup;