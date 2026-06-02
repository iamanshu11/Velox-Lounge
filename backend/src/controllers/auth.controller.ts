import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query, queryOne, transaction } from '../config/db';
import { signToken } from '../utils/jwt';
import { sanitizeUser, generateId, generateResetToken } from '../utils/helpers';
import { sendSuccess, sendError, sendUnauthorized, sendServerError } from '../utils/response';
import type { UserRow } from '../types';

// POST /api/auth/signup
export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, firstName, lastName, first_name, last_name, phone } = req.body;
    const resolvedFirst = firstName || first_name;
    const resolvedLast  = lastName  || last_name;

    const existing = await queryOne<UserRow>('SELECT id FROM users WHERE email = $1', [email]);
    if (existing) { sendError(res, 'An account with this email already exists'); return; }

    const hashed = await bcrypt.hash(password, 12);
    const id     = generateId();

    const [user] = await query<UserRow>(`
      INSERT INTO users (id, email, password, first_name, last_name, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [id, email.toLowerCase().trim(), hashed, resolvedFirst, resolvedLast, phone || null]);

    await query(
      `INSERT INTO activity_logs (id, user_id, type, description, ip_address)
       VALUES ($1, $2, 'LOGIN', 'Account created', $3)`,
      [generateId(), user.id, req.ip]
    );

    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    sendSuccess(res, { user: sanitizeUser(user), token }, 'Account created', 201);
  } catch (err) {
    sendServerError(res, err);
  }
}

// POST /api/auth/login
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await queryOne<UserRow>(
      'SELECT * FROM users WHERE email = $1 AND is_active = TRUE', [email.toLowerCase().trim()]
    );
    if (!user) { sendUnauthorized(res, 'Invalid email or password'); return; }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) { sendUnauthorized(res, 'Invalid email or password'); return; }

    await query(
      'UPDATE users SET last_login_at = NOW() WHERE id = $1',
      [user.id]
    );
    await query(
      `INSERT INTO activity_logs (id, user_id, type, description, ip_address)
       VALUES ($1, $2, 'LOGIN', 'User logged in', $3)`,
      [generateId(), user.id, req.ip]
    );

    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    sendSuccess(res, { user: sanitizeUser(user), token }, 'Login successful');
  } catch (err) {
    sendServerError(res, err);
  }
}

// GET /api/auth/me
export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    const user = await queryOne<UserRow>(
      `SELECT id, email, first_name, last_name, phone, avatar_url, role,
              is_verified, is_active, last_login_at, created_at, updated_at
       FROM users WHERE id = $1 AND is_active = TRUE`,
      [req.user!.userId]
    );
    if (!user) { sendUnauthorized(res); return; }
    sendSuccess(res, user);
  } catch (err) {
    sendServerError(res, err);
  }
}

// POST /api/auth/forgot-password
export async function forgotPassword(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;
    const user = await queryOne<UserRow>('SELECT id FROM users WHERE email = $1', [email]);

    // Always return success (no email enumeration)
    if (user) {
      const token     = generateResetToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await query(
        `INSERT INTO password_resets (id, user_id, token, expires_at) VALUES ($1,$2,$3,$4)`,
        [generateId(), user.id, token, expiresAt]
      );

      // TODO: send email
      console.log(`[DEV] Reset token: ${token}`);
      console.log(`[DEV] Reset URL: ${process.env.CORS_ORIGIN}/reset-password?token=${token}`);
    }

    sendSuccess(res, null, 'If an account exists, a reset link has been sent');
  } catch (err) {
    sendServerError(res, err);
  }
}

// POST /api/auth/reset-password
export async function resetPassword(req: Request, res: Response): Promise<void> {
  try {
    const { token, password } = req.body;

    const reset = await queryOne<{ id: string; user_id: string; used_at: Date | null; expires_at: Date }>(
      `SELECT id, user_id, used_at, expires_at
       FROM password_resets WHERE token = $1`, [token]
    );

    if (!reset || reset.used_at || reset.expires_at < new Date()) {
      sendError(res, 'Reset link is invalid or has expired', 400);
      return;
    }

    const hashed = await bcrypt.hash(password, 12);

    await transaction(async (client) => {
      await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, reset.user_id]);
      await client.query('UPDATE password_resets SET used_at = NOW() WHERE id = $1', [reset.id]);
      await client.query(
        `INSERT INTO activity_logs (id, user_id, type, description)
         VALUES ($1,$2,'PASSWORD_CHANGE','Password reset via email link')`,
        [generateId(), reset.user_id]
      );
    });

    sendSuccess(res, null, 'Password updated successfully');
  } catch (err) {
    sendServerError(res, err);
  }
}
