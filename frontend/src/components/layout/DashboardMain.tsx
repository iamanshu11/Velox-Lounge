"use client";

import { Header } from "@/components/layout/Header";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/utils/cn";

export function DashboardMain({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);

  return (
    <div
      className={cn(
        "transition-[padding] duration-300 ease-in-out",
        sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
      )}
    >
      <Header />
      <main className="p-6 animate-fade-in">{children}</main>
    </div>
  );
}
