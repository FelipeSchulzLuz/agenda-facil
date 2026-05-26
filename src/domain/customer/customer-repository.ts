import { Customer } from './customer.js';
import { TenantId } from '../core/tenant-id.js';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  findById(id: string, tenantId: TenantId): Promise<Customer | null>;
}
