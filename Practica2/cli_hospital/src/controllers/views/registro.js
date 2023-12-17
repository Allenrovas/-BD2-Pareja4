import chalk from "chalk";
import inquirer from "inquirer";

const registro = async () => {

    clear();
    console.log(chalk.bgBlue.bold('----------------- Registrar usuario ----------------\n'));

    const { username, password, rolUser, admin, passAdmin } = await inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Ingrese nombre de usuario nuevo:",
        },
        {
            type: "password",
            name: "password",
            message: "Ingrese la contraseña del nuevo usuario:",
        },
        {
            type: "list",
            name: "rolUser",
            message: "Seleccione el rol del nuevo usuario:",
            choices: [
                {
                    name: `${chalk.blue.bold(">")} Asistente`,
                    value: 1,
                },
                {
                    name: `${chalk.blue.bold(">")} Doctor`,
                    value: 2,
                },
                {
                    name: `${chalk.blue.bold(">")} Soporte`,
                    value: 3,
                }
            ],
        },
        {
            type: "input",
            name: "admin",
            message: "Ingrese el nombre de usuario administrador:",
        },
        {
            type: "password",
            name: "passAdmin",
            message: "Ingrese la contraseña del administrador:",
        }
    ]);

    console.log(chalk.blue.bold(`Bienvenido ${username}`));
};

export default registro;