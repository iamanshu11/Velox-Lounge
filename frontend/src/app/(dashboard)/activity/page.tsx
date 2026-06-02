"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import type { ActivityLog } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/common/Spinner";
import { Activity, LogIn, LogOut, User, Lock, CreditCard, Ticket, Building2, Calendar, Shield } from "lucide-react";
import { formatDateTime } from "@/utils/format";

const CONFIG: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  LOGIN:                { icon:LogIn,     color:"text-green-500",  label:"Login"      },
  LOGOUT:               { icon:LogOut,    color:"text-slate-500",  label:"Logout"     },
  PROFILE_UPDATE:       { icon:User,      color:"text-blue-500",   label:"Profile"    },
  PASSWORD_CHANGE:      { icon:Lock,      color:"text-orange-500", label:"Security"   },
  MEMBERSHIP_ACTIVATED: { icon:CreditCard,color:"text-brand-500",  label:"Membership" },
  MEMBERSHIP_RENEWED:   { icon:CreditCard,color:"text-brand-500",  label:"Membership" },
  EPASS_CREATED:        { icon:Ticket,    color:"text-purple-500", label:"E-Pass"     },
  EPASS_USED:           { icon:Ticket,    color:"text-purple-500", label:"E-Pass"     },
  LOUNGE_BOOKED:        { icon:Building2, color:"text-indigo-500", label:"Booking"    },
  LOUNGE_CHECKED_IN:    { icon:Calendar,  color:"text-teal-500",   label:"Check-in"   },
  LOUNGE_COMPLETED:     { icon:Calendar,  color:"text-green-500",  label:"Visit"      },
  ADMIN_ACTION:         { icon:Shield,    color:"text-red-500",    label:"Admin"      },
};

export default function ActivityPage() {
  const [logs,  setLogs]  = useState<ActivityLog[]>([]);
  const [loading,setLoading] = useState(true);
  const [page,  setPage]  = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 20;

  const load = (p = 1) => {
    setLoading(true);
    api.get(`/activity?page=${p}&limit=${LIMIT}`)
      .then(r => { setLogs(r.data.data?.items ?? []); setTotal(r.data.data?.total ?? 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <p className="text-muted-foreground text-sm mt-1">All actions on your account</p>
      </div>

      {loading ? <PageLoader /> : logs.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-16 text-muted-foreground">
          <Activity className="h-12 w-12 mb-4 opacity-30" />
          <p className="font-medium text-foreground">No activity yet</p>
        </CardContent></Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {logs.map(log => {
                  const c = CONFIG[log.type] || { icon: Activity, color: "text-muted-foreground", label: log.type };
                  const Icon = c.icon;
                  return (
                    <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors">
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted ${c.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{log.description}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDateTime(log.created_at)}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">{c.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
