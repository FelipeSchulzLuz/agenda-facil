import { AppointmentRepository } from '@domain/scheduling/appointment-repository.js';
import { NotificationGateway, NotificationType } from '@domain/notification/notification.js';
import { AppointmentStatus } from '@domain/scheduling/appointment.js';

export class SendRemindersUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private notificationGateway: NotificationGateway
  ) {}

  async execute(): Promise<number> {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60000);
    const windowEnd = new Date(tomorrow.getTime() + 60 * 60000); // 1h window

    const appointments = await this.appointmentRepository.findUpcomingAppointments(tomorrow, windowEnd);
    
    let sentCount = 0;

    for (const appointment of appointments) {
      if (appointment.status === AppointmentStatus.CONFIRMED && !appointment.lastReminderSentAt) {
        await this.notificationGateway.send(
          appointment.tenantId,
          appointment.customerId,
          NotificationType.REMINDER,
          {
            appointmentId: appointment.id,
            startTime: appointment.startTime.toISOString(),
          }
        );

        appointment.markReminderAsSent();
        await this.appointmentRepository.save(appointment);
        sentCount++;
      }
    }

    return sentCount;
  }
}
