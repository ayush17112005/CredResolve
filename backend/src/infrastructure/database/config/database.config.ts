import { DataSource } from "typeorm";
import { config } from "../../../config/environment.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.databaseName,
    synchronize: config.nodeEnv === 'development',
    logging: false,
    entities: ['src/infrastructure/database/models/**/*.ts'],
    migrations: ['src/infrastructure/database/migrations/**/*.ts'],
    subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established successfully');
    console.log(`📊 Database:  ${config.database}`);
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    throw error;
  }
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};