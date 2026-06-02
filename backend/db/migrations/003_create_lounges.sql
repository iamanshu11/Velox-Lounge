-- ─────────────────────────────────────────────────────────────
-- Migration 003: lounges
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS lounges (
  id            VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          VARCHAR(200) NOT NULL,
  code          VARCHAR(50)  NOT NULL UNIQUE,
  airport_code  VARCHAR(10)  NOT NULL,
  airport_name  VARCHAR(200) NOT NULL,
  terminal      VARCHAR(50),
  location      TEXT         NOT NULL,
  country       VARCHAR(100) NOT NULL,
  description   TEXT,
  image_url     TEXT,
  amenities     TEXT[]       NOT NULL DEFAULT '{}',
  opening_hours JSONB,
  capacity      SMALLINT,
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  dragonpass_id VARCHAR(100),
  metadata      JSONB,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lounges_airport_code ON lounges(airport_code);
CREATE INDEX idx_lounges_country      ON lounges(country);
CREATE INDEX idx_lounges_is_active    ON lounges(is_active);
