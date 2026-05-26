import { Request, Response, NextFunction } from 'express';
import { tenantStorage } from '@infrastructure/auth/tenant-context.js';
import { TenantId } from '@domain/core/tenant-id.js';
import { logger } from '@infrastructure/logger/pino-logger.js';

export function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenantIdHeader = req.headers['x-tenant-id'];
  const correlationId = (req.headers['x-correlation-id'] as string) || crypto.randomUUID();

  if (!tenantIdHeader) {
    return res.status(401).json({ error: 'x-tenant-id header is required' });
  }

  try {
    const tenantId = new TenantId(tenantIdHeader as string);
    
    // Set correlation ID in response headers for traceability
    res.setHeader('x-correlation-id', correlationId);

    tenantStorage.run({ tenantId, correlationId }, () => {
      logger.info({ 
        msg: 'Request received', 
        method: req.method, 
        url: req.url, 
        tenantId: tenantId.toString(),
        correlationId 
      });
      next();
    });
  } catch (error: any) {
    return res.status(400).json({ error: 'Invalid tenant ID' });
  }
}
