import { TenantId } from '../tenant-id.js';

export interface AuditEntry {
  tenantId: TenantId;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  payload: any;
  timestamp: Date;
  correlationId: string;
}

export interface AuditService {
  log(entry: Omit<AuditEntry, 'timestamp' | 'correlationId'>): Promise<void>;
}
