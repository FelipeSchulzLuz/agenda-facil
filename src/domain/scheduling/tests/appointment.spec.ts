import { describe, it, expect } from 'vitest';
import { Appointment, AppointmentStatus } from '../appointment.js';
import { TenantId } from '../../core/tenant-id.js';

describe('Appointment Entity', () => {
  const tenantId = new TenantId('tenant-1');
  const professionalId = 'prof-1';
  const customerId = 'cust-1';
  const startTime = new Date('2026-05-25T10:00:00Z');
  const endTime = new Date('2026-05-25T11:00:00Z');

  it('should create an appointment with CREATED status by default', () => {
    const appointment = new Appointment('app-1', tenantId, professionalId, customerId, 'serv-1', startTime, endTime);
    expect(appointment.status).toBe(AppointmentStatus.CREATED);
  });

  it('should be able to confirm a created appointment', () => {
    const appointment = new Appointment('app-1', tenantId, professionalId, customerId, 'serv-1', startTime, endTime);
    appointment.confirm();
    expect(appointment.status).toBe(AppointmentStatus.CONFIRMED);
  });

  it('should not be able to confirm a cancelled appointment', () => {
    const appointment = new Appointment('app-1', tenantId, professionalId, customerId, 'serv-1', startTime, endTime);
    appointment.cancel();
    expect(() => appointment.confirm()).toThrow('Only created appointments can be confirmed');
  });

  it('should be able to cancel an appointment', () => {
    const appointment = new Appointment('app-1', tenantId, professionalId, customerId, 'serv-1', startTime, endTime);
    appointment.cancel();
    expect(appointment.status).toBe(AppointmentStatus.CANCELLED);
  });
});
