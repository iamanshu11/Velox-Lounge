import { Request, Response } from 'express';
import { query, queryOne } from '../config/db';
import { paginate } from '../utils/helpers';
import { sendSuccess, sendNotFound, sendServerError } from '../utils/response';
import type { LoungeRow } from '../types';

// GET /api/lounges
export async function getLounges(req: Request, res: Response): Promise<void> {
  try {
    const page    = parseInt(req.query.page as string)    || 1;
    const limit   = parseInt(req.query.limit as string)   || 12;
    const search  = (req.query.search  as string || '').trim();
    const country = (req.query.country as string || '').trim();
    const { offset } = paginate(page, limit);

    const conditions: string[] = ['is_active = TRUE'];
    const params: unknown[]    = [];
    let   idx = 1;

    if (search) {
      conditions.push(`(
        name         ILIKE $${idx}
        OR airport_code ILIKE $${idx}
        OR airport_name ILIKE $${idx}
        OR country      ILIKE $${idx}
      )`);
      params.push(`%${search}%`);
      idx++;
    }

    if (country) {
      conditions.push(`country ILIKE $${idx}`);
      params.push(`%${country}%`);
      idx++;
    }

    const where = conditions.join(' AND ');

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM lounges WHERE ${where}`, params
    );

    const items = await query<LoungeRow>(
      `SELECT * FROM lounges WHERE ${where} ORDER BY name ASC LIMIT $${idx} OFFSET $${idx + 1}`,
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

// GET /api/lounges/:id
export async function getLounge(req: Request, res: Response): Promise<void> {
  try {
    const row = await queryOne<LoungeRow>(
      'SELECT * FROM lounges WHERE id = $1 AND is_active = TRUE', [req.params.id]
    );
    if (!row) { sendNotFound(res, 'Lounge not found'); return; }
    sendSuccess(res, row);
  } catch (err) { sendServerError(res, err); }
}
