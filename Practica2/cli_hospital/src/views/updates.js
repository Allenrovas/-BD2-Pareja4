import chalk from "chalk";
import inquirer from "inquirer";
import {  session } from "../config/constants.js";
import clear from "clear";

import menuCrud from "./crud.js";
import { poolLog } from "../db/connectionLog.js";
import verificarPermisos from "./permisos.js";

const update = async (connection, tabla) => {
    
   const permisos = await verificarPermisos(tabla, 'UPDATE');

   if (!permisos) {
       console.log(chalk.bgRed.bold("\n---------------- ACCESO DENEGADO ----------------"));
       console.log(chalk.red.bold("\n> No tiene permisos para actualizar registros."));
       await poolLog.query(`INSERT INTO bd2_practica2.log_operaciones_bd (accion, usuario) VALUES (?, ?)`, [`Intentó actualizar un registro, no tiene los permisos correspondiente a su rol`, session.user]);

       await inquirer.prompt([
           {
               type: "input",
               name: "continue",
               message: "Presione enter para continuar...",
           },
       ]);
       await menuCrud(2, connection);
   }

   //Pedir el id del registro a actualizar


};