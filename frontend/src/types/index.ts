export type Role             = "USER" | "ADMIN";
export type MembershipTier   = "STANDARD" | "PLUS" | "PREMIUM" | "ELITE";
export type MembershipStatus = "ACTIVE" | "INACTIVE" | "EXPIRED" | "PENDING" | "SUSPENDED";
export type EPassStatus      = "ACTIVE" | "USED" | "EXPIRED" | "CANCELLED";
export type BookingStatus    = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
export type ActivityType     =
  | "LOGIN" | "LOGOUT" | "PROFILE_UPDATE" | "PASSWORD_CHANGE"
  | "MEMBERSHIP_ACTIVATED" | "MEMBERSHIP_RENEWED"
  | "EPASS_CREATED" | "EPASS_USED"
  | "LOUNGE_BOOKED" | "LOUNGE_CHECKED_IN" | "LOUNGE_COMPLETED"
  | "ADMIN_ACTION";

export interface User {
  id: string; email: string; first_name: string; last_name: string;
  phone: string | null; avatar_url: string | null; role: Role;
  is_verified: boolean; is_active: boolean;
  last_login_at: string | null; created_at: string; updated_at: string;
}

export interface Membership {
  id: string; user_id: string; dragonpass_member_id: string | null;
  tier: MembershipTier; status: MembershipStatus; card_number: string | null;
  valid_from: string | null; valid_until: string | null;
  guest_allowance: number; lounge_visits_used: number; lounge_visits_limit: number | null;
  auto_renew: boolean; notes: string | null; created_at: string; updated_at: string;
}

export interface Lounge {
  id: string; name: string; code: string; airport_code: string; airport_name: string;
  terminal: string | null; location: string; country: string;
  description: string | null; image_url: string | null; amenities: string[];
  opening_hours: Record<string, string> | null; capacity: number | null;
  is_active: boolean; created_at: string; updated_at: string;
}

export interface EPass {
  id: string; user_id: string; pass_code: string; qr_code: string | null;
  status: EPassStatus; lounge_id: string | null; lounge_name: string | null;
  valid_from: string; valid_until: string; used_at: string | null;
  guest_count: number; max_guests: number; notes: string | null;
  created_at: string; updated_at: string;
}

export interface Booking {
  id: string; user_id: string; lounge_id: string; epass_id: string | null;
  status: BookingStatus; booking_ref: string; visit_date: string;
  checkin_time: string | null; checkout_time: string | null;
  guest_count: number; flight_number: string | null; notes: string | null;
  created_at: string; updated_at: string;
  lounge?: Lounge;
}

export interface ActivityLog {
  id: string; user_id: string; type: ActivityType; description: string;
  ip_address: string | null; created_at: string;
  user?: { id: string; first_name: string; last_name: string; email: string };
}

export interface ApiResponse<T = unknown> {
  success: boolean; data?: T; message?: string; error?: string;
}

export interface Paginated<T> {
  items: T[]; total: number; page: number; limit: number; totalPages: number;
}
