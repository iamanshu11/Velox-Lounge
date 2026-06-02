import { Sidebar }       from "@/components/layout/Sidebar";
import { DashboardMain } from "@/components/layout/DashboardMain";
import { AuthGuard }     from "@/components/common/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </AuthGuard>
  );
}
