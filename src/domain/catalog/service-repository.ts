import { Service } from './service.js';
import { TenantId } from '../core/tenant-id.js';

export interface ServiceRepository {
  findById(id: string, tenantId: TenantId): Promise<Service | null>;
}
