import { type Application } from 'express';
import userRoutes from './userRoutes.js';
import groupRoutes from './groupRoutes.js'
import balanceRoutes from './balanceRoutes.js';

export const setupRoutes = (app: Application): void => {
  app.use('/api/users', userRoutes);
  app.use('/api/groups', groupRoutes);
  app.use('/api/balances', balanceRoutes);
};