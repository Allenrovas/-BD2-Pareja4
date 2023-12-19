import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import { main } from "../index.js";
import { encriptarPassword } from "../config/constants.js";
import getConnection from "../db/dbConnection.js";
import { poolLog } from "../db/connectionLog.js";

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
                    value: 'Asistente',
                },
                {
                    name: `${chalk.blue.bold(">")} Doctor`,
                    value: 'Doctor',
                },
                {
                    name: `${chalk.blue.bold(">")} Soporte`,
                    value: 'Soporte',
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

    const confirmRegister = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "¿Está seguro de que desea registrar este usuario?",
            default: false,
        },
    ]);

    // si confirma, se registra el usuario
    if (confirmRegister.confirm) {
        console.log(chalk.green.bold("  > Registrando usuario..."));
        await registrar(username, password, rolUser, admin, passAdmin);
    } else {
        clear();
        await main();
    }

    const confirmRegisterAgain = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "¿Desea registrar otro usuario?",
            default: false,
        },
    ]);
    
    
    if (confirmRegisterAgain.confirm) {
        await registro();
    } else {
        await main();
    }
};

const registrar = async (username, password, rolUser, admin, passAdmin) => {

    let connection;

    try {

        const verificarUser = await poolLog.query('SELECT USER FROM mysql.user WHERE USER = ?', [username]);

        if(verificarUser[0].length > 0)
        {
            console.log(chalk.red.bold("  > ERROR: El usuario que intenta registrar ya existe."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `El usuario '${username}' que intentó registrar ya existe`]);
            return;
        }

        const verificarAdmin = await poolLog.query('SELECT USER FROM mysql.user WHERE USER = ?', [admin]);

        if(verificarAdmin[0].length === 0)
        {
            console.log(chalk.red.bold("  > ERROR: El usuario administrador ingresado no existe."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `El usuario administrador '${admin}' no existe, intentó registrar un usuario`]);
            return;
        }
        
        connection  = await getConnection(admin, passAdmin);

        // const query = await connection.query("SET ROLE Administrador");
        const query1 = await connection.query("CREATE USER ?@'localhost' IDENTIFIED BY ?", [username, password]);
        const query2 = await connection.query("GRANT ? TO ?@'localhost'", [rolUser, username]);
        const query3 = await connection.query("ALTER USER ?@'localhost' DEFAULT ROLE ?", [username, rolUser]);
        const query4 = await connection.query("FLUSH PRIVILEGES");

        const query5 = await connection.query("INSERT INTO bd2_practica2.usuarios (usuario, rol, contrasena) VALUES (?, ?, ?)", [username, rolUser, encriptarPassword(password)]);

        if(query5[0].affectedRows > 0){
            console.log(chalk.green.bold("  > Usuario registrado correctamente."));
            await connection.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Registró al usuario ${username} con el rol ${rolUser}`]);
        } else {
            console.log(chalk.red.bold("  > Error al registrar usuario."));
        }

    } catch (e) {
        if(e.code === 'ER_CANNOT_USER_REFERENCED_AS_DEFINER')
        {
            console.log(chalk.red.bold("  > ERROR: El usuario que intenta registrar ya existe."));
            await connection.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `El usuario '${username}' que intentó registrar ya existe`]);
        } 
        else if(e.code === 'ER_CANNOT_USER')
        {
            console.log(chalk.red.bold("  > ERROR: El usuario que intenta registrar ya existe."));
            await connection.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `El usuario '${username}' que intentó registrar ya existe`]);
        } 
        else if(e.code === 'ER_ACCESS_DENIED_ERROR')
        {
            console.log(chalk.red.bold("  > ERROR: Credenciales del usuario administrador incorrectas."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Intentó registrar un usuario, credenciales de administrador incorrectas`]);
        }
        else if(e.code === 'ER_DBACCESS_DENIED_ERROR')
        {
            console.log(chalk.red.bold("  > ERROR: Credenciales del usuario administrador incorrectas."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Intentó registrar un usuario, credenciales de administrador incorrectas`]);
        }
        else if(e.code === 'ER_SPECIFIC_ACCESS_DENIED_ERROR')
        {
            console.log(chalk.red.bold("  > ERROR: Este usuario no tiene permisos de administrador."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Intentó registrar un usuario, este usuario no tiene permisos de administrador`]);
        }
        else if(e.code === 'ER_TABLEACCESS_DENIED_ERROR')
        {
            console.log(chalk.red.bold("  > ERROR: Este usuario no tiene permisos de administrador."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Intentó registrar un usuario, este usuario no tiene permisos de administrador`]);
        }
        else
        {
            console.log(chalk.red.bold("  > ERROR: No se pudo registrar el usuario, error interno."));
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Intentó registrar un usuario, no se pudo registrar el usuario, error interno`]);
        }
        // console.log(e.code);
    } finally {
        if(connection)
        {
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [admin, `Cerró la conexión a la base de datos`]);
            await connection.end();
        }
    }
};

export default registro;