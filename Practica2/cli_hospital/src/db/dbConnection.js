import { createPool } from 'mysql2/promise';
import { dbConfig } from '../config/credentials.js';
import { poolLog } from './connectionLog.js';

const DBConnection = async(user, password) => {
    
    try{
        const pool = createPool({
            host: dbConfig.host,
            user: user,
            password: password,
            port: dbConfig.port,
        });
    
        const res = await pool.query('SELECT 1');

        if(res[0].length > 0){
            await poolLog.query('INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (?, ?)', [user, 'Inició una conexión a la base de datos']);
            return pool;
        } else {
            console.log('Conexión fallida');
            throw new Error('Conexión fallida');
        }

    } catch(e){
        throw e;
    }
    

};

export default DBConnection;