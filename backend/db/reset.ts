/**
 * DB Reset — drops all app tables (for dev use only)
 */
import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'dragonpass_db',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function reset(): Promise<void> {
  const client = await pool.connect();
  try {
    console.log('⚠️  Resetting database (dropping all tables)...');
    await client.query(`
      DROP TABLE IF EXISTS
        _migrations,
        activity_logs,
        password_resets,
        bookings,
        epasses,
        memberships,
        lounges,
        users
      CASCADE;

      DROP TYPE IF EXISTS
        user_role,
        membership_status,
        membership_tier,
        epass_status,
        booking_status,
        activity_type
      CASCADE;
    `);
    console.log('✅ Database reset complete. Run db:migrate to recreate tables.');
  } finally {
    client.release();
    await pool.end();
  }
}

reset().catch((err) => {
  console.error('Reset error:', err);
  process.exit(1);
});
