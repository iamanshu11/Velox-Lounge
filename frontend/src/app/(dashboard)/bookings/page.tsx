"use client";
import { useEffect, useState } from "react";
import { bookingService } from "@/services/booking";
import type { Booking } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/common/Spinner";
import { toast }  from "@/hooks/use-toast";
import { Calendar, MapPin, Hash, Users, Plane, Loader2 } from "lucide-react";
import { formatDate, formatDateTime } from "@/utils/format";

const statusV: Record<string, any> = { PENDING:"warning", CONFIRMED:"success", CHECKED_IN:"info", COMPLETED:"secondary", CANCELLED:"destructive", NO_SHOW:"destructive" };

export default function BookingsPage() {
  const [bookings,   setBookings]   = useState<Booking[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [page,       setPage]       = useState(1);
  const [total,      setTotal]      = useState(0);
  const LIMIT = 10;

  const load = (p = 1) => {
    setLoading(true);
    bookingService.getAll({ page: p, limit: LIMIT })
      .then(r => { setBookings(r.data.data?.items ?? []); setTotal(r.data.data?.total ?? 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const cancel = async (id: string) => {
    setCancelling(id);
    try {
      const r = await bookingService.cancel(id);
      setBookings(prev => prev.map(b => b.id === id ? r.data.data! : b));
      toast({ title: "Booking cancelled" });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    } finally { setCancelling(null); }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Booking History</h1>
        <p className="text-muted-foreground text-sm mt-1">All your lounge visit bookings</p>
      </div>

      {loading ? <PageLoader /> : bookings.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-16 text-muted-foreground">
          <Calendar className="h-12 w-12 mb-4 opacity-30" />
          <p className="font-medium text-foreground">No bookings yet</p>
        </CardContent></Card>
      ) : (
        <>
          <div className="space-y-4">
            {bookings.map(b => {
              const lounge = (b as any).lounge;
              return (
                <Card key={b.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{lounge?.name || "Lounge"}</h3>
                          <Badge variant={statusV[b.status] ?? "secondary"}>{b.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Hash className="h-3 w-3" />{b.booking_ref}</span>
                          {lounge && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{lounge.airport_code} · {lounge.terminal}</span>}
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(b.visit_date)}</span>
                          {b.guest_count > 0 && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{b.guest_count} guest{b.guest_count > 1 ? "s" : ""}</span>}
                          {b.flight_number && <span className="flex items-center gap-1"><Plane className="h-3 w-3" />{b.flight_number}</span>}
                        </div>
                        {b.checkin_time && <p className="text-xs text-muted-foreground">Check-in: <span className="text-foreground">{formatDateTime(b.checkin_time)}</span></p>}
                      </div>
                      {["PENDING","CONFIRMED"].includes(b.status) && (
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive shrink-0" onClick={() => cancel(b.id)} disabled={cancelling === b.id}>
                          {cancelling === b.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cancel"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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
