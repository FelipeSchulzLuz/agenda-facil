import { Appointment } from '@domain/scheduling/appointment.js';
import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { ProfessionalRepository } from '@domain/scheduling/professional-repository.js';
import { ServiceRepository } from '@domain/catalog/service-repository.js';
import { AvailabilityService } from '@domain/scheduling/availability-service.js';
import { DateRange } from '@domain/scheduling/value-objects/date-range.js';
import { DomainEvents } from '@domain/core/events/domain-events.js';
import { TenantId } from '@domain/core/tenant-id.js';

export interface CreateAppointmentInput {
  tenantId: string;
  professionalId: string;
  customerId: string;
  serviceId: string;
  startTime: Date;
}

export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private professionalRepository: ProfessionalRepository,
    private serviceRepository: ServiceRepository
  ) {}

  async execute(input: CreateAppointmentInput): Promise<Appointment> {
    const tenantId = new TenantId(input.tenantId);
    
    // 1. Validate professional and service exist
    const [professional, service] = await Promise.all([
      this.professionalRepository.findById(input.professionalId, tenantId),
      this.serviceRepository.findById(input.serviceId, tenantId),
    ]);

    if (!professional) throw new Error('Professional not found');
    if (!service) throw new Error('Service not found');

    // Calculate end time based on service duration
    const endTime = new Date(input.startTime.getTime() + service.durationInMinutes * 60000);

    // 2. Validate lead time (antecedência mínima)
    const minLeadTime = 30; // minutes
    const now = new Date();
    const leadTime = (input.startTime.getTime() - now.getTime()) / 60000;
    if (leadTime < minLeadTime) {
      throw new Error(`Appointment must be created at least ${minLeadTime} minutes in advance`);
    }

    // 3. Check availability (Anti-Overbooking)
    const existingAppointments = await this.appointmentRepository.findByProfessionalAndDate(
      input.professionalId,
      tenantId,
      input.startTime,
      endTime
    );

    const requestedRange = new DateRange(input.startTime, endTime);
    const isAvailable = AvailabilityService.isSlotAvailable(
      professional, 
      existingAppointments, 
      requestedRange,
      service.bufferInMinutes
    );

    if (!isAvailable) {
      throw new Error('Professional is not available at the requested time');
    }

    // 4. Create and Save
    const appointment = Appointment.create(
      crypto.randomUUID(),
      tenantId,
      input.professionalId,
      input.customerId,
      input.serviceId,
      input.startTime,
      endTime
    );

    await this.appointmentRepository.save(appointment);

    // 5. Dispatch Events
    appointment.domainEvents.forEach(event => DomainEvents.dispatch(event));
    appointment.clearEvents();

    return appointment;
  }
}
