import { Request, Response } from 'express';
import { query, queryOne } from '../config/db';
import { generateId, generatePassCode, paginate } from '../utils/helpers';
import { sendSuccess, sendError, sendNotFound, sendServerError } from '../utils/response';
import type { EPassRow } from '../types';

// GET /api/epasses
export async function getEPasses(req: Request, res: Response): Promise<void> {
  try {
    const page  = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { offset } = paginate(page, limit);
    const userId = req.user!.userId;

    const [{ count }] = await query<{ count: string }>(
      'SELECT COUNT(*) FROM epasses WHERE user_id = $1', [userId]
    );
    const items = await query<EPassRow>(
      'SELECT * FROM epasses WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
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

// GET /api/epasses/:id
export async function getEPass(req: Request, res: Response): Promise<void> {
  try {
    const row = await queryOne<EPassRow>(
      'SELECT * FROM epasses WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user!.userId]
    );
    if (!row) { sendNotFound(res, 'E-Pass not found'); return; }
    sendSuccess(res, row);
  } catch (err) { sendServerError(res, err); }
}

// POST /api/epasses
export async function createEPass(req: Request, res: Response): Promise<void> {
  try {
    const { loungeId, loungeName, validFrom, validUntil, maxGuests, notes } = req.body;
    const passCode = generatePassCode();

    const [row] = await query<EPassRow>(`
      INSERT INTO epasses (id, user_id, pass_code, lounge_id, lounge_name,
                           valid_from, valid_until, max_guests, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `, [generateId(), req.user!.userId, passCode, loungeId || null, loungeName || null,
        new Date(validFrom), new Date(validUntil), maxGuests || 1, notes || null]);

    await query(
      `INSERT INTO activity_logs (id, user_id, type, description)
       VALUES ($1,$2,'EPASS_CREATED',$3)`,
      [generateId(), req.user!.userId, `E-Pass created: ${passCode}`]
    );

    sendSuccess(res, row, 'E-Pass created', 201);
  } catch (err) { sendServerError(res, err); }
}

// PATCH /api/epasses/:id/cancel
export async function cancelEPass(req: Request, res: Response): Promise<void> {
  try {
    const epass = await queryOne<EPassRow>(
      'SELECT * FROM epasses WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user!.userId]
    );
    if (!epass) { sendNotFound(res, 'E-Pass not found'); return; }
    if (epass.status !== 'ACTIVE') { sendError(res, 'Only active passes can be cancelled'); return; }

    const [updated] = await query<EPassRow>(
      `UPDATE epasses SET status = 'CANCELLED' WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    sendSuccess(res, updated);
  } catch (err) { sendServerError(res, err); }
}
