import { PoolClient } from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function seedUsers(client: PoolClient): Promise<{ adminId: string; userId: string }> {
  console.log('  🌱 Seeding users...');

  const adminId = uuidv4();
  const userId  = uuidv4();

  const adminPw = await bcrypt.hash('Admin@123', 12);
  const userPw  = await bcrypt.hash('User@123', 12);

  await client.query(`
    INSERT INTO users (id, email, password, first_name, last_name, role, is_verified, is_active)
    VALUES
      ($1, 'admin@dragonpass.com', $2, 'Admin', 'DragonPass', 'ADMIN', TRUE, TRUE),
      ($3, 'demo@dragonpass.com',  $4, 'Alex',  'Johnson',    'USER',  TRUE, TRUE)
    ON CONFLICT (email) DO NOTHING
  `, [adminId, adminPw, userId, userPw]);

  // Fetch actual IDs in case of ON CONFLICT DO NOTHING
  const { rows } = await client.query(
    `SELECT id, email FROM users WHERE email IN ('admin@dragonpass.com','demo@dragonpass.com')`
  );
  const map = Object.fromEntries(rows.map(r => [r.email, r.id]));

  console.log('  ✅ Users seeded');
  return {
    adminId: map['admin@dragonpass.com'],
    userId:  map['demo@dragonpass.com'],
  };
}
