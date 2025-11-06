import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import logger from '../config/logger';

// Helper function to get client IP safely
const getClientIp = (req: any): string => {
  return req.ip || req.connection.remoteAddress || 'unknown';
};

/**
 * General API rate limiter
 * 100 requests per 15 minutes
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request) => {
    // Skip rate limiting for health check
    return req.path === '/health';
  },
  keyGenerator: (req: Request) => {
    return getClientIp(req);
  },
  handler: (req: Request, res: Response) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
      },
    });
  },
} as any);

/**
 * Authentication rate limiter
 * 5 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Use email as key if available, otherwise use IP
    return (req.body?.email || getClientIp(req)) as string;
  },
  handler: (req: Request, res: Response) => {
    logger.warn('Auth rate limit exceeded', {
      ip: req.ip,
      email: req.body?.email,
    });
    res.status(429).json({
      success: false,
      error: {
        code: 'AUTH_RATE_LIMIT_EXCEEDED',
        message: 'Too many login attempts. Please try again later.',
      },
    });
  },
} as any);

export default {
  generalLimiter,
  authLimiter,
};

