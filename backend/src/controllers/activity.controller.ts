import { Request, Response } from 'express';
import { query } from '../config/db';
import { paginate } from '../utils/helpers';
import { sendSuccess, sendServerError } from '../utils/response';
import type { ActivityLogRow, UserRow } from '../types';

// GET /api/activity
export async function getActivityLogs(req: Request, res: Response): Promise<void> {
  try {
    const page  = parseInt(req.query.page as string)  || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { offset } = paginate(page, limit);
    const userId = req.user!.userId;
    const isAdmin = req.user!.role === 'ADMIN';

    const where  = isAdmin ? '' : 'WHERE al.user_id = $1';
    const cWhere = isAdmin ? '' : 'WHERE user_id = $1';
    const params: unknown[] = isAdmin ? [] : [userId];

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM activity_logs ${cWhere}`, params
    );

    const limitIdx  = params.length + 1;
    const offsetIdx = params.length + 2;

    const items = await query<ActivityLogRow & { user?: Pick<UserRow,'id'|'first_name'|'last_name'|'email'> }>(
      `SELECT al.*,
              json_build_object('id',u.id,'first_name',u.first_name,'last_name',u.last_name,'email',u.email) AS user
       FROM activity_logs al
       JOIN users u ON u.id = al.user_id
       ${where}
       ORDER BY al.created_at DESC
       LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
      [...params, limit, offset]
    );

    sendSuccess(res, {
      items,
      total: parseInt(count),
      page,
      limit,
      totalPages: Math.ceil(parseInt(count) / limit),
    });
  } catch (err) { sendServerError(res, err); }
}
