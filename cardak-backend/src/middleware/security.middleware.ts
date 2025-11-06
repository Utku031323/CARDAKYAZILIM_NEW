import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import logger from '../config/logger';

/**
 * Request ID middleware
 * Adds a unique request ID to each request for tracking
 */
export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId = req.headers['x-request-id'] as string || crypto.randomUUID();
  (req as any).requestId = requestId;

  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);

  // Add request ID to logger context
  logger.info(`[${requestId}] ${req.method} ${req.path}`, {
    requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  next();
};

/**
 * Security headers middleware
 * Adds security headers to all responses
 */
export const securityHeadersMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'"
  );

  next();
};

/**
 * Sensitive data masking for logs
 */
export const maskSensitiveData = (data: any): any => {
  if (!data) return data;

  const sensitiveFields = [
    'password',
    'token',
    'accessToken',
    'refreshToken',
    'apiKey',
    'key',
    'secret',
    'creditCard',
    'ssn',
    'phone',
  ];

  const masked = JSON.parse(JSON.stringify(data));

  const maskObject = (obj: any) => {
    for (const key in obj) {
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field.toLowerCase()))) {
        obj[key] = '***MASKED***';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        maskObject(obj[key]);
      }
    }
  };

  maskObject(masked);
  return masked;
};

/**
 * Request logging middleware with sensitive data masking
 */
export const requestLoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId = (req as any).requestId;

  // Log request details
  logger.info(`[${requestId}] Request received`, {
    requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    body: maskSensitiveData(req.body),
  });

  // Capture response
  const originalSend = res.send;
  res.send = function (data: any) {
    logger.info(`[${requestId}] Response sent`, {
      requestId,
      statusCode: res.statusCode,
      method: req.method,
      path: req.path,
    });

    return originalSend.call(this, data);
  };

  next();
};

export default {
  requestIdMiddleware,
  securityHeadersMiddleware,
  maskSensitiveData,
  requestLoggingMiddleware,
};

