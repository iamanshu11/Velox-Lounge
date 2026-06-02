import { Request, Response } from 'express';
import { query } from '../config/db';
import { sendSuccess, sendServerError } from '../utils/response';
import type { UserRow } from '../types';

// GET /api/admin/stats
export async function getStats(req: Request, res: Response): Promise<void> {
  try {
    const [[{ total_users }], [{ active_members }], [{ total_bookings }], [{ total_epasses }]] =
      await Promise.all([
        query<{ total_users: string }>('SELECT COUNT(*) AS total_users FROM users'),
        query<{ active_members: string }>(`SELECT COUNT(*) AS active_members FROM memberships WHERE status = 'ACTIVE'`),
        query<{ total_bookings: string }>('SELECT COUNT(*) AS total_bookings FROM bookings'),
        query<{ total_epasses: string }>('SELECT COUNT(*) AS total_epasses FROM epasses'),
      ]);

    const recentUsers = await query<Pick<UserRow,'id'|'first_name'|'last_name'|'email'|'role'|'created_at'>>(
      `SELECT id, first_name, last_name, email, role, created_at
       FROM users ORDER BY created_at DESC LIMIT 10`
    );

    sendSuccess(res, {
      totalUsers:    parseInt(total_users),
      activeMembers: parseInt(active_members),
      totalBookings: parseInt(total_bookings),
      totalEPasses:  parseInt(total_epasses),
      recentUsers,
    });
  } catch (err) { sendServerError(res, err); }
}

// GET /api/admin/users
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const page  = parseInt(req.query.page as string)  || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const [{ count }] = await query<{ count: string }>('SELECT COUNT(*) FROM users');
    const users = await query<Omit<UserRow,'password'>>(
      `SELECT id, email, first_name, last_name, phone, role, is_verified, is_active,
              last_login_at, created_at, updated_at
       FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    sendSuccess(res, {
      items: users,
      total: parseInt(count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(count) / limit),
    });
  } catch (err) { sendServerError(res, err); }
}
