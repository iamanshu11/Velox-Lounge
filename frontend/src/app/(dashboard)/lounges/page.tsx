"use client";
import { useEffect, useState } from "react";
import { loungeService }  from "@/services/lounge";
import { bookingService } from "@/services/booking";
import type { Lounge } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { PageLoader } from "@/components/common/Spinner";
import { toast }  from "@/hooks/use-toast";
import { Building2, Search, MapPin, Users, X, Loader2 } from "lucide-react";

export default function LoungesPage() {
  const [lounges,  setLounges]  = useState<Lounge[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [booking,  setBooking]  = useState<string | null>(null);

  const load = (q = "") => {
    setLoading(true);
    loungeService.getAll({ search: q, limit: 12 })
      .then(r => setLounges(r.data.data?.items ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleBook = async (loungeId: string) => {
    setBooking(loungeId);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await bookingService.create({ loungeId, visitDate: tomorrow.toISOString().split("T")[0], guestCount: 0 });
      toast({ title: "Booking confirmed!", description: "Your lounge visit has been booked." });
    } catch (err: any) {
      toast({ title: "Booking failed", description: err?.response?.data?.error || "Please try again", variant: "destructive" });
    } finally { setBooking(null); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Airport Lounges</h1>
        <p className="text-muted-foreground text-sm mt-1">Browse and book premium lounges worldwide</p>
      </div>

      <form onSubmit={e => { e.preventDefault(); load(search); }} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, airport code, or country..." value={search}
            onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button type="submit">Search</Button>
        {search && <Button type="button" variant="ghost" onClick={() => { setSearch(""); load(); }}><X className="h-4 w-4" /></Button>}
      </form>

      {loading ? <PageLoader /> : lounges.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-16 text-muted-foreground">
          <Building2 className="h-12 w-12 mb-4 opacity-30" />
          <p className="font-medium text-foreground">No lounges found</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lounges.map(l => (
            <Card key={l.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-20 bg-gradient-to-br from-brand-500/10 to-brand-700/5 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-brand-500/40" />
              </div>
              <CardContent className="p-5 space-y-3">
                <div>
                  <h3 className="font-semibold leading-tight">{l.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{l.airport_code} · {l.terminal || "Terminal"} · {l.country}</span>
                  </div>
                </div>
                {l.description && <p className="text-xs text-muted-foreground line-clamp-2">{l.description}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {l.amenities.slice(0, 4).map(a => <Badge key={a} variant="secondary" className="text-xs py-0.5 px-2">{a}</Badge>)}
                  {l.amenities.length > 4 && <Badge variant="outline" className="text-xs">+{l.amenities.length - 4}</Badge>}
                </div>
                {l.capacity && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" /> Capacity: {l.capacity}
                  </div>
                )}
                <Button size="sm" className="w-full" onClick={() => handleBook(l.id)} disabled={booking === l.id}>
                  {booking === l.id ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Booking...</> : "Book Visit"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
