import express from 'express';
import { routes } from './interfaces/http/routes.js';
import { tenantMiddleware } from './interfaces/http/middlewares/tenant.middleware.js';
import { logger } from './infrastructure/logger/pino-logger.js';

const app = express();

app.use(express.json());

// Apply tenant middleware to all /api routes
app.use('/api', tenantMiddleware);

// Register routes
app.use('/api', routes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ 
    msg: 'Unhandled error', 
    error: err.message, 
    stack: err.stack 
  });
  
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
