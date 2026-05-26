import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { DomainEvents } from '@domain/core/events/domain-events.js';
import { TenantId } from '@domain/core/tenant-id.js';

export interface CancelAppointmentInput {
  tenantId: string;
  appointmentId: string;
}

export class CancelAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(input: CancelAppointmentInput): Promise<void> {
    const tenantId = new TenantId(input.tenantId);
    
    const appointment = await this.appointmentRepository.findById(input.appointmentId, tenantId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Validate cancellation notice (e.g. 2 hours)
    const minNotice = 120; // minutes
    const now = new Date();
    const notice = (appointment.startTime.getTime() - now.getTime()) / 60000;
    
    if (notice < minNotice) {
      throw new Error(`Cancellation must be done at least ${minNotice} minutes in advance`);
    }

    appointment.cancel();

    await this.appointmentRepository.save(appointment);

    appointment.domainEvents.forEach(event => DomainEvents.dispatch(event));
    appointment.clearEvents();
  }
}
