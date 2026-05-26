import { TenantId } from '../core/tenant-id.js';
import { NotificationType } from './notification.js';

export class NotificationTemplate {
  constructor(
    public readonly id: string,
    public readonly tenantId: TenantId,
    public readonly type: NotificationType,
    public readonly body: string, // e.g. "Olá {{name}}, seu agendamento em {{date}} está confirmado."
  ) {}

  render(data: Record<string, string>): string {
    let rendered = this.body;
    for (const [key, value] of Object.entries(data)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return rendered;
  }
}
