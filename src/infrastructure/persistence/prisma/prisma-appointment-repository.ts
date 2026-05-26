import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { Appointment, AppointmentStatus } from '@domain/scheduling/appointment.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prisma } from './client.js';

export class PrismaAppointmentRepository implements AppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    await prisma.appointment.upsert({
      where: { id: appointment.id },
      update: {
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
      },
      create: {
        id: appointment.id,
        tenantId: appointment.tenantId.toString(),
        professionalId: appointment.professionalId,
        customerId: appointment.customerId,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        createdAt: appointment.createdAt,
      },
    });
  }

  async findById(id: string, tenantId: TenantId): Promise<Appointment | null> {
    const raw = await prisma.appointment.findFirst({
      where: { id, tenantId: tenantId.toString() },
    });

    if (!raw) return null;

    return new Appointment(
      raw.id,
      new TenantId(raw.tenantId),
      raw.professionalId,
      raw.customerId,
      raw.startTime,
      raw.endTime,
      raw.status as AppointmentStatus,
      raw.createdAt
    );
  }

  async findByProfessionalAndDate(
    professionalId: string,
    tenantId: TenantId,
    start: Date,
    end: Date
  ): Promise<Appointment[]> {
    // Basic date range query. In production, we might want to be more specific about overlaps.
    // For availability, we usually look for any appointment on that day or close to the range.
    const dayStart = new Date(start);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(start);
    dayEnd.setHours(23, 59, 59, 999);

    const raws = await prisma.appointment.findMany({
      where: {
        professionalId,
        tenantId: tenantId.toString(),
        startTime: { gte: dayStart },
        endTime: { lte: dayEnd },
      },
    });

    return raws.map(raw => new Appointment(
      raw.id,
      new TenantId(raw.tenantId),
      raw.professionalId,
      raw.customerId,
      raw.startTime,
      raw.endTime,
      raw.status as AppointmentStatus,
      raw.createdAt
    ));
  }
}
