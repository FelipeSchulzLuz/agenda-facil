import { Request, Response } from 'express';
import { CreateAppointmentUseCase } from '@application/scheduling/create-appointment.use-case.js';

export class AppointmentController {
  constructor(private createAppointmentUseCase: CreateAppointmentUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const { tenantId, professionalId, customerId, serviceId, startTime } = req.body;

      const appointment = await this.createAppointmentUseCase.execute({
        tenantId,
        professionalId,
        customerId,
        serviceId,
        startTime: new Date(startTime),
      });

      return res.status(201).json(appointment);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
