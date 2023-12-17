import chalk from "chalk";
import inquirer from "inquirer";
import menu from "./menu.js";
import clear from "clear";

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

    clear();
    console.log(chalk.blue.bold(`Bienvenido ${username}`));
    await menu();

};

export default login;