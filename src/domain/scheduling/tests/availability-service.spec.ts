import { describe, it, expect } from 'vitest';
import { AvailabilityService } from '../availability-service.js';
import { Professional, WorkingDay } from '../professional.js';
import { Appointment } from '../appointment.js';
import { TenantId } from '../../core/tenant-id.js';
import { DateRange } from '../value-objects/date-range.js';

describe('AvailabilityService', () => {
  const tenantId = new TenantId('tenant-1');
  const workingDays: WorkingDay[] = [
    {
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '18:00',
      pauses: [{ startTime: '12:00', endTime: '13:00' }],
    },
  ];
  const professional = new Professional('prof-1', tenantId, 'John Doe', workingDays);

  it('should identify a slot as available when there are no conflicts', () => {
    const existingAppointments: Appointment[] = [];
    const requestedRange = new DateRange(
      new Date('2026-05-25T10:00:00'),
      new Date('2026-05-25T11:00:00')
    );

    const isAvailable = AvailabilityService.isSlotAvailable(professional, existingAppointments, requestedRange);
    expect(isAvailable).toBe(true);
  });

  it('should identify a slot as unavailable when it overlaps with an existing appointment', () => {
    const existingAppointments = [
      new Appointment('app-1', tenantId, 'prof-1', 'cust-1', 'serv-1',
        new Date('2026-05-25T10:30:00'), 
        new Date('2026-05-25T11:30:00')
      )
    ];
    const requestedRange = new DateRange(
      new Date('2026-05-25T10:00:00'),
      new Date('2026-05-25T11:00:00')
    );

    const isAvailable = AvailabilityService.isSlotAvailable(professional, existingAppointments, requestedRange);
    expect(isAvailable).toBe(false);
  });

  it('should respect buffers between appointments', () => {
    const existingAppointments = [
      new Appointment('app-1', tenantId, 'prof-1', 'cust-1', 'serv-1',
        new Date('2026-05-25T10:00:00'), 
        new Date('2026-05-25T11:00:00')
      )
    ];
    // Requested slot starts exactly when app-1 ends
    const requestedRange = new DateRange(
      new Date('2026-05-25T11:00:00'),
      new Date('2026-05-25T12:00:00')
    );

    // With 15min buffer, it should be unavailable (as it's within the 11:00-11:15 buffer zone)
    const isAvailable = AvailabilityService.isSlotAvailable(professional, existingAppointments, requestedRange, 15);
    expect(isAvailable).toBe(false);
  });

  it('should return available slots for a day', () => {
    const existingAppointments: Appointment[] = [];
    // Using local date constructor to avoid UTC shifting issues in tests
    const date = new Date(2026, 4, 25); // May 25, 2026 is a Monday
    
    const slots = AvailabilityService.getAvailableSlots(professional, existingAppointments, date, 60);
    
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0].start.getHours()).toBe(9);
  });
});
