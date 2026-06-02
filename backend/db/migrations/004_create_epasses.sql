-- ─────────────────────────────────────────────────────────────
-- Migration 004: epasses
-- ─────────────────────────────────────────────────────────────

CREATE TYPE epass_status AS ENUM ('ACTIVE','USED','EXPIRED','CANCELLED');

CREATE TABLE IF NOT EXISTS epasses (
  id          VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pass_code   VARCHAR(50)  NOT NULL UNIQUE,
  qr_code     TEXT,
  status      epass_status NOT NULL DEFAULT 'ACTIVE',
  lounge_id   VARCHAR(36)  REFERENCES lounges(id) ON DELETE SET NULL,
  lounge_name VARCHAR(200),
  valid_from  TIMESTAMPTZ  NOT NULL,
  valid_until TIMESTAMPTZ  NOT NULL,
  used_at     TIMESTAMPTZ,
  guest_count SMALLINT     NOT NULL DEFAULT 0,
  max_guests  SMALLINT     NOT NULL DEFAULT 1,
  notes       TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_epasses_user_id    ON epasses(user_id);
CREATE INDEX idx_epasses_pass_code  ON epasses(pass_code);
CREATE INDEX idx_epasses_status     ON epasses(status);
CREATE INDEX idx_epasses_valid_until ON epasses(valid_until);
