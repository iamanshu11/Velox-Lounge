import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractBearerToken } from '../utils/jwt';
import { sendUnauthorized, sendForbidden } from '../utils/response';

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) {
    sendUnauthorized(res, 'No token provided');
    return;
  }
  try {
    req.user = await verifyToken(token);
    next();
  } catch {
    sendUnauthorized(res, 'Invalid or expired token');
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) { sendUnauthorized(res); return; }
  if (req.user.role !== 'ADMIN') { sendForbidden(res, 'Admin access required'); return; }
  next();
}
