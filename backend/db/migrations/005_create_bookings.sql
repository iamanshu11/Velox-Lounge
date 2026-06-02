-- ─────────────────────────────────────────────────────────────
-- Migration 005: bookings
-- ─────────────────────────────────────────────────────────────

CREATE TYPE booking_status AS ENUM ('PENDING','CONFIRMED','CHECKED_IN','COMPLETED','CANCELLED','NO_SHOW');

CREATE TABLE IF NOT EXISTS bookings (
  id             VARCHAR(36)     PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id        VARCHAR(36)     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lounge_id      VARCHAR(36)     NOT NULL REFERENCES lounges(id),
  epass_id       VARCHAR(36)     UNIQUE REFERENCES epasses(id) ON DELETE SET NULL,
  status         booking_status  NOT NULL DEFAULT 'PENDING',
  booking_ref    VARCHAR(50)     NOT NULL UNIQUE,
  visit_date     DATE            NOT NULL,
  checkin_time   TIMESTAMPTZ,
  checkout_time  TIMESTAMPTZ,
  guest_count    SMALLINT        NOT NULL DEFAULT 0,
  flight_number  VARCHAR(20),
  notes          TEXT,
  metadata       JSONB,
  created_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_user_id     ON bookings(user_id);
CREATE INDEX idx_bookings_lounge_id   ON bookings(lounge_id);
CREATE INDEX idx_bookings_status      ON bookings(status);
CREATE INDEX idx_bookings_visit_date  ON bookings(visit_date);
CREATE INDEX idx_bookings_booking_ref ON bookings(booking_ref);
