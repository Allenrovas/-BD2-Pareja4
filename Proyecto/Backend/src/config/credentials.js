import dotenv from 'dotenv';

dotenv.config();

export const dbMConfig = {
    host: process.env.DBM_HOST,
    user: process.env.DBM_USER,
    password: process.env.DBM_PASSWORD,
    database: process.env.DATABASEM,
    port: process.env.DBM_PORT
};

export const dbNConfig = {
    host: process.env.BDN_HOST,
    user: process.env.BDN_USER,
    password: process.env.BDN_PASSWORD,
    database: process.env.BDN_DATABASE,
    port: process.env.BDN_PORT
};

export const API_PORT = process.env.API_PORT || 4000;