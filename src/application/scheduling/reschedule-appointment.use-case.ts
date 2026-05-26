import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { ProfessionalRepository } from '@domain/scheduling/professional-repository.js';
import { AvailabilityService } from '@domain/scheduling/availability-service.js';
import { DateRange } from '@domain/scheduling/value-objects/date-range.js';
import { DomainEvents } from '@domain/core/events/domain-events.js';
import { TenantId } from '@domain/core/tenant-id.js';

export interface RescheduleAppointmentInput {
  tenantId: string;
  appointmentId: string;
  newStartTime: Date;
  newEndTime: Date;
}

export class RescheduleAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private professionalRepository: ProfessionalRepository
  ) {}

  async execute(input: RescheduleAppointmentInput): Promise<void> {
    const tenantId = new TenantId(input.tenantId);
    
    const appointment = await this.appointmentRepository.findById(input.appointmentId, tenantId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const professional = await this.professionalRepository.findById(appointment.professionalId, tenantId);
    if (!professional) {
      throw new Error('Professional not found');
    }

    // Check availability for NEW time
    const existingAppointments = await this.appointmentRepository.findByProfessionalAndDate(
      appointment.professionalId,
      tenantId,
      input.newStartTime,
      input.newEndTime
    );

    // Filter out the current appointment from conflicts
    const otherAppointments = existingAppointments.filter(app => app.id !== appointment.id);

    const requestedRange = new DateRange(input.newStartTime, input.newEndTime);
    const isAvailable = AvailabilityService.isSlotAvailable(professional, otherAppointments, requestedRange);

    if (!isAvailable) {
      throw new Error('Professional is not available at the new requested time');
    }

    appointment.reschedule(input.newStartTime, input.newEndTime);

    await this.appointmentRepository.save(appointment);

    appointment.domainEvents.forEach(event => DomainEvents.dispatch(event));
    appointment.clearEvents();
  }
}
