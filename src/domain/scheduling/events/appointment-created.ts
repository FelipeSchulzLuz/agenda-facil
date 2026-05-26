import { DomainEvent } from '../../core/events/domain-events.js';
import { Appointment } from '../appointment.js';

export class AppointmentCreated implements DomainEvent {
  public readonly occurredOn: Date;

  constructor(public readonly appointment: Appointment) {
    this.occurredOn = new Date();
  }
}
