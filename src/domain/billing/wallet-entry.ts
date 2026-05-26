import { TenantId } from '../core/tenant-id.js';

export enum EntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export class WalletEntry {
  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly customerId: string,
    public readonly amountInCents: number,
    public readonly type: EntryType,
    public readonly description: string,
    public readonly relatedChargeId?: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
