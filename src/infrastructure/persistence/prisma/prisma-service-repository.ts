import { ServiceRepository } from '@domain/catalog/service-repository.js';
import { Service } from '@domain/catalog/service.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prisma } from './client.js';

export class PrismaServiceRepository implements ServiceRepository {
  async findById(id: string, tenantId: TenantId): Promise<Service | null> {
    const raw = await prisma.service.findFirst({
      where: { id, tenantId: tenantId.toString() },
    });

    if (!raw) return null;

    return new Service(
      raw.id,
      new TenantId(raw.tenantId),
      raw.name,
      raw.durationInMinutes,
      raw.priceInCents,
      raw.bufferInMinutes,
      raw.isActive
    );
  }
}
