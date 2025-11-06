import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuditLogEntry {
  userId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogFilter {
  userId?: string;
  action?: string;
  resourceType?: string;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  take?: number;
}

/**
 * Create an audit log entry
 */
export const createAuditLog = async (entry: AuditLogEntry): Promise<any> => {
  try {
    const auditLog = await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId,
        changes: entry.changes,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
      },
    });

    return auditLog;
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw - audit logging should not break the main operation
    return null;
  }
};

/**
 * Get audit logs with filtering and pagination
 */
export const getAuditLogs = async (filter: AuditLogFilter): Promise<any> => {
  const where: any = {};

  if (filter.userId) {
    where.userId = filter.userId;
  }

  if (filter.action) {
    where.action = filter.action;
  }

  if (filter.resourceType) {
    where.resourceType = filter.resourceType;
  }

  if (filter.startDate || filter.endDate) {
    where.createdAt = {};
    if (filter.startDate) {
      where.createdAt.gte = filter.startDate;
    }
    if (filter.endDate) {
      where.createdAt.lte = filter.endDate;
    }
  }

  const skip = filter.skip || 0;
  const take = filter.take || 50;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    data: logs,
    pagination: {
      skip,
      take,
      total,
      pages: Math.ceil(total / take),
    },
  };
};

/**
 * Get a specific audit log by ID
 */
export const getAuditLogById = async (id: string): Promise<any> => {
  return prisma.auditLog.findUnique({
    where: { id },
  });
};

/**
 * Get audit logs for a specific resource
 */
export const getAuditLogsForResource = async (
  resourceType: string,
  resourceId: string
): Promise<any> => {
  return prisma.auditLog.findMany({
    where: {
      resourceType,
      resourceId,
    },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get audit logs for a specific user
 */
export const getAuditLogsForUser = async (userId: string): Promise<any> => {
  return prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
};

/**
 * Delete old audit logs (older than specified days)
 */
export const deleteOldAuditLogs = async (daysOld: number = 90): Promise<number> => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const result = await prisma.auditLog.deleteMany({
    where: {
      createdAt: {
        lt: cutoffDate,
      },
    },
  });

  return result.count;
};

export default {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
  getAuditLogsForResource,
  getAuditLogsForUser,
  deleteOldAuditLogs,
};

