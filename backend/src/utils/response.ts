import { Response } from 'express';

export function sendSuccess<T>(res: Response, data: T, message?: string, status = 200): void {
  res.status(status).json({ success: true, data, message });
}

export function sendError(res: Response, error: string, status = 400): void {
  res.status(status).json({ success: false, error });
}

export function sendUnauthorized(res: Response, message = 'Unauthorized'): void {
  res.status(401).json({ success: false, error: message });
}

export function sendForbidden(res: Response, message = 'Forbidden'): void {
  res.status(403).json({ success: false, error: message });
}

export function sendNotFound(res: Response, message = 'Not found'): void {
  res.status(404).json({ success: false, error: message });
}

export function sendServerError(res: Response, err?: unknown): void {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
}
