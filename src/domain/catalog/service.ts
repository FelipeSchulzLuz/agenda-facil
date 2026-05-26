import { TenantId } from '../core/tenant-id.js';

export class Service {
  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly name: string,
    public readonly durationInMinutes: number,
    public readonly priceInCents: number,
    public readonly bufferInMinutes: number = 0,
    public readonly isActive: boolean = true,
  ) {
    if (durationInMinutes <= 0) {
      throw new Error('Service duration must be positive');
    }
  }
}
