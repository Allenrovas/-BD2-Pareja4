import chalk from "chalk";
import inquirer from "inquirer";

const login = async () => {
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

    console.log(chalk.blue.bold(`Bienvenido ${username}`));
};

export default login;