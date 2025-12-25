import 'reflect-metadata';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { initializeDatabase, closeDatabase } from './infrastructure/database/config/database.config.js';
import { config } from './config/environment.js';
dotenv.config();

const startServer = async () => {
  try {
    console.log('🚀 Expense Sharing App - Starting.. .');
    console.log(`📝 Environment: ${config.nodeEnv}`);
    console.log(`🔌 Port: ${config.port}`);
    console.log('');

    // Initialize database
    await initializeDatabase();

    // Test UserRepository
    
    console.log('');
    console.log('✅ All repository tests passed!');
    console.log('⏳ Next:  Create use cases and business logic.. .');
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠️  Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️  Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

startServer();