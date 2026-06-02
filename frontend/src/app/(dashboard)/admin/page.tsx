"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/common/Spinner";
import { Users, CreditCard, Calendar, Ticket, Shield } from "lucide-react";
import { formatDate } from "@/utils/format";

interface Stats {
  totalUsers: number; activeMembers: number; totalBookings: number; totalEPasses: number;
  recentUsers: { id:string; first_name:string; last_name:string; email:string; role:string; created_at:string }[];
}

export default function AdminPage() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats").then(r => setStats(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-brand-500" />
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">Platform overview</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label:"Total Users",    value: stats?.totalUsers,    icon: Users },
          { label:"Active Members", value: stats?.activeMembers, icon: CreditCard },
          { label:"Total Bookings", value: stats?.totalBookings, icon: Calendar },
          { label:"Total E-Passes", value: stats?.totalEPasses,  icon: Ticket },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-3xl font-bold mt-1">{value ?? 0}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent Users</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {stats?.recentUsers.map(u => (
              <div key={u.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{u.first_name} {u.last_name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={u.role === "ADMIN" ? "default" : "secondary"} className="text-xs">{u.role}</Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(u.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
