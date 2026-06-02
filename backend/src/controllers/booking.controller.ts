import { Request, Response } from 'express';
import { query, queryOne } from '../config/db';
import { generateId, generateBookingRef, paginate } from '../utils/helpers';
import { sendSuccess, sendError, sendNotFound, sendServerError } from '../utils/response';
import type { BookingRow, LoungeRow } from '../types';

// GET /api/bookings
export async function getBookings(req: Request, res: Response): Promise<void> {
  try {
    const page  = parseInt(req.query.page as string)  || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { offset } = paginate(page, limit);
    const userId = req.user!.userId;

    const [{ count }] = await query<{ count: string }>(
      'SELECT COUNT(*) FROM bookings WHERE user_id = $1', [userId]
    );
    const items = await query<BookingRow & { lounge: LoungeRow }>(
      `SELECT b.*,
              row_to_json(l) AS lounge
       FROM bookings b
       JOIN lounges l ON l.id = b.lounge_id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC
       LIMIT $2 OFFSET $3`,
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

// GET /api/bookings/:id
export async function getBooking(req: Request, res: Response): Promise<void> {
  try {
    const [row] = await query<BookingRow & { lounge: LoungeRow }>(
      `SELECT b.*, row_to_json(l) AS lounge
       FROM bookings b
       JOIN lounges l ON l.id = b.lounge_id
       WHERE b.id = $1 AND b.user_id = $2`,
      [req.params.id, req.user!.userId]
    );
    if (!row) { sendNotFound(res, 'Booking not found'); return; }
    sendSuccess(res, row);
  } catch (err) { sendServerError(res, err); }
}

// POST /api/bookings
export async function createBooking(req: Request, res: Response): Promise<void> {
  try {
    const { loungeId, visitDate, guestCount, flightNumber, notes } = req.body;
    const userId      = req.user!.userId;
    const bookingRef  = generateBookingRef();

    // Verify lounge exists
    const lounge = await queryOne<LoungeRow>(
      'SELECT * FROM lounges WHERE id = $1 AND is_active = TRUE', [loungeId]
    );
    if (!lounge) { sendNotFound(res, 'Lounge not found'); return; }

    const [booking] = await query<BookingRow>(`
      INSERT INTO bookings (id, user_id, lounge_id, status, booking_ref,
                             visit_date, guest_count, flight_number, notes)
      VALUES ($1,$2,$3,'CONFIRMED',$4,$5,$6,$7,$8)
      RETURNING *
    `, [generateId(), userId, loungeId, bookingRef, visitDate,
        guestCount || 0, flightNumber || null, notes || null]);

    await query(
      `INSERT INTO activity_logs (id, user_id, type, description)
       VALUES ($1,$2,'LOUNGE_BOOKED',$3)`,
      [generateId(), userId, `Lounge booked: ${lounge.name} (${bookingRef})`]
    );

    sendSuccess(res, { ...booking, lounge }, 'Booking confirmed', 201);
  } catch (err) { sendServerError(res, err); }
}

// PATCH /api/bookings/:id/cancel
export async function cancelBooking(req: Request, res: Response): Promise<void> {
  try {
    const booking = await queryOne<BookingRow>(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user!.userId]
    );
    if (!booking) { sendNotFound(res, 'Booking not found'); return; }
    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      sendError(res, 'This booking cannot be cancelled'); return;
    }

    const [updated] = await query<BookingRow>(
      `UPDATE bookings SET status = 'CANCELLED' WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    sendSuccess(res, updated);
  } catch (err) { sendServerError(res, err); }
}
