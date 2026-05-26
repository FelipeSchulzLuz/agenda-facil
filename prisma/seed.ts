import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding database...');

  // 1. Create Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'barbearia-premium' },
    update: {},
    create: {
      id: 'tenant-1',
      name: 'Barbearia Premium',
      slug: 'barbearia-premium',
    },
  });

  // 2. Create Professional
  const professional = await prisma.professional.upsert({
    where: { id: 'prof-1' },
    update: {},
    create: {
      id: 'prof-1',
      tenantId: tenant.id,
      name: 'João Barbeiro',
      workingDays: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '18:00', pauses: [] },
        { dayOfWeek: 2, startTime: '09:00', endTime: '18:00', pauses: [] },
        { dayOfWeek: 3, startTime: '09:00', endTime: '18:00', pauses: [] },
        { dayOfWeek: 4, startTime: '09:00', endTime: '18:00', pauses: [] },
        { dayOfWeek: 5, startTime: '09:00', endTime: '20:00', pauses: [] },
      ],
    },
  });

  // 3. Create Service
  const service = await prisma.service.upsert({
    where: { id: 'serv-1' },
    update: {},
    create: {
      id: 'serv-1',
      tenantId: tenant.id,
      name: 'Corte de Cabelo',
      durationInMinutes: 60,
      priceInCents: 5000,
      bufferInMinutes: 15,
    },
  });

  // 4. Create Customer
  const customer = await prisma.customer.upsert({
    where: { id: 'cust-1' },
    update: {},
    create: {
      id: 'cust-1',
      tenantId: tenant.id,
      name: 'Cliente Teste',
      phone: '11999999999',
    },
  });

  console.log('Seed completed successfully!');
  console.log({
    tenantId: tenant.id,
    professionalId: professional.id,
    serviceId: service.id,
    customerId: customer.id,
  });

  await pool.end();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
