import express, {type Application, type Request, type Response, type NextFunction } from 'express';
import { config } from '../../config/environment.js';
import { setupRoutes } from './routes/index.js';
export class ExpressApp {
  private app:  Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // CORS (allow all origins for now)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });

    // Request logging
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`📨 ${req.method} ${req.path}`);
      next();
    });
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (req: Request, res:  Response) => {
      res.json({
        status: 'OK',
        message: 'Expense Sharing API is running',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
      });
    });

    setupRoutes(this.app);

    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
      });
    });
  }

    private setupErrorHandling(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('❌ Error:', err);

      // Handle different error types
      if (err.name === 'DomainException') {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      if (err.name === 'UserNotFoundException' || err.name === 'GroupNotFoundException') {
        return res. status(404).json({
          success: false,
          error:  err.message,
        });
      }

      // Default error
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: config.nodeEnv === 'development' ? err.message : undefined,
      });
    });
  }

  public getApp(): Application {
    return this.app;
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log('');
      console.log('╔════════════════════════════════════════════════════════╗');
      console.log('║     🚀 Expense Sharing API Server Started             ║');
      console.log('╚════════════════════════════════════════════════════════╝');
      console.log('');
      console.log(`🌐 Server running on:  http://localhost:${port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🏥 Health check: http://localhost:${port}/health`);
    });
  }
}