import chalk from "chalk";
import inquirer from "inquirer";
import { menuTitle } from "../config/constants.js";
import clear from "clear";

import { main } from "../index.js";
import menuCrud from "./crud.js";

const menu = async () => {

    clear();
    console.log(chalk.blue.bold(menuTitle));
    console.log(chalk.bgBlue.bold('--------------- Bienvenido: Daniel ----------------\n'));

    const { option } = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "¿Qué desea hacer?",
            pageSize: 8,
            choices: [
                {
                    name: `${chalk.blue.bold(">")} Consultas`,
                    value: 1,
                },
                {
                    name: `${chalk.blue.bold(">")} Actualizar registros`,
                    value: 2,
                },
                {
                    name: `${chalk.blue.bold(">")} Agregar registros`,
                    value: 3,
                },
                {
                    name: `${chalk.blue.bold(">")} Eliminar registros`,
                    value: 4,
                },
                {
                    name: `${chalk.blue.bold(">")} Realizar respaldo completo`,
                    value: 5,
                },
                {
                    name: `${chalk.blue.bold(">")} Ver respaldos realizados`,
                    value: 6,
                },
                {
                    name: `${chalk.blue.bold(">")} Restaurar respaldo`,
                    value: 7,
                },
                {
                    name: `${chalk.blue.bold("<")} Cerrar sesión`,
                    value: 8,
                }
            ],
        },
    ]);

    switch (option) {
        case 1:
            await menuCrud(option);
            break;
        case 2:
            await menuCrud(option);
            break;
        case 3:
            await menuCrud(option);
            break;
        case 4:
            await menuCrud(option);
            break;
        case 5:
            await menuCrud(option);
            break;
        case 6:
            await menuCrud(option);
            break;
        case 7:
            await menuCrud(option);
            break;
        case 8:
            clear();
            console.log(chalk.bgBlue.bold('\n---------------- Cerrar sesión ------------------\n'));
            const confirmLogout = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "¿Está seguro de que desea cerrar sesión?",
                    default: false,
                },
            ]);

            if (confirmLogout.confirm) {
                clear();
                console.log(chalk.bgBlue.bold('\n----------------- Cerrar sesión -----------------\n'));
                clear();
                await main();
            } else {
                clear();
                await menu();
            }
            break;
    }
};

export default menu;