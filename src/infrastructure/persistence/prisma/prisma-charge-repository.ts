import { ChargeRepository } from '@domain/billing/charge-repository.js';
import { Charge, ChargeStatus } from '@domain/billing/charge.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prisma } from './client.js';

export class PrismaChargeRepository implements ChargeRepository {
  async save(charge: Charge): Promise<void> {
    await prisma.charge.upsert({
      where: { id: charge.id },
      update: {
        status: charge.status,
      },
      create: {
        id: charge.id,
        tenantId: charge.tenantId.toString(),
        customerId: charge.customerId,
        appointmentId: charge.appointmentId,
        amountInCents: charge.amountInCents,
        status: charge.status,
        createdAt: charge.createdAt,
      },
    });
  }
}
