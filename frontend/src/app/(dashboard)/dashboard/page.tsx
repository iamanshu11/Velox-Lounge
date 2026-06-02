"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore }    from "@/stores/auth.store";
import { membershipService } from "@/services/membership";
import { bookingService }    from "@/services/booking";
import { epassService }      from "@/services/epass";
import type { Membership, Booking, EPass } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import { PageLoader } from "@/components/common/Spinner";
import { CreditCard, Ticket, Calendar, Building2, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { formatDate, formatTier } from "@/utils/format";

const bStatusV: Record<string, any> = { CONFIRMED:"success", PENDING:"warning", COMPLETED:"secondary", CANCELLED:"destructive", CHECKED_IN:"info", NO_SHOW:"destructive" };

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [bookings,   setBookings]   = useState<Booking[]>([]);
  const [epasses,    setEPasses]    = useState<EPass[]>([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      membershipService.get().then(r => setMembership(r.data.data ?? null)).catch(() => {}),
      bookingService.getAll({ limit: 5 }).then(r => setBookings(r.data.data?.items ?? [])).catch(() => {}),
      epassService.getAll({ limit: 4 }).then(r => setEPasses(r.data.data?.items ?? [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const activeEpasses = epasses.filter(e => e.status === "ACTIVE").length;

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.first_name}!</h1>
        <p className="text-brand-100 mt-1 text-sm">
          {membership?.status === "ACTIVE"
            ? `Your ${formatTier(membership.tier)} membership is active.`
            : "Link your DragonPass membership to get started."}
        </p>
        {membership?.dragonpass_member_id && (
          <p className="font-mono text-xs text-brand-200 mt-2">ID: {membership.dragonpass_member_id}</p>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label:"Membership",    value: membership ? formatTier(membership.tier) : "—",  sub: membership?.status ?? "Not linked",        icon: CreditCard, href:"/membership" },
          { label:"Lounge Visits", value: membership?.lounge_visits_used ?? 0,              sub: membership?.lounge_visits_limit ? `of ${membership.lounge_visits_limit}` : "unlimited", icon: TrendingUp, href:"/bookings" },
          { label:"Active Passes", value: activeEpasses,                                    sub: "available to use",                        icon: Ticket,     href:"/epasses" },
          { label:"Bookings",      value: bookings.length,                                  sub: "recent",                                  icon: Calendar,   href:"/bookings" },
        ].map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20 group-hover:bg-brand-100 transition-colors">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
            <Link href="/bookings"><Button variant="ghost" size="sm" className="gap-1 text-brand-500 text-xs">View all <ArrowRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-muted-foreground">
                <Calendar className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-sm">No bookings yet</p>
                <Link href="/lounges" className="mt-2"><Button size="sm" variant="outline">Browse Lounges</Button></Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{(b.lounge as any)?.name || "—"}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(b.visit_date)}</p>
                    </div>
                    <Badge variant={bStatusV[b.status] ?? "secondary"} className="text-xs ml-2 shrink-0">{b.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Quick Actions</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label:"Book a Lounge",  href:"/lounges",    icon: Building2 },
                { label:"My Membership",  href:"/membership", icon: CreditCard },
                { label:"E-Passes",       href:"/epasses",    icon: Ticket },
                { label:"View History",   href:"/bookings",   icon: Calendar },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                    <Icon className="h-5 w-5 text-brand-500" />
                    <span className="text-xs">{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
