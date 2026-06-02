-- ─────────────────────────────────────────────────────────────
-- Migration 007: password_resets
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS password_resets (
  id         VARCHAR(36)  PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id    VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      VARCHAR(128) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ  NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_password_resets_token   ON password_resets(token);
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);
