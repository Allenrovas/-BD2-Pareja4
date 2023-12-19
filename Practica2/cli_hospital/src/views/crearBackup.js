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
        const dir = path.join(__dirname, "../Backups");
        console.log(dir);
    }
};

export default crearBackup;