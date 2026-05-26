import { Appointment } from './appointment.js';
import { TenantId } from '../core/tenant-id.js';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findById(id: string, tenantId: TenantId): Promise<Appointment | null>;
  findByProfessionalAndDate(
    professionalId: string, 
    tenantId: TenantId, 
    start: Date, 
    end: Date
  ): Promise<Appointment[]>;
  findUpcomingAppointments(start: Date, end: Date): Promise<Appointment[]>;
}
