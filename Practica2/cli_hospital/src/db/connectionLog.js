import { createPool } from 'mysql2/promise';
import { dbConfig } from '../config/credentials.js';

export const poolLog = createPool({
    host: dbConfig.host,
    user: 'botLog',
    password: 'botLog',
    port: dbConfig.port,
});