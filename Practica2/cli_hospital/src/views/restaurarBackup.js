import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import { exec } from "child_process";
import path from "path";
import { session } from "../config/constants.js";
import { poolLog } from "../db/connectionLog.js";

import menu from "./menu.js";

const restaurarBackup = async (connection) => {

    clear();

    if (session.role !== 'Administrador') {
        console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
        console.log(chalk.red.bold("\n> No tiene permisos para restaurar respaldos."));
        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó restaurar un respaldo, no tiene los permisos correspondiente a su rol`, session.user]);
        
        await inquirer.prompt([
            {
                type: "input",
                name: "continue",
                message: "Presione enter para continuar...",
            },
        ]);
        return await menu(connection);
    }

    await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Ingresó a la opcion de restaurar respaldos`, session.user]);

    console.log(chalk.bgBlue.bold('\n------------- RESTAURAR RESPALDO --------------\n'));

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
            return await menu(connection);
        } else {
            const backups = stdout.split("\n");
            backups.pop();
            // backups.forEach((backup, index) => {
            //     console.log(chalk.blue.bold(`${backup}`));
            // });

            const { backup } = await inquirer.prompt([
                {
                    type: "list",
                    name: "backup",
                    message: "Seleccione el respaldo a restaurar:",
                    choices: backups,
                    pageSize: backups.length,
                },
            ]);

            // esta seguro de restaurar el respaldo x
            const { confirm } = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: `¿Está seguro de restaurar el respaldo ${backup}?`,
                    default: false,
                },
            ]);

            if (confirm) {

                // limpiando la base de datos
                console.log(chalk.green.bold('\n > Limpiando la base de datos...'));

                const delete0 = await connection.query(`SET SQL_SAFE_UPDATES = 0`);
                const delete1 = await connection.query(`DELETE FROM bd2_practica2.log_actividad`);
                const delete2 = await connection.query(`DELETE FROM bd2_practica2.log_habitacion`);
                const delete3 = await connection.query(`DELETE FROM bd2_practica2.habitacion`);
                const delete4 = await connection.query(`DELETE FROM bd2_practica2.paciente`);
                const delete5 = await connection.query(`DELETE FROM bd2_practica2.usuarios`);
                const delete6 = await connection.query(`DELETE FROM bd2_practica2.log_operaciones_bd`);
                const delete7 = await connection.query(`DELETE FROM bd2_practica2.backups`);
                const delete8 = await connection.query(`SET SQL_SAFE_UPDATES = 1`);

                // restaurando el respaldo
                console.log(chalk.green.bold(' > Restaurando el respaldo...'));

                const archivo = `"${dir}/${backup}"`;

                exec(`mysql -u ${session.user} -p${session.password} bd2_practica2 < ${archivo}`, async (err, stdout, stderr) => {
                    if (err) {
                        console.log(chalk.red.bold("\n> No se pudo restaurar el respaldo."));
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
                        return await menu(connection);
                    } else {
                        console.log(chalk.green.bold(" > Respaldo restaurado con éxito.\n"));
                        await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Restauró el respaldo ${backup}`, session.user]);

                        await inquirer.prompt([
                            {
                                type: "input",
                                name: "continue",
                                message: "Presione enter para continuar...",
                            },
                        ]);
        
                        clear();
                        return await menu(connection);
                    }
                });

            } else {
                clear();
                return await menu(connection);
            }
        }
    });
};

export default restaurarBackup;