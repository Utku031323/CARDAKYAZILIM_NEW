import { Request, Response } from 'express';
import * as auditLogService from '../services/audit-log.service';

/**
 * Parse date from query parameter
 */
const parseDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
};

/**
 * Get audit logs with filtering and pagination
 * GET /api/v1/audit-logs
 */
export const getAuditLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, action, resourceType, startDate, endDate, skip, take } = req.query;

    const filter = {
      userId: userId as string | undefined,
      action: action as string | undefined,
      resourceType: resourceType as string | undefined,
      startDate: parseDate(startDate as string),
      endDate: parseDate(endDate as string),
      skip: skip ? parseInt(skip as string) : 0,
      take: take ? parseInt(take as string) : 50,
    };

    const result = await auditLogService.getAuditLogs(filter);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get audit logs',
      },
    });
  }
};

/**
 * Get a specific audit log by ID
 * GET /api/v1/audit-logs/:id
 */
export const getAuditLogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const auditLog = await auditLogService.getAuditLogById(id);

    if (!auditLog) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Audit log not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: auditLog,
    });
  } catch (error) {
    console.error('Get audit log by ID error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get audit log',
      },
    });
  }
};

/**
 * Get audit logs for a specific resource
 * GET /api/v1/audit-logs/resource/:resourceType/:resourceId
 */
export const getAuditLogsForResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resourceType, resourceId } = req.params;

    const logs = await auditLogService.getAuditLogsForResource(resourceType, resourceId);

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error('Get audit logs for resource error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get audit logs for resource',
      },
    });
  }
};

/**
 * Get audit logs for a specific user
 * GET /api/v1/audit-logs/user/:userId
 */
export const getAuditLogsForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const logs = await auditLogService.getAuditLogsForUser(userId);

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error('Get audit logs for user error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get audit logs for user',
      },
    });
  }
};

export default {
  getAuditLogs,
  getAuditLogById,
  getAuditLogsForResource,
  getAuditLogsForUser,
};

