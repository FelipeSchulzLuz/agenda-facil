import { Charge } from './charge.js';
import { TenantId } from '../core/tenant-id.js';

export interface ChargeRepository {
  save(charge: Charge): Promise<void>;
}
