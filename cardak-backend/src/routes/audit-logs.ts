import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import * as auditLogController from '../controllers/audit-log.controller';

const router = Router();

/**
 * All audit log routes require authentication and ADMIN or MANAGER role
 */
router.use(authMiddleware);
router.use(authorize('ADMIN', 'MANAGER'));

/**
 * GET /api/v1/audit-logs
 * Get audit logs with optional filtering and pagination
 * Query parameters:
 *   - userId: Filter by user ID
 *   - action: Filter by action (CREATE, UPDATE, DELETE)
 *   - resourceType: Filter by resource type (quotes, onboarding, etc.)
 *   - startDate: ISO date string (e.g., 2025-01-01)
 *   - endDate: ISO date string (e.g., 2025-12-31)
 *   - skip: Number of records to skip (default: 0)
 *   - take: Number of records to take (default: 50)
 * Accessible by: ADMIN only
 */
router.get('/', auditLogController.getAuditLogs);

/**
 * GET /api/v1/audit-logs/:id
 * Get a specific audit log by ID
 * Accessible by: ADMIN only
 */
router.get('/:id', auditLogController.getAuditLogById);

/**
 * GET /api/v1/audit-logs/resource/:resourceType/:resourceId
 * Get audit logs for a specific resource
 * Accessible by: ADMIN only
 */
router.get('/resource/:resourceType/:resourceId', auditLogController.getAuditLogsForResource);

/**
 * GET /api/v1/audit-logs/user/:userId
 * Get audit logs for a specific user
 * Accessible by: ADMIN only
 */
router.get('/user/:userId', auditLogController.getAuditLogsForUser);

export default router;

