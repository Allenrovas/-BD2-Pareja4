import chalk from "chalk";
import inquirer from "inquirer";
import login from "./controllers/views/login.js";
import registro from "./controllers/views/registro.js";
import clear from "clear";

clear();
console.log(chalk.bgBlue.bold('------------------- CLI HOSPITAL -------------------'));
console.log(chalk.bgBlueBright.bold('-------------------- Bienvenido --------------------\n'));

const main = async () => {
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
                    name: `${chalk.blue.bold(">")} Salir`,
                    value: 3,
                }
            ],
        },
    ]);

    switch (option) {
        case 1:
            clear();
            console.log(chalk.bgBlue.bold('\n------------------ Iniciar Sesión ------------------\n'));
            await login();
            break;
        case 2:
            clear();
            console.log(chalk.bgBlue.bold('----------------- Registrar usuario ----------------\n'));
            await registro();
            break;
        case 3:
            console.log("Salir");
            break;
    }
};

main();