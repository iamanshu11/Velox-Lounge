"use client";
import { useEffect, useState } from "react";
import { epassService } from "@/services/epass";
import type { EPass } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/common/Spinner";
import { toast }  from "@/hooks/use-toast";
import { Ticket, Copy, X, Loader2 } from "lucide-react";
import { formatDate } from "@/utils/format";

const statusV: Record<string, any> = { ACTIVE:"success", USED:"secondary", EXPIRED:"destructive", CANCELLED:"destructive" };

export default function EPassesPage() {
  const [passes,     setPasses]    = useState<EPass[]>([]);
  const [loading,    setLoading]   = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    epassService.getAll().then(r => setPasses(r.data.data?.items ?? [])).finally(() => setLoading(false));
  }, []);

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: "Pass code copied to clipboard." });
  };

  const cancel = async (id: string) => {
    setCancelling(id);
    try {
      const r = await epassService.cancel(id);
      setPasses(prev => prev.map(p => p.id === id ? r.data.data! : p));
      toast({ title: "E-Pass cancelled" });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    } finally { setCancelling(null); }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">E-Passes</h1>
        <p className="text-muted-foreground text-sm mt-1">Your digital lounge access passes</p>
      </div>

      {passes.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-16 text-muted-foreground">
          <Ticket className="h-12 w-12 mb-4 opacity-30" />
          <p className="font-medium text-foreground">No E-Passes yet</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {passes.map(p => (
            <Card key={p.id} className="overflow-hidden">
              <div className={`h-1.5 ${p.status === "ACTIVE" ? "bg-brand-500" : "bg-muted"}`} />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-semibold truncate">{p.pass_code}</p>
                    {p.lounge_name && <p className="text-xs text-muted-foreground mt-0.5 truncate">{p.lounge_name}</p>}
                  </div>
                  <Badge variant={statusV[p.status]}>{p.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-muted-foreground">Valid From</p><p className="font-medium">{formatDate(p.valid_from)}</p></div>
                  <div><p className="text-muted-foreground">Valid Until</p><p className="font-medium">{formatDate(p.valid_until)}</p></div>
                  <div><p className="text-muted-foreground">Guests</p><p className="font-medium">{p.guest_count}/{p.max_guests}</p></div>
                  {p.used_at && <div><p className="text-muted-foreground">Used</p><p className="font-medium">{formatDate(p.used_at)}</p></div>}
                </div>
                {p.status === "ACTIVE" && (
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => copy(p.pass_code)}>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"
                      onClick={() => cancel(p.id)} disabled={cancelling === p.id}>
                      {cancelling === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
