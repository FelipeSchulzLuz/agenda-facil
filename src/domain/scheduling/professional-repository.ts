import { Professional } from './professional.js';
import { TenantId } from '../core/tenant-id.js';

export interface ProfessionalRepository {
  findById(id: string, tenantId: TenantId): Promise<Professional | null>;
}
