import mongoose from 'mongoose';
import { dbMConfig } from '../config/credentials.js';

export const connect = () => {

    let url = `mongodb://${dbMConfig.host}:${dbMConfig.port}/${dbMConfig.database}`;

    if (dbMConfig.user && dbMConfig.password) {
        // mongodb://root:root@localhost:27017/?authMechanism=DEFAULT
        url = `mongodb://${dbMConfig.user}:${dbMConfig.password}@${dbMConfig.host}:${dbMConfig.port}/${dbMConfig.database}?authSource=admin`;
    }

    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
        console.log(error);
    }
};