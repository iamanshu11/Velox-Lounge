"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, CreditCard, Ticket, Building2,
  Calendar, User, Activity, ShieldCheck, LogOut,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useUIStore }   from "@/stores/ui.store";
import { useAuthStore } from "@/stores/auth.store";
import { authService }  from "@/services/auth";

const NAV = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { href: "/membership", label: "Membership", icon: CreditCard },
  { href: "/epasses",    label: "E-Passes",   icon: Ticket },
  { href: "/lounges",    label: "Lounges",    icon: Building2 },
  { href: "/bookings",   label: "Bookings",   icon: Calendar },
  { href: "/profile",    label: "Profile",    icon: User },
  { href: "/activity",   label: "Activity",   icon: Activity },
];

const ADMIN_NAV = [
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, toggleSidebarCollapsed } = useUIStore();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try { await authService.getMe(); } catch { /* ignore */ }
    clearAuth();
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={cn(
        "fixed left-0 top-0 z-30 flex h-full flex-col bg-card border-r border-border transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div
          className={cn(
            "shrink-0 border-b border-border",
            sidebarCollapsed
              ? "flex flex-col items-center gap-2 px-2 py-3"
              : "flex h-16 items-center gap-2 px-4"
          )}
        >
          <Link
            href="/dashboard"
            className={cn(
              "flex min-w-0 items-center",
              sidebarCollapsed ? "justify-center" : "flex-1"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            {sidebarCollapsed ? (
              <img
                src="/fav.png"
                alt="LoungePass"
                className="h-12 w-12 shrink-0 object-contain"
              />
            ) : (
              <img
                src="/logo.png"
                alt="LoungePass"
                className="h-16 w-auto max-w-[12rem] object-contain object-left"
              />
            )}
          </Link>
          <button
            type="button"
            onClick={toggleSidebarCollapsed}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "hidden lg:flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
              !sidebarCollapsed && "ml-auto"
            )}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={cn(
              "flex items-center gap-3 rounded-md py-2.5 text-sm font-medium transition-colors",
              sidebarCollapsed ? "justify-center px-2" : "px-3",
              isActive(href) ? "bg-brand-500 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{label}</span>}
            </Link>
          ))}

          {user?.role === "ADMIN" && (
            <>
              {!sidebarCollapsed && (
                <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admin</p>
              )}
              {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={cn(
                  "flex items-center gap-3 rounded-md py-2.5 text-sm font-medium transition-colors",
                  sidebarCollapsed ? "justify-center px-2" : "px-3",
                  isActive(href) ? "bg-brand-500 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                  <Icon className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{label}</span>}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-2">
          <button onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-md py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              sidebarCollapsed ? "justify-center px-2" : "px-3"
            )}>
            <LogOut className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
