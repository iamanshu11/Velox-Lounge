import { PoolClient } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export async function seedMembershipsEpassesBookings(
  client: PoolClient,
  userId: string,
  loungeIds: string[]
): Promise<void> {
  console.log('  🌱 Seeding memberships, e-passes, bookings...');

  const membershipId = uuidv4();

  // Membership for demo user
  await client.query(`
    INSERT INTO memberships (id, user_id, dragonpass_member_id, tier, status, card_number,
                              valid_from, valid_until, guest_allowance, lounge_visits_used,
                              lounge_visits_limit, auto_renew)
    VALUES ($1,$2,'DP-2024-000123','PREMIUM','ACTIVE','4532-****-****-1234',
            '2024-01-01','2026-12-31', 2, 5, 30, TRUE)
    ON CONFLICT (user_id) DO NOTHING
  `, [membershipId, userId]);

  // E-Pass
  const epassId = uuidv4();
  await client.query(`
    INSERT INTO epasses (id, user_id, pass_code, status, lounge_id, lounge_name,
                         valid_from, valid_until, max_guests)
    VALUES ($1,$2,'EP-2024-DEMO1234','ACTIVE',$3,'Marhaba Lounge',
            '2024-01-01','2026-12-31', 1)
    ON CONFLICT (pass_code) DO NOTHING
  `, [epassId, userId, loungeIds[2]]);

  // Fetch actual epass id
  const { rows: epRows } = await client.query(
    'SELECT id FROM epasses WHERE pass_code = $1', ['EP-2024-DEMO1234']
  );
  const actualEpassId = epRows[0]?.id || epassId;

  // Booking
  await client.query(`
    INSERT INTO bookings (id, user_id, lounge_id, epass_id, status, booking_ref,
                           visit_date, checkin_time, checkout_time, guest_count, flight_number)
    VALUES ($1,$2,$3,$4,'COMPLETED','BK-20241115-DEMO',
            '2024-11-15','2024-11-15 14:30:00+00','2024-11-15 17:00:00+00', 1,'EK204')
    ON CONFLICT (booking_ref) DO NOTHING
  `, [uuidv4(), userId, loungeIds[2], actualEpassId]);

  // Activity logs
  const activities = [
    ['LOGIN',                'User logged in'],
    ['MEMBERSHIP_ACTIVATED', 'Premium membership activated with ID: DP-2024-000123'],
    ['EPASS_CREATED',        'E-Pass created: EP-2024-DEMO1234'],
    ['LOUNGE_BOOKED',        'Lounge booked: Marhaba Lounge (BK-20241115-DEMO)'],
    ['LOUNGE_COMPLETED',     'Lounge visit completed at Marhaba Lounge'],
  ];

  for (const [type, description] of activities) {
    await client.query(
      'INSERT INTO activity_logs (id, user_id, type, description) VALUES ($1,$2,$3,$4)',
      [uuidv4(), userId, type, description]
    );
  }

  console.log('  ✅ Memberships, e-passes, bookings seeded');
}
