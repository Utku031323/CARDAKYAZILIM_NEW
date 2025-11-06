import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

// Import Sentry for error tracking
import Sentry from './config/sentry';

// Import logger and middleware
import logger from './config/logger';
import auditMiddleware from './middleware/audit.middleware';
import {
  requestIdMiddleware,
  securityHeadersMiddleware,
  requestLoggingMiddleware,
} from './middleware/security.middleware';
import {
  generalLimiter,
  authLimiter,
} from './middleware/rate-limit.middleware';

// Import routes
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import quoteRoutes from './routes/quotes';
import onboardingRoutes from './routes/onboarding';
import pricingRoutes from './routes/pricing';
import settingsRoutes from './routes/settings';
import analyticsRoutes from './routes/analytics';
import auditLogsRoutes from './routes/audit-logs';

// Initialize Express app
const app: Express = express();

// ⚠️ KRITIK: Sentry Request Handler MUTLAKA en başta olmalı
// Bu middleware, tüm istekleri takip etmeye başlar
if (process.env.SENTRY_DSN) {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    Sentry.captureMessage(`${req.method} ${req.path}`, 'info');
    next();
  });
}

// Security middleware
app.use(helmet());
app.use(securityHeadersMiddleware);
app.use(requestIdMiddleware);

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General rate limiting
app.use(generalLimiter);

// Request logging middleware
app.use(requestLoggingMiddleware);

// Audit middleware for logging operations
app.use(auditMiddleware);

// API Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/quotes', quoteRoutes);
app.use('/api/v1/onboarding', onboardingRoutes);
app.use('/api/v1/pricing', pricingRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/audit-logs', auditLogsRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

// ⚠️ KRITIK: Sentry Error Handler MUTLAKA global error handler'dan ÖNCE olmalı
// Bu middleware, tüm hataları Sentry'ye gönderir
if (process.env.SENTRY_DSN) {
  app.use((err: any, _req: Request, _res: Response, next: NextFunction) => {
    Sentry.captureException(err);
    next(err);
  });
}

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error:', { error: err.message, stack: err.stack });

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: message,
      details: err.details || []
    }
  });
});

export default app;

