const { Sequelize, DataTypes } = require('sequelize');
import { Client } from 'pg';

module.exports.databaseInit = async (callback: Function) => {
    const database = process.env.DATABASE || 'postgres';
    const user = process.env.DATABASE_USER || 'postgres';
    const password = process.env.DATABASE_PASSWORD || 'root';
    const host = process.env.DATABASE_HOST || 'localhost';
    const port = Number(process.env.DATABASE_PORT) || 5432;

    // Connect to default postgres database
    const pgClient = new Client({
        database: 'postgres',
        user,
        password,
        host,
        port
    });

    await pgClient.connect();
    
    // Create database, ignore error if db already exists
    pgClient.query(`CREATE DATABASE ${database}`, (err: any) => {
        const sequelize = new Sequelize(
            database,
            user,
            password,
            {
                host,
                dialect: 'postgres',
                logging: false,
            },
        );

        const models = {
            Authentication: require('./AuthenticationModel')(sequelize, DataTypes),
        }
        
        callback(sequelize, models);
        pgClient.end();
    });
}