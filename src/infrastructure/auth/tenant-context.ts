import { AsyncLocalStorage } from 'async_hooks';
import { TenantId } from '@domain/core/tenant-id.js';

export interface TenantContext {
  tenantId: TenantId;
  correlationId: string;
}

export const tenantStorage = new AsyncLocalStorage<TenantContext>();

export function getTenantContext(): TenantContext {
  const context = tenantStorage.getStore();
  if (!context) {
    throw new Error('Tenant context not found. Ensure the request is within a tenant scope.');
  }
  return context;
}
