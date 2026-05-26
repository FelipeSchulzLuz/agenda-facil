import { TenantId } from '../core/tenant-id.js';
import { Entity } from '../core/entity.js';

export class Customer extends Entity {
  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly name: string,
    public readonly phone: string,
    public readonly email?: string,
    public readonly cpf?: string,
    private _isBlocked: boolean = false,
    public readonly createdAt: Date = new Date(),
  ) {
    super();
  }

  get isBlocked(): boolean {
    return this._isBlocked;
  }

  block(): void {
    this._isBlocked = true;
  }

  unblock(): void {
    this._isBlocked = false;
  }

  /**
   * Returns a masked version of the customer for logging or public display.
   */
  get maskedInfo() {
    return {
      name: this.name.split(' ')[0] + '***',
      phone: this.phone.slice(0, 4) + '****' + this.phone.slice(-2),
      cpf: this.cpf ? this.cpf.slice(0, 3) + '********' : undefined,
    };
  }
}
