import dotenv from 'dotenv';
dotenv.config();

export const config = {
    //Server
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000', 10),

    //Database
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'user',
        password: process.env.DB_PASSWORD || 'password',
        databaseName: process.env.DB_NAME || 'Cred ResolveDB',
    },

    //Application
    appName: process.env.APP_NAME || 'Cred Resolve App'
};