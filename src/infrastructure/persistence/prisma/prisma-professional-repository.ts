import { ProfessionalRepository } from '@domain/scheduling/professional-repository.js';
import { Professional, WorkingDay } from '@domain/scheduling/professional.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prisma } from './client.js';

export class PrismaProfessionalRepository implements ProfessionalRepository {
  async findById(id: string, tenantId: TenantId): Promise<Professional | null> {
    const raw = await prisma.professional.findFirst({
      where: { id, tenantId: tenantId.toString() }
    });

    if (!raw) return null;

    return new Professional(
      raw.id,
      new TenantId(raw.tenantId),
      raw.name,
      raw.workingDays as unknown as WorkingDay[],
      raw.createdAt
    );
  }
}
