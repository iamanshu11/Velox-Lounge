import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '../config/db';
import { sanitizeUser, generateId } from '../utils/helpers';
import { sendSuccess, sendError, sendServerError } from '../utils/response';
import type { UserRow } from '../types';

const USER_FIELDS = `id, email, first_name, last_name, phone, avatar_url, role,
                     is_verified, is_active, last_login_at, created_at, updated_at`;

// PUT /api/profile
export async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, phone } = req.body;
    const [user] = await query<UserRow>(`
      UPDATE users
      SET first_name = $1, last_name = $2, phone = $3
      WHERE id = $4
      RETURNING ${USER_FIELDS}
    `, [firstName, lastName, phone || null, req.user!.userId]);

    await query(
      `INSERT INTO activity_logs (id, user_id, type, description)
       VALUES ($1,$2,'PROFILE_UPDATE','Profile updated')`,
      [generateId(), req.user!.userId]
    );

    sendSuccess(res, user);
  } catch (err) { sendServerError(res, err); }
}

// PATCH /api/profile/password
export async function changePassword(req: Request, res: Response): Promise<void> {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.userId;

    const user = await queryOne<UserRow>('SELECT * FROM users WHERE id = $1', [userId]);
    if (!user) { sendError(res, 'User not found'); return; }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) { sendError(res, 'Current password is incorrect'); return; }

    const hashed = await bcrypt.hash(newPassword, 12);
    await query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userId]);

    await query(
      `INSERT INTO activity_logs (id, user_id, type, description)
       VALUES ($1,$2,'PASSWORD_CHANGE','Password changed')`,
      [generateId(), userId]
    );

    sendSuccess(res, null, 'Password changed successfully');
  } catch (err) { sendServerError(res, err); }
}
