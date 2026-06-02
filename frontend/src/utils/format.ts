import { format, formatDistanceToNow, parseISO } from "date-fns";

export const formatDate     = (d: string | Date, f = "MMM dd, yyyy") =>
  format(typeof d === "string" ? parseISO(d) : d, f);

export const formatDateTime = (d: string | Date) =>
  format(typeof d === "string" ? parseISO(d) : d, "MMM dd, yyyy HH:mm");

export const formatRelative = (d: string | Date) =>
  formatDistanceToNow(typeof d === "string" ? parseISO(d) : d, { addSuffix: true });

export const formatTier     = (t: string) => t.charAt(0) + t.slice(1).toLowerCase();
export const formatStatus   = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
export const fullName       = (u: { first_name: string; last_name: string }) =>
  `${u.first_name} ${u.last_name}`;
export const initials       = (u: { first_name: string; last_name: string }) =>
  `${u.first_name[0]}${u.last_name[0]}`.toUpperCase();
