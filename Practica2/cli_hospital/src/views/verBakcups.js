import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import { exec } from "child_process";
import path from "path";
import { session } from "../config/constants.js";
import { poolLog } from "../db/connectionLog.js";

import menu from "./menu.js";

const verBackups = async (connection) => {

    clear();

    if (session.role !== 'Administrador') {
        console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
        console.log(chalk.red.bold("\n> No tiene permisos para ver los respaldos realizados."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó ver los respaldos realizados, no tiene los permisos correspondiente a su rol`, session.user]);
        
        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        await menu(connection);
    }

    await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Ingresó a la opcion de ver los respaldos realizados`, session.user]);

    console.log(chalk.bgBlue.bold('\n------------ RESPALDOS REALIZADOS -------------\n'));

    const __dirname = path.resolve();
    const dir = path.join(__dirname, "../backups");

    exec(`ls ${dir}`, async (err, stdout, stderr) => {
        if (err) {
            console.log(chalk.red.bold("\n> No se pudo obtener el listado de respaldos."));
            console.log(chalk.red.bold("> Error: " + err));
            console.log(chalk.red.bold("> " + stderr));
            console.log(chalk.red.bold("> " + stdout));
            console.log(chalk.red.bold("\n> Intente de nuevo."));
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);
            await menu(connection);
        } else {
            const backups = stdout.split("\n");
            backups.pop();
            backups.forEach((backup, index) => {
                console.log(chalk.blue.bold(`${index + 1}. ${backup}`));
            });

            console.log();

            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Salió de la opcion de ver los respaldos realizados`, session.user]);

            await menu(connection);

        }
    });
};

export default verBackups;