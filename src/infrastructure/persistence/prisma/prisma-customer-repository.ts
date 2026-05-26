import { CustomerRepository } from '@domain/customer/customer-repository.js';
import { Customer } from '@domain/customer/customer.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prisma } from './client.js';

export class PrismaCustomerRepository implements CustomerRepository {
  async save(customer: Customer): Promise<void> {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        cpf: customer.cpf,
        isBlocked: customer.isBlocked,
      },
      create: {
        id: customer.id,
        tenantId: customer.tenantId.toString(),
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        cpf: customer.cpf,
        isBlocked: customer.isBlocked,
        createdAt: customer.createdAt,
      },
    });
  }

  async findById(id: string, tenantId: TenantId): Promise<Customer | null> {
    const raw = await prisma.customer.findFirst({
      where: { id, tenantId: tenantId.toString() },
    });

    if (!raw) return null;

    return new Customer(
      raw.id,
      new TenantId(raw.tenantId),
      raw.name,
      raw.phone,
      raw.email || undefined,
      raw.cpf || undefined,
      raw.isBlocked,
      raw.createdAt
    );
  }
}
