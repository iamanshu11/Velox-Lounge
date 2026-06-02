import { Request, Response } from 'express';
import { query, queryOne } from '../config/db';
import { generateId } from '../utils/helpers';
import { sendSuccess, sendError, sendServerError } from '../utils/response';
import type { MembershipRow } from '../types';

// GET /api/membership
export async function getMembership(req: Request, res: Response): Promise<void> {
  try {
    const row = await queryOne<MembershipRow>(
      'SELECT * FROM memberships WHERE user_id = $1', [req.user!.userId]
    );
    sendSuccess(res, row);
  } catch (err) { sendServerError(res, err); }
}

// PUT /api/membership
export async function updateMembership(req: Request, res: Response): Promise<void> {
  try {
    const { tier, autoRenew, notes } = req.body;
    const userId = req.user!.userId;

    const existing = await queryOne<{ id: string }>(
      'SELECT id FROM memberships WHERE user_id = $1', [userId]
    );

    let row: MembershipRow | null;
    if (existing) {
      [row] = await query<MembershipRow>(`
        UPDATE memberships
        SET tier = COALESCE($1, tier),
            auto_renew = COALESCE($2, auto_renew),
            notes = COALESCE($3, notes)
        WHERE user_id = $4
        RETURNING *
      `, [tier || null, autoRenew ?? null, notes || null, userId]);
    } else {
      [row] = await query<MembershipRow>(`
        INSERT INTO memberships (id, user_id, tier, auto_renew, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, [generateId(), userId, tier || 'STANDARD', autoRenew ?? false, notes || null]);
    }

    sendSuccess(res, row);
  } catch (err) { sendServerError(res, err); }
}

// POST /api/membership/activate
export async function activateMembership(req: Request, res: Response): Promise<void> {
  try {
    const { dragonpassMemberId } = req.body;
    if (!dragonpassMemberId?.trim()) {
      sendError(res, 'DragonPass Member ID is required'); return;
    }

    const userId = req.user!.userId;

    // Check if already in use by another account
    const conflict = await queryOne<{ user_id: string }>(
      'SELECT user_id FROM memberships WHERE dragonpass_member_id = $1', [dragonpassMemberId]
    );
    if (conflict && conflict.user_id !== userId) {
      sendError(res, 'This Member ID is already linked to another account'); return;
    }

    // TODO: validate against DragonPass API when credentials are available

    const validFrom  = new Date();
    const validUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    const existing = await queryOne<{ id: string }>(
      'SELECT id FROM memberships WHERE user_id = $1', [userId]
    );

    let row: MembershipRow | null;
    if (existing) {
      [row] = await query<MembershipRow>(`
        UPDATE memberships
        SET dragonpass_member_id = $1, status = 'ACTIVE',
            valid_from = $2, valid_until = $3
        WHERE user_id = $4
        RETURNING *
      `, [dragonpassMemberId, validFrom, validUntil, userId]);
    } else {
      [row] = await query<MembershipRow>(`
        INSERT INTO memberships (id, user_id, dragonpass_member_id, status, valid_from, valid_until)
        VALUES ($1, $2, $3, 'ACTIVE', $4, $5)
        RETURNING *
      `, [generateId(), userId, dragonpassMemberId, validFrom, validUntil]);
    }

    await query(
      `INSERT INTO activity_logs (id, user_id, type, description)
       VALUES ($1,$2,'MEMBERSHIP_ACTIVATED',$3)`,
      [generateId(), userId, `Membership activated with ID: ${dragonpassMemberId}`]
    );

    sendSuccess(res, row, 'Membership activated');
  } catch (err) { sendServerError(res, err); }
}
