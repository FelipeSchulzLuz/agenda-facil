import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { ServiceRepository } from '@domain/catalog/service-repository.js';
import { ChargeRepository } from '@domain/billing/charge-repository.js';
import { Charge } from '@domain/billing/charge.js';
import { DomainEvents } from '@domain/core/events/domain-events.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { prismaAuditService } from '@infrastructure/persistence/prisma/prisma-audit-service.js';

export interface ConfirmAppointmentInput {
  tenantId: string;
  appointmentId: string;
}

export class ConfirmAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private serviceRepository: ServiceRepository,
    private chargeRepository: ChargeRepository
  ) {}

  async execute(input: ConfirmAppointmentInput): Promise<void> {
    const tenantId = new TenantId(input.tenantId);
    
    // 1. Find Appointment
    const appointment = await this.appointmentRepository.findById(input.appointmentId, tenantId);
    if (!appointment) throw new Error('Appointment not found');

    // 2. Find Service to get price
    const service = await this.serviceRepository.findById(appointment.serviceId, tenantId);
    if (!service) throw new Error('Service not found');

    // 3. Confirm Appointment
    appointment.confirm();

    // 4. Create Charge
    const charge = new Charge(
      crypto.randomUUID(),
      tenantId,
      appointment.customerId,
      appointment.id,
      service.priceInCents
    );

    // 5. Save everything (In a real UoW, this would be a single transaction)
    await this.appointmentRepository.save(appointment);
    await this.chargeRepository.save(charge);

    // Audit: non-blocking logs for appointment confirmation and charge creation
    (async () => {
      try {
        await prismaAuditService.log({
          tenantId,
          userId: 'system',
          action: 'appointment.confirmed',
          entity: 'Appointment',
          entityId: appointment.id,
          payload: { appointmentId: appointment.id },
        });

        await prismaAuditService.log({
          tenantId,
          userId: 'system',
          action: 'charge.created',
          entity: 'Charge',
          entityId: charge.id,
          payload: { amountInCents: charge.amountInCents },
        });
      } catch (e) {
        console.warn('Audit logging failed', e);
      }
    })();

    // 6. Dispatch Events
    appointment.domainEvents.forEach(event => DomainEvents.dispatch(event));
    appointment.clearEvents();
  }
}
