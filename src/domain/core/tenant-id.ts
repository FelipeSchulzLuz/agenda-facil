export class TenantId {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error('TenantId is required');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: TenantId): boolean {
    return this.value === other.toString();
  }
}
