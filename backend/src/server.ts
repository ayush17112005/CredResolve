import 'reflect-metadata';
import dotenv from 'dotenv';
import { initializeDatabase, closeDatabase } from './infrastructure/database/config/database.config.js';
import { config } from './config/environment.js';
import { ExpressApp } from './interface/http/app.js';

dotenv.config();

const startServer = async () => {
  try {
    console.log('🚀 Expense Sharing App - Starting.. .');
    console.log(`📝 Environment: ${config.nodeEnv}`);
    console.log('');

    // Initialize database
    await initializeDatabase();

    // Create and start Express app
    const expressApp = new ExpressApp();
    expressApp.listen(config.port);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  console.log('\n⚠️  Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();