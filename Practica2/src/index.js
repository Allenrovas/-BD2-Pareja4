import chalk from "chalk";
import inquirer from "inquirer";
import login from "./controllers/views/login.js";
import registro from "./controllers/views/registro.js";
import { mainTitle } from "./config/constants.js";
import clear from "clear";


export const main = async () => {

    clear();
    console.log(chalk.blue.bold(mainTitle));
    console.log(chalk.bgBlue.bold('--------------------- Bienvenido ----------------------\n'));

    const { option } = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "¿Qué desea hacer?",
            choices: [
                {
                    name: `${chalk.blue.bold(">")} Iniciar sesión`,
                    value: 1,
                },
                {
                    name: `${chalk.blue.bold(">")} Registrar un usuario`,
                    value: 2,
                },
                {
                    name: `${chalk.blue.bold("<")} Salir`,
                    value: 3,
                }
            ],
        },
    ]);

    switch (option) {
        case 1:
            await login();
            break;
        case 2:
            await registro();
            break;
        case 3:
            console.log(chalk.red.bold("Saliendo..."));
            break;
    }
};

main();