import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

function yyyymmdd(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export function generateBookingRef(): string {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK-${yyyymmdd()}-${rand}`;
}

export function generatePassCode(): string {
  const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `EP-${new Date().getFullYear()}-${rand}`;
}

export function generateResetToken(): string {
  const rand = Array.from(
    { length: 64 },
    () => Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return rand;
}

export function paginate(page: number, limit: number): { offset: number; limit: number } {
  const safePage  = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  return { offset: (safePage - 1) * safeLimit, limit: safeLimit };
}

/** Strip the password field from a user row */
export function sanitizeUser<T extends { password?: string }>(user: T): Omit<T, 'password'> {
  const { password: _, ...safe } = user;
  return safe;
}
