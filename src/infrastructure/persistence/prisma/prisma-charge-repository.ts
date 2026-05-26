import { ChargeRepository } from '@domain/billing/charge-repository.js';
import { Charge, ChargeStatus } from '@domain/billing/charge.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prisma } from './client.js';

export class PrismaChargeRepository implements ChargeRepository {
  async save(charge: Charge): Promise<void> {
    try {
      await prisma.charge.create({
        data: {
          id: charge.id,
          tenantId: charge.tenantId.toString(),
          customerId: charge.customerId,
          appointmentId: charge.appointmentId,
          amountInCents: charge.amountInCents,
          status: charge.status,
          createdAt: charge.createdAt,
        },
      });
    } catch (err: any) {
      // If a unique constraint violation occurs (existing charge), do not update existing record to
      // preserve ledger append-only behavior. Instead, surface an error.
      if (err.code === 'P2002' || err.code === '23505') {
        throw new Error('Charge already exists; append-only ledger prevents updates');
      }
      throw err;
    }
  }
}
