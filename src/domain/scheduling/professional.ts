import { TenantId } from '../core/tenant-id.js';

export interface WorkingDay {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  pauses: { startTime: string; endTime: string }[];
}

export class Professional {
  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly name: string,
    public readonly workingDays: WorkingDay[] = [],
    public readonly createdAt: Date = new Date(),
  ) {}

  isAvailable(date: Date): boolean {
    const dayOfWeek = date.getDay();
    const time = date.toTimeString().slice(0, 5);

    const schedule = this.workingDays.find(wd => wd.dayOfWeek === dayOfWeek);
    if (!schedule) return false;

    if (time < schedule.startTime || time >= schedule.endTime) return false;

    const inPause = schedule.pauses.some(p => time >= p.startTime && time < p.endTime);
    return !inPause;
  }
}
