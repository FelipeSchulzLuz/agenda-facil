import { Router } from 'express';
import { AppointmentController } from './controllers/appointment.controller.js';
import { CreateAppointmentUseCase } from '@application/scheduling/create-appointment.use-case.js';
import { PrismaAppointmentRepository } from '@infrastructure/persistence/prisma/prisma-appointment-repository.js';
import { PrismaProfessionalRepository } from '@infrastructure/persistence/prisma/prisma-professional-repository.js';
import { PrismaServiceRepository } from '@infrastructure/persistence/prisma/prisma-service-repository.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { getTenantContext } from '@infrastructure/auth/tenant-context.js';

const routes = Router();

// Manual Dependency Injection
const appointmentRepo = new PrismaAppointmentRepository();
const professionalRepo = new PrismaProfessionalRepository();
const serviceRepo = new PrismaServiceRepository();

const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepo,
  professionalRepo,
  serviceRepo
);

const appointmentController = new AppointmentController(createAppointmentUseCase);

// Routes
routes.post('/appointments', (req, res) => appointmentController.create(req, res));
routes.get('/availability', async (req, res) => {
  try {
      const { professionalId, date, slotDuration } = req.query;

      // Use tenant context populated by tenant middleware
      const { tenantId: ctxTenantId } = getTenantContext();

      let appointments = [];
      let professional = null;

      try {
        appointments = await appointmentRepo.findByProfessionalAndDate(
          professionalId as string,
          ctxTenantId,
          new Date(date as string),
          new Date(date as string)
        );

        professional = await professionalRepo.findById(
          professionalId as string,
          ctxTenantId
        );
      } catch (dbErr: any) {
        // If the DB schema is not ready (tables missing), return empty availability
        // as a temporary fallback so the frontend stays functional.
        const msg = dbErr?.message || '';
        if (msg.includes('does not exist') || msg.includes('no such table')) {
          return res.json([]);
        }
        throw dbErr;
      }

      if (!professional) return res.status(404).json({ error: 'Professional not found' });

      const slots = AvailabilityService.getAvailableSlots(
        professional,
        appointments,
        new Date(date as string),
        Number(slotDuration) || 60
      );

      return res.json(slots);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Health Check (public)
routes.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

export { routes };
