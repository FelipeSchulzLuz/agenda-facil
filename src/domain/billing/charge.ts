import { TenantId } from '../core/tenant-id.js';

export enum ChargeStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export class Charge {
  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly customerId: string,
    public readonly appointmentId: string,
    public readonly amountInCents: number,
    private _status: ChargeStatus = ChargeStatus.PENDING,
    public readonly createdAt: Date = new Date(),
  ) {}

  get status(): ChargeStatus {
    return this._status;
  }

  markAsPaid(): void {
    if (this._status !== ChargeStatus.PENDING) {
      throw new Error('Only pending charges can be marked as paid');
    }
    this._status = ChargeStatus.PAID;
  }

  refund(): void {
    if (this._status !== ChargeStatus.PAID) {
      throw new Error('Only paid charges can be refunded');
    }
    this._status = ChargeStatus.REFUNDED;
  }
}
