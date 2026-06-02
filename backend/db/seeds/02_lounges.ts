import { PoolClient } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export async function seedLounges(client: PoolClient): Promise<string[]> {
  console.log('  🌱 Seeding lounges...');

  const lounges = [
    {
      id: uuidv4(),
      name: 'Plaza Premium Lounge',
      code: 'JFK-T4-PLAZA',
      airport_code: 'JFK',
      airport_name: 'John F. Kennedy International Airport',
      terminal: 'Terminal 4',
      location: 'Airside, Gate B30',
      country: 'United States',
      description: 'Luxury lounge with premium dining and spa facilities.',
      amenities: ['WiFi', 'Shower', 'Dining', 'Bar', 'Spa', 'Quiet Zone', 'Business Center'],
      opening_hours: { mon:'06:00-22:00', tue:'06:00-22:00', wed:'06:00-22:00', thu:'06:00-22:00', fri:'06:00-22:00', sat:'06:00-22:00', sun:'06:00-22:00' },
      capacity: 150,
    },
    {
      id: uuidv4(),
      name: 'Aspire Lounge',
      code: 'LHR-T5-ASPIRE',
      airport_code: 'LHR',
      airport_name: 'London Heathrow Airport',
      terminal: 'Terminal 5',
      location: 'Departures, Level 3',
      country: 'United Kingdom',
      description: 'Sophisticated lounge with spectacular runway views.',
      amenities: ['WiFi', 'Hot Food', 'Bar', 'TV', 'Newspapers', 'Comfortable Seating'],
      opening_hours: { mon:'05:00-21:00', tue:'05:00-21:00', wed:'05:00-21:00', thu:'05:00-21:00', fri:'05:00-21:00', sat:'05:00-21:00', sun:'05:00-21:00' },
      capacity: 200,
    },
    {
      id: uuidv4(),
      name: 'Marhaba Lounge',
      code: 'DXB-T3-MARHABA',
      airport_code: 'DXB',
      airport_name: 'Dubai International Airport',
      terminal: 'Terminal 3',
      location: 'Concourse A, Level 4',
      country: 'UAE',
      description: 'World-class lounge experience in the heart of Dubai\'s international hub.',
      amenities: ['WiFi', 'Buffet', 'Premium Bar', 'Shower', 'Prayer Room', 'Kids Zone', 'Business Desk'],
      opening_hours: { mon:'00:00-24:00', tue:'00:00-24:00', wed:'00:00-24:00', thu:'00:00-24:00', fri:'00:00-24:00', sat:'00:00-24:00', sun:'00:00-24:00' },
      capacity: 300,
    },
    {
      id: uuidv4(),
      name: 'KrisFlyer Gold Lounge',
      code: 'SIN-T3-KRIS',
      airport_code: 'SIN',
      airport_name: 'Singapore Changi Airport',
      terminal: 'Terminal 3',
      location: 'Level 2, Departure Transit Hall',
      country: 'Singapore',
      description: 'Award-winning lounge at the world\'s best airport.',
      amenities: ['WiFi', 'Noodle Bar', 'Cocktail Bar', 'Shower', 'Spa', 'Sleep Pods'],
      opening_hours: { mon:'05:30-01:30', tue:'05:30-01:30', wed:'05:30-01:30', thu:'05:30-01:30', fri:'05:30-01:30', sat:'05:30-01:30', sun:'05:30-01:30' },
      capacity: 250,
    },
  ];

  const ids: string[] = [];

  for (const l of lounges) {
    await client.query(`
      INSERT INTO lounges (id, name, code, airport_code, airport_name, terminal, location,
                           country, description, amenities, opening_hours, capacity)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      ON CONFLICT (code) DO NOTHING
    `, [l.id, l.name, l.code, l.airport_code, l.airport_name, l.terminal, l.location,
        l.country, l.description, l.amenities, JSON.stringify(l.opening_hours), l.capacity]);

    // Fetch actual id in case of conflict
    const { rows } = await client.query('SELECT id FROM lounges WHERE code = $1', [l.code]);
    ids.push(rows[0].id);
  }

  console.log(`  ✅ ${ids.length} lounges seeded`);
  return ids;
}
