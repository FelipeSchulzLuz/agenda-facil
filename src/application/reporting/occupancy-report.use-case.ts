import { prisma } from '@infrastructure/persistence/prisma/client.js';

export interface OccupancyReportInput {
  tenantId: string;
  startDate: Date;
  endDate: Date;
}

export class OccupancyReportUseCase {
  async execute(input: OccupancyReportInput) {
    const appointments = await prisma.appointment.findMany({
      where: {
        tenantId: input.tenantId,
        startTime: { gte: input.startDate },
        endTime: { lte: input.endDate },
        status: { not: 'CANCELLED' },
      },
      select: {
        professionalId: true,
        startTime: true,
        endTime: true,
      }
    });

    // Simple calculation: total minutes scheduled / total available minutes
    // In a real scenario, we'd need to cross-reference with professional working hours.
    
    const totalMinutesScheduled = appointments.reduce((acc, app) => {
      return acc + (app.endTime.getTime() - app.startTime.getTime()) / 60000;
    }, 0);

    return {
      totalAppointments: appointments.length,
      totalMinutesScheduled,
    };
  }
}
