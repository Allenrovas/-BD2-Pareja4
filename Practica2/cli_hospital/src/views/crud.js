import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";

import menu from "./menu.js";
import consulta from "./consultas.js";

const menuCrud = async (optionCRUD,connection) => {

    clear();
    switch (optionCRUD) {
        case 1:
            console.log(chalk.bgBlue.bold('\n------------------- CONSULTAS -------------------\n'));
            break;
        case 2:
            console.log(chalk.bgBlue.bold('\n------------- ACTUALIZAR REGISTROS --------------\n'));
            break;
        case 3:
            console.log(chalk.bgBlue.bold('\n--------------- AGREGAR REGISTROS ---------------\n'));
            break;
        case 4:
            console.log(chalk.bgBlue.bold('\n-------------- ELIMINAR REGISTROS ---------------\n'));
            break;
        case 5:
            console.log(chalk.bgBlue.bold('\n---------- REALIZAR RESPALDO COMPLETO -----------\n'));
            break;
        case 6:
            console.log(chalk.bgBlue.bold('\n----------- VER RESPALDOS REALIZADOS ------------\n'));
            break;
        case 7:
            console.log(chalk.bgBlue.bold('\n-------------- RESTAURAR RESPALDO ---------------\n'));
            break;
    }

    const { option } = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "¿Seleccione una opcion?",
            pageSize: 8,
            choices: [
                {
                    name: `${chalk.blue.bold(">")} Pacientes`,
                    value: 1,
                },
                {
                    name: `${chalk.blue.bold(">")} Habitaciones`,
                    value: 2,
                },
                {
                    name: `${chalk.blue.bold(">")} Log actividad`,
                    value: 3,
                },
                {
                    name: `${chalk.blue.bold(">")} Log habitacion`,
                    value: 4,
                },
                {
                    name: `${chalk.blue.bold("<")} Regresar al menú principal`,
                    value: 5
                }
            ],
        },
    ]);

    switch (option) {
        case 1:
            clear();
            console.log(chalk.bgBlue.bold('\n------------------- PACIENTES -------------------\n'));
            await consulta(connection, "paciente");
            break;
        case 2:
            clear();
            console.log(chalk.bgBlue.bold('\n----------------- HABITACIONES ------------------\n'));
            await consulta(connection, "habitacion");
            break;
        case 3:
            clear();
            console.log(chalk.bgBlue.bold('\n----------------- LOG ACTIVIDAD -----------------\n'));
            await consulta(connection, "log_actividad");
            break;
        case 4:
            clear();
            console.log(chalk.bgBlue.bold('\n---------------- LOG HABITACION -----------------\n'));
            await consulta(connection, "log_habitacion");
            break;
        case 5:
            menu();
            break;
    }
};



export default menuCrud;