"use client";
import { Menu, Bell, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme }    from "next-themes";
import { usePathname } from "next/navigation";
import Link            from "next/link";
import { useUIStore }   from "@/stores/ui.store";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { initials } from "@/utils/format";

const LABEL: Record<string, string> = {
  dashboard: "Dashboard", membership: "Membership", epasses: "E-Passes",
  lounges: "Lounges", bookings: "Bookings", profile: "Profile",
  activity: "Activity Log", admin: "Admin",
};

function Breadcrumbs() {
  const parts = usePathname().split("/").filter(Boolean);
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link href="/dashboard" className="hover:text-foreground transition-colors">Home</Link>
      {parts.map((p, i) => (
        <span key={p} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={i === parts.length - 1 ? "text-foreground font-medium" : ""}>
            {LABEL[p] || p}
          </span>
        </span>
      ))}
    </nav>
  );
}

export function Header() {
  const { toggleSidebar } = useUIStore();
  const { user }          = useAuthStore();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-background/80 backdrop-blur-sm px-4 gap-4">
      <button onClick={toggleSidebar}
        className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted transition-colors">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0"><Breadcrumbs /></div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-transform" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-transform" />
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-500" />
        </Button>

        {user && (
          <Link href="/profile">
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-brand-500 transition-all">
              <AvatarImage src={user.avatar_url ?? undefined} />
              <AvatarFallback className="bg-brand-100 text-brand-700 text-xs font-bold">
                {initials(user)}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </header>
  );
}
