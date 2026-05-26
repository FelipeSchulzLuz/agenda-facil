import { TenantId } from '../core/tenant-id.js';

export enum NotificationType {
  CONFIRMATION = 'CONFIRMATION',
  REMINDER = 'REMINDER',
  CANCELLATION = 'CANCELLATION',
}

export interface NotificationLog {
  id: string;
  tenantId: TenantId;
  customerId: string;
  type: NotificationType;
  channel: string; // 'email', 'sms', 'whatsapp'
  status: 'SENT' | 'FAILED' | 'DELIVERED';
  sentAt: Date;
}

export interface NotificationGateway {
  send(
    tenantId: TenantId,
    customerId: string,
    type: NotificationType,
    data: Record<string, string>
  ): Promise<void>;
}
