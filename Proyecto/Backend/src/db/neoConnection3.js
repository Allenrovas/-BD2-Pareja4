import neo4j from 'neo4j-driver';
import { dbNConfig, dbMConfig } from '../config/credentials.js';

const url = `bolt://${dbNConfig.host}:${dbNConfig.port}`;

const driver = neo4j.driver(url, neo4j.auth.basic(dbNConfig.user, dbNConfig.password));

const session = driver.session({ database: dbNConfig.database });

export default session;