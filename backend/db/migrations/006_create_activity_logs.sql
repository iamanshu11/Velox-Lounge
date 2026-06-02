-- ─────────────────────────────────────────────────────────────
-- Migration 006: activity_logs
-- ─────────────────────────────────────────────────────────────

CREATE TYPE activity_type AS ENUM (
  'LOGIN','LOGOUT','PROFILE_UPDATE','PASSWORD_CHANGE',
  'MEMBERSHIP_ACTIVATED','MEMBERSHIP_RENEWED',
  'EPASS_CREATED','EPASS_USED',
  'LOUNGE_BOOKED','LOUNGE_CHECKED_IN','LOUNGE_COMPLETED',
  'ADMIN_ACTION'
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id          VARCHAR(36)   PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     VARCHAR(36)   NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        activity_type NOT NULL,
  description TEXT          NOT NULL,
  ip_address  VARCHAR(50),
  user_agent  TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user_id    ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_type       ON activity_logs(type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
