import { TenantId } from '../core/tenant-id.js';
import { Entity } from '../core/entity.js';
import { AppointmentCreated } from './events/appointment-created.js';
import { AppointmentCancelled } from './events/appointment-cancelled.js';
import { AppointmentRescheduled } from './events/appointment-rescheduled.js';
import { AppointmentConfirmed } from './events/appointment-confirmed.js';

export enum AppointmentStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  CHECKIN_REALIZED = 'CHECKIN_REALIZED',
  IN_SERVICE = 'IN_SERVICE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export class Appointment extends Entity {
  private _startTime: Date;
  private _endTime: Date;
  private _status: AppointmentStatus;

  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly professionalId: string,
    public readonly customerId: string,
    public readonly serviceId: string,
    startTime: Date,
    endTime: Date,
    status: AppointmentStatus = AppointmentStatus.CREATED,
    public readonly createdAt: Date = new Date(),
    private _lastReminderSentAt?: Date,
  ) {
    super();
    this._startTime = startTime;
    this._endTime = endTime;
    this._status = status;
  }

  get lastReminderSentAt(): Date | undefined { return this._lastReminderSentAt; }

  markReminderAsSent(): void {
    this._lastReminderSentAt = new Date();
  }

  static create(
    id: string,
    tenantId: TenantId,
    professionalId: string,
    customerId: string,
    serviceId: string,
    startTime: Date,
    endTime: Date
  ): Appointment {
    const appointment = new Appointment(id, tenantId, professionalId, customerId, serviceId, startTime, endTime);
    appointment.addDomainEvent(new AppointmentCreated(appointment));
    return appointment;
  }

  get startTime(): Date { return this._startTime; }
  get endTime(): Date { return this._endTime; }
  get status(): AppointmentStatus { return this._status; }

  cancel(): void {
    if (this._status === AppointmentStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed appointment');
    }
    this._status = AppointmentStatus.CANCELLED;
    this.addDomainEvent(new AppointmentCancelled(this));
  }

  confirm(): void {
    if (this._status !== AppointmentStatus.CREATED) {
      throw new Error('Only created appointments can be confirmed');
    }
    this._status = AppointmentStatus.CONFIRMED;
    this.addDomainEvent(new AppointmentConfirmed(this));
  }

  reschedule(newStartTime: Date, newEndTime: Date): void {
    if (this._status === AppointmentStatus.CANCELLED || this._status === AppointmentStatus.COMPLETED) {
      throw new Error('Cannot reschedule a cancelled or completed appointment');
    }
    this._startTime = newStartTime;
    this._endTime = newEndTime;
    this.addDomainEvent(new AppointmentRescheduled(this));
  }
}
