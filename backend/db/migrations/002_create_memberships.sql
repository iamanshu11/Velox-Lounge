-- ─────────────────────────────────────────────────────────────
-- Migration 002: memberships
-- ─────────────────────────────────────────────────────────────

CREATE TYPE membership_status AS ENUM ('ACTIVE','INACTIVE','EXPIRED','PENDING','SUSPENDED');
CREATE TYPE membership_tier   AS ENUM ('STANDARD','PLUS','PREMIUM','ELITE');

CREATE TABLE IF NOT EXISTS memberships (
  id                     VARCHAR(36)       PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id                VARCHAR(36)       NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  dragonpass_member_id   VARCHAR(100)      UNIQUE,
  tier                   membership_tier   NOT NULL DEFAULT 'STANDARD',
  status                 membership_status NOT NULL DEFAULT 'PENDING',
  card_number            VARCHAR(50),
  valid_from             TIMESTAMPTZ,
  valid_until            TIMESTAMPTZ,
  guest_allowance        SMALLINT          NOT NULL DEFAULT 1,
  lounge_visits_used     INT               NOT NULL DEFAULT 0,
  lounge_visits_limit    INT,
  auto_renew             BOOLEAN           NOT NULL DEFAULT FALSE,
  notes                  TEXT,
  metadata               JSONB,
  created_at             TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_status  ON memberships(status);
CREATE INDEX idx_memberships_dp_id   ON memberships(dragonpass_member_id);
