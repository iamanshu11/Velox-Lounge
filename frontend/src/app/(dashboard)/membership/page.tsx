"use client";
import { useEffect, useState } from "react";
import { membershipService } from "@/services/membership";
import type { Membership } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import { PageLoader } from "@/components/common/Spinner";
import { toast }  from "@/hooks/use-toast";
import { CreditCard, Shield, Star, Zap, Crown, CheckCircle, Loader2 } from "lucide-react";
import { formatDate, formatTier } from "@/utils/format";
import { cn } from "@/utils/cn";

const TIERS = [
  { id:"STANDARD", label:"Standard", icon:Shield, perks:["2 visits/year","1 guest","Basic access"] },
  { id:"PLUS",     label:"Plus",     icon:Star,   perks:["10 visits/year","1 guest","Priority queue"] },
  { id:"PREMIUM",  label:"Premium",  icon:Zap,    perks:["30 visits/year","2 guests","Spa access"] },
  { id:"ELITE",    label:"Elite",    icon:Crown,  perks:["Unlimited visits","3 guests","All perks"] },
];

export default function MembershipPage() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [activating, setActivating] = useState(false);
  const [memberId,   setMemberId]   = useState("");

  useEffect(() => {
    membershipService.get().then(r => setMembership(r.data.data ?? null)).finally(() => setLoading(false));
  }, []);

  const handleActivate = async () => {
    if (!memberId.trim()) return;
    setActivating(true);
    try {
      const r = await membershipService.activate(memberId.trim());
      setMembership(r.data.data!);
      toast({ title: "Membership activated!" });
    } catch (err: any) {
      toast({ title: "Activation failed", description: err?.response?.data?.error || "Invalid Member ID", variant: "destructive" });
    } finally { setActivating(false); }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Membership</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your DragonPass membership</p>
      </div>

      {membership ? (
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-brand-500 to-brand-700" />
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <CreditCard className="h-5 w-5 text-brand-500" />
                  <span className="font-semibold text-lg">{formatTier(membership.tier)} Membership</span>
                  <Badge variant={membership.status === "ACTIVE" ? "success" : "warning"}>{membership.status}</Badge>
                </div>
                {membership.dragonpass_member_id && (
                  <div><p className="text-xs text-muted-foreground">DragonPass Member ID</p>
                  <p className="font-mono text-sm font-medium">{membership.dragonpass_member_id}</p></div>
                )}
                <div className="flex gap-6 text-sm">
                  {membership.valid_from  && <div><p className="text-xs text-muted-foreground">Valid From</p><p className="font-medium">{formatDate(membership.valid_from)}</p></div>}
                  {membership.valid_until && <div><p className="text-xs text-muted-foreground">Valid Until</p><p className="font-medium">{formatDate(membership.valid_until)}</p></div>}
                </div>
              </div>
              <div className="bg-muted rounded-xl p-5 text-center min-w-[150px]">
                <p className="text-xs text-muted-foreground">Lounge Visits</p>
                <p className="text-4xl font-bold text-brand-500">{membership.lounge_visits_used}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {membership.lounge_visits_limit ? `of ${membership.lounge_visits_limit}` : "unlimited"}
                </p>
                {membership.lounge_visits_limit && (
                  <div className="mt-2 h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-brand-500" style={{ width:`${Math.min(100, (membership.lounge_visits_used / membership.lounge_visits_limit) * 100)}%` }} />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Activate Your Membership</CardTitle>
            <CardDescription>Enter your DragonPass Member ID to link your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>DragonPass Member ID</Label>
              <div className="flex gap-2">
                <Input placeholder="e.g. DP-2024-000123" value={memberId} onChange={e => setMemberId(e.target.value)} />
                <Button onClick={handleActivate} disabled={activating || !memberId.trim()}>
                  {activating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Activate"}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Find your Member ID on your DragonPass card or welcome email.</p>
          </CardContent>
        </Card>
      )}

      {/* Tier comparison */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Membership Tiers</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map(({ id, label, icon: Icon, perks }) => {
            const isCurrent = membership?.tier === id;
            return (
              <div key={id} className={cn("rounded-xl p-5 border-2 transition-all", isCurrent ? "border-brand-500 shadow-md" : "border-border hover:border-brand-300")}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20 mb-3">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold">{label}</h3>
                  {isCurrent && <Badge variant="brand" className="text-xs">Current</Badge>}
                </div>
                <ul className="space-y-1.5">
                  {perks.map(p => (
                    <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-brand-500 shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
