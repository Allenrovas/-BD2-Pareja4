import chalk from "chalk";
import inquirer from "inquirer";
import menu from "./menu.js";
import clear from "clear";

import { session } from "../config/constants.js";
import getConnection from "../db/dbConnection.js";
import { poolLog } from "../db/connectionLog.js";
import { main } from "../index.js";

const login = async () => {

    clear();
    console.log(chalk.bgBlue.bold('\n------------------ Iniciar Sesión ------------------\n'));

    const { username, password } = await inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Ingrese su usuario:",
        },
        {
            type: "password",
            name: "password",
            message: "Ingrese su contraseña:",
        },
    ]);

    auth(username, password);
};

const auth = async(username, password) => {
    
    let connection;

    try{

        connection = await getConnection(username, password);
        session.user = username;
        session.password = password;

        await menu(connection);

    } catch (e) {
        if(e.code === 'ER_ACCESS_DENIED_ERROR')
        {
            console.log(chalk.red.bold("  > ERROR: Credenciales del usuario incorrectas."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [username, `Intentó iniciar sesión con credenciales de incorrectas`]);

            // press any key to continue
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione cualquier tecla para continuar...",
                },
            ]);

            await main();
        }
    } finally {

    }


};

export default login;