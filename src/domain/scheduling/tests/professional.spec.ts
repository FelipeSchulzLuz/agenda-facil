import { describe, it, expect } from 'vitest';
import { Professional, WorkingDay } from '../professional.js';
import { TenantId } from '../../core/tenant-id.js';

describe('Professional Entity', () => {
  const tenantId = new TenantId('tenant-1');
  const workingDays: WorkingDay[] = [
    {
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '18:00',
      pauses: [{ startTime: '12:00', endTime: '13:00' }],
    },
  ];

  it('should be available during working hours on a working day', () => {
    const professional = new Professional('prof-1', tenantId, 'John Doe', workingDays);
    const date = new Date('2026-05-25T10:00:00'); // This is a Monday (check current year context)
    // Note: 2026-05-25 is a Monday.
    expect(professional.isAvailable(date)).toBe(true);
  });

  it('should not be available during a pause', () => {
    const professional = new Professional('prof-1', tenantId, 'John Doe', workingDays);
    const date = new Date('2026-05-25T12:30:00');
    expect(professional.isAvailable(date)).toBe(false);
  });

  it('should not be available outside working hours', () => {
    const professional = new Professional('prof-1', tenantId, 'John Doe', workingDays);
    const date = new Date('2026-05-25T19:00:00');
    expect(professional.isAvailable(date)).toBe(false);
  });

  it('should not be available on a non-working day', () => {
    const professional = new Professional('prof-1', tenantId, 'John Doe', workingDays);
    const date = new Date('2026-05-24T10:00:00'); // Sunday
    expect(professional.isAvailable(date)).toBe(false);
  });
});
