import { AuditService } from '@domain/core/audit/audit-service.js';
import { prisma } from './client.js';

export class PrismaAuditService implements AuditService {
  async log(entry: any): Promise<void> {
    await prisma.auditLog.create({
      data: {
        tenantId: entry.tenantId.toString(),
        userId: entry.userId,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        payload: entry.payload || {},
        correlationId: entry.correlationId || null,
      },
    });
  }
}

export const prismaAuditService = new PrismaAuditService();
