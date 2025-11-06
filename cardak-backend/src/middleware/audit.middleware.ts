import { Request, Response, NextFunction } from 'express';
import * as auditLogService from '../services/audit-log.service';

/**
 * Extract IP address from request
 */
const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
};

/**
 * Audit middleware to log all operations
 * Captures request details and logs them asynchronously
 */
export const auditMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  // Store original request body for later use
  const originalBody = req.body;
  const originalMethod = req.method;
  const originalPath = req.path;

  // Intercept response to capture status code
  const originalSend = _res.send;
  _res.send = function (data: any) {
    // Log the operation asynchronously (don't wait for it)
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(originalMethod)) {
      const userId = (req as any).user?.userId;
      const ipAddress = getClientIp(req);
      const userAgent = req.headers['user-agent'] || 'unknown';

      // Determine action and resource type from path
      const pathParts = originalPath.split('/').filter((p) => p);
      const resourceType = pathParts[2] || 'unknown'; // e.g., 'quotes', 'onboarding'
      const resourceId = pathParts[3] || undefined;

      let action = 'UNKNOWN';
      if (originalMethod === 'POST') {
        action = 'CREATE';
      } else if (originalMethod === 'PUT' || originalMethod === 'PATCH') {
        action = 'UPDATE';
      } else if (originalMethod === 'DELETE') {
        action = 'DELETE';
      }

      // Log asynchronously
      auditLogService.createAuditLog({
        userId,
        action,
        resourceType,
        resourceId,
        changes: originalBody,
        ipAddress,
        userAgent,
      }).catch((error) => {
        console.error('Failed to create audit log:', error);
      });
    }

    // Call original send
    return originalSend.call(this, data);
  };

  next();
};

export default auditMiddleware;

