import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateAppointmentUseCase } from '../create-appointment.use-case.js';
import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { ProfessionalRepository } from '@domain/scheduling/professional-repository.js';
import { Professional } from '@domain/scheduling/professional.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { AppointmentStatus } from '@domain/scheduling/appointment.js';
import { DomainEvents } from '@domain/core/events/domain-events.js';

import { ServiceRepository } from '@domain/catalog/service-repository.js';
import { Service } from '@domain/catalog/service.js';

describe('CreateAppointmentUseCase', () => {
  let appointmentRepository: AppointmentRepository;
  let professionalRepository: ProfessionalRepository;
  let serviceRepository: ServiceRepository;
  let useCase: CreateAppointmentUseCase;

  const tenantId = new TenantId('tenant-1');
  const professional = new Professional('prof-1', tenantId, 'John Doe', [
    { dayOfWeek: 1, startTime: '09:00', endTime: '18:00', pauses: [] }
  ]);
  const service = new Service('serv-1', tenantId, 'Haircut', 60, 5000, 15);

  beforeEach(() => {
    appointmentRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findByProfessionalAndDate: vi.fn().mockResolvedValue([]),
    };
    professionalRepository = {
      findById: vi.fn().mockResolvedValue(professional),
    };
    serviceRepository = {
      findById: vi.fn().mockResolvedValue(service),
    };
    useCase = new CreateAppointmentUseCase(appointmentRepository, professionalRepository, serviceRepository);
    DomainEvents.clearHandlers();
  });

  it('should create an appointment successfully', async () => {
    const startTime = new Date();
    startTime.setDate(startTime.getDate() + 7);
    startTime.setHours(10, 0, 0, 0);
    while (startTime.getDay() !== 1) {
        startTime.setDate(startTime.getDate() + 1);
    }

    const input = {
      tenantId: 'tenant-1',
      professionalId: 'prof-1',
      customerId: 'cust-1',
      serviceId: 'serv-1',
      startTime,
    };

    const appointment = await useCase.execute(input);

    expect(appointment).toBeDefined();
    expect(appointment.serviceId).toBe('serv-1');
    expect(appointment.endTime.getTime()).toBe(startTime.getTime() + 60 * 60000);
    expect(appointmentRepository.save).toHaveBeenCalled();
  });

  it('should throw error if professional is not found', async () => {
    professionalRepository.findById = vi.fn().mockResolvedValue(null);

    const input = {
      tenantId: 'tenant-1',
      professionalId: 'prof-999',
      customerId: 'cust-1',
      startTime: new Date(),
      endTime: new Date(),
    };

    await expect(useCase.execute(input)).rejects.toThrow('Professional not found');
  });

  it('should throw error if lead time is insufficient', async () => {
    const startTime = new Date(); // Right now
    const endTime = new Date(startTime.getTime() + 60 * 60000);

    const input = {
      tenantId: 'tenant-1',
      professionalId: 'prof-1',
      customerId: 'cust-1',
      startTime,
      endTime,
    };

    await expect(useCase.execute(input)).rejects.toThrow(/at least 30 minutes in advance/);
  });
});
