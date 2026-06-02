/**
 * Master seed runner — runs all seed files in order inside one transaction
 */
import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { seedUsers }                          from './01_users';
import { seedLounges }                        from './02_lounges';
import { seedMembershipsEpassesBookings }     from './03_memberships_epasses_bookings';

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'dragonpass_db',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function seed(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { userId } = await seedUsers(client);
    const loungeIds  = await seedLounges(client);
    await seedMembershipsEpassesBookings(client, userId, loungeIds);

    await client.query('COMMIT');

    console.log('\n🎉 Seed complete!');
    console.log('   Admin: admin@dragonpass.com / Admin@123');
    console.log('   User:  demo@dragonpass.com  / User@123\n');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(() => process.exit(1));
