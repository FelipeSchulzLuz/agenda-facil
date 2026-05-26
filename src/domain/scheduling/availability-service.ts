import { Professional } from './professional.js';
import { Appointment, AppointmentStatus } from './appointment.js';
import { TimeSlot } from './value-objects/time-slot.js';
import { DateRange } from './value-objects/date-range.js';

export class AvailabilityService {
  /**
   * Checks if a specific slot is available for a professional.
   */
  static isSlotAvailable(
    professional: Professional,
    existingAppointments: Appointment[],
    requestedRange: DateRange,
    bufferInMinutes: number = 0
  ): boolean {
    // 1. Check if professional is working at that time (Working Hours)
    // We check start and end to ensure the whole slot is within working hours
    if (!professional.isAvailable(requestedRange.start) || !professional.isAvailable(new Date(requestedRange.end.getTime() - 1000))) {
      return false;
    }

    // 2. Add buffers to the requested range for collision detection
    const rangeWithBuffer = new DateRange(
      new Date(requestedRange.start.getTime() - bufferInMinutes * 60000),
      new Date(requestedRange.end.getTime() + bufferInMinutes * 60000)
    );

    // 3. Check for overlaps with existing non-cancelled appointments
    const hasConflict = existingAppointments
      .filter(app => app.status !== AppointmentStatus.CANCELLED)
      .some(app => {
        const appRange = new DateRange(app.startTime, app.endTime);
        return rangeWithBuffer.overlaps(appRange);
      });

    return !hasConflict;
  }

  /**
   * Gets all available slots for a professional on a specific day.
   */
  static getAvailableSlots(
    professional: Professional,
    existingAppointments: Appointment[],
    date: Date,
    slotDurationInMinutes: number,
    bufferInMinutes: number = 0
  ): TimeSlot[] {
    const slots: TimeSlot[] = [];
    
    // Simple implementation: iterate through the day in 15-minute increments (or slot duration)
    // and check availability for each potential slot.
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    let current = new Date(dayStart);

    while (current < dayEnd) {
      const potentialEnd = new Date(current.getTime() + slotDurationInMinutes * 60000);
      
      if (potentialEnd > dayEnd) break;

      const requestedRange = new DateRange(current, potentialEnd);

      if (this.isSlotAvailable(professional, existingAppointments, requestedRange, bufferInMinutes)) {
        slots.push(new TimeSlot(requestedRange.start, requestedRange.end));
      }

      // Move forward by 15 minutes to find more options, or by slot duration?
      // Usually, moving by a fixed small interval (15m) allows for more flexibility in start times.
      current = new Date(current.getTime() + 15 * 60000);
    }

    return slots;
  }
}
