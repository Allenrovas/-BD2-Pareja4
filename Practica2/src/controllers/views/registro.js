import chalk from "chalk";
import inquirer from "inquirer";

const registro = async () => {
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
                    name: `${chalk.blue.bold(">")} Administrador`,
                    value: 1,
                },
                {
                    name: `${chalk.blue.bold(">")} Médico`,
                    value: 2,
                },
                {
                    name: `${chalk.blue.bold(">")} Enfermero`,
                    value: 3,
                },
                {
                    name: `${chalk.blue.bold(">")} Recepcionista`,
                    value: 4,
                },
            ],
        },
        {
            type: "input",
            name: "admin",
            message: "Ingrese el nombre de usuario de administrador:",
        },
        {
            type: "password",
            name: "passAdmin",
            message: "Ingrese la contraseña de administrador:",
        }
    ]);

    console.log(chalk.blue.bold(`Bienvenido ${username}`));
};

export default registro;