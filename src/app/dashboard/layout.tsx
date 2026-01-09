import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212]">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
