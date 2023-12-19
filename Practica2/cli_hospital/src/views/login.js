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

        const verificarUsuario = await poolLog.query('SELECT USER FROM mysql.user WHERE USER = ?', [username]);

        if(verificarUsuario[0].length === 0)
        {
            console.log(chalk.red.bold("  > ERROR: El usuario no existe."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [username, `Intentó iniciar sesión con un usuario que no existe`]);
            
            await inquirer.prompt([
                {
                    type: "input",
                    name: "continue",
                    message: "Presione enter para continuar...",
                },
            ]);

            await main();
        }

        connection = await getConnection(username, password);
        session.user = username;
        session.password = password;

        const permissions = await connection.query('SHOW GRANTS FOR current_user()');

        const UserPermissions = permissions[0];

        const rolUser = UserPermissions[UserPermissions.length - 1];

        const rolString = rolUser['Grants for ' + username + '@localhost'];

        const match = rolString.match(/GRANT `([^`]+)`@/);

        session.role = match ? match[1] : null;

        if (session.role === 'Asistente') {
            session.permissions = {
                "habitacion": ["SELECT"],
                "paciente": ["SELECT", "UPDATE"]
            };
        } else if (session.role === 'Doctor') {
            session.permissions = {
                "paciente": ["SELECT"]
            };
        } else if (session.role === 'Soporte') {
            session.permissions = {
                "log_actividad": ["SELECT", "INSERT", "UPDATE"],
                "log_habitacion": ["SELECT", "INSERT", "UPDATE"]
            }

        } 

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
                    message: "Presione enter para continuar...",
                },
            ]);

            await main();
        }
    } finally {

    }


};

export default login;