export type Role             = 'USER' | 'ADMIN';
export type MembershipStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'PENDING' | 'SUSPENDED';
export type MembershipTier   = 'STANDARD' | 'PLUS' | 'PREMIUM' | 'ELITE';
export type EPassStatus      = 'ACTIVE' | 'USED' | 'EXPIRED' | 'CANCELLED';
export type BookingStatus    = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type ActivityType     =
  | 'LOGIN' | 'LOGOUT' | 'PROFILE_UPDATE' | 'PASSWORD_CHANGE'
  | 'MEMBERSHIP_ACTIVATED' | 'MEMBERSHIP_RENEWED'
  | 'EPASS_CREATED' | 'EPASS_USED'
  | 'LOUNGE_BOOKED' | 'LOUNGE_CHECKED_IN' | 'LOUNGE_COMPLETED'
  | 'ADMIN_ACTION';

// DB row shapes (snake_case from PostgreSQL)
export interface UserRow {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: Role;
  is_verified: boolean;
  is_active: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface MembershipRow {
  id: string;
  user_id: string;
  dragonpass_member_id: string | null;
  tier: MembershipTier;
  status: MembershipStatus;
  card_number: string | null;
  valid_from: Date | null;
  valid_until: Date | null;
  guest_allowance: number;
  lounge_visits_used: number;
  lounge_visits_limit: number | null;
  auto_renew: boolean;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface LoungeRow {
  id: string;
  name: string;
  code: string;
  airport_code: string;
  airport_name: string;
  terminal: string | null;
  location: string;
  country: string;
  description: string | null;
  image_url: string | null;
  amenities: string[];
  opening_hours: Record<string, string> | null;
  capacity: number | null;
  is_active: boolean;
  dragonpass_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface EPassRow {
  id: string;
  user_id: string;
  pass_code: string;
  qr_code: string | null;
  status: EPassStatus;
  lounge_id: string | null;
  lounge_name: string | null;
  valid_from: Date;
  valid_until: Date;
  used_at: Date | null;
  guest_count: number;
  max_guests: number;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface BookingRow {
  id: string;
  user_id: string;
  lounge_id: string;
  epass_id: string | null;
  status: BookingStatus;
  booking_ref: string;
  visit_date: Date;
  checkin_time: Date | null;
  checkout_time: Date | null;
  guest_count: number;
  flight_number: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface ActivityLogRow {
  id: string;
  user_id: string;
  type: ActivityType;
  description: string;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown> | null;
  created_at: Date;
}

// JWT payload
export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
}

// Express augmentation
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
