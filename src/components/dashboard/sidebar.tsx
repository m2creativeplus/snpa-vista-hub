"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Users,
  Building2,
  Calculator,
  BarChart3,
  Globe,
  FileText,
  Settings,
  Package,
  Droplets,
  ClipboardCheck,
  Truck,
  TrendingUp,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Professional Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
  { name: "Product Catalog 2025", href: "/dashboard/catalog", icon: BookOpen },
  { name: "Client Portfolio", href: "/dashboard/clients", icon: Users },
  { name: "Taiwan Partnership 202", href: "/dashboard/taiwan", icon: Building2 },
  { name: "Dahabshiil Quote 2026", href: "/dashboard/quotes/dahabshiil", icon: FileText },
  { name: "Promo Quote Analyzer", href: "/dashboard/promo", icon: BarChart3 },
  { name: "Smart Pricing Calculator", href: "/dashboard/pricing", icon: Calculator },
  { name: "Procurement Intelligence", href: "/dashboard/procurement", icon: TrendingUp },
  { name: "Freight Calculator 2026", href: "/dashboard/freight", icon: Truck },
  { name: "Somtuna Catalog 2026", href: "/dashboard/somtuna", icon: Package },
  { name: "Global MOQ Standards", href: "/dashboard/moq", icon: Globe },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1A3A1A] border-r border-[#2A4A2A]">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-[#2A4A2A]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CFA93F] to-[#A08030] flex items-center justify-center shadow-lg">
          <span className="text-[#1A3A1A] font-bold text-xl">W</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-white text-lg tracking-wide">WAKAALADDA</h1>
          <h2 className="font-display font-bold text-white text-lg tracking-wide -mt-1">MADBACADDA</h2>
          <p className="text-xs text-emerald-300/70">Republic of Somaliland</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 py-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#CFA93F] text-[#1A3A1A] shadow-md"
                  : "text-emerald-100/80 hover:bg-[#2A4A2A] hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-[#1A3A1A]" : "text-emerald-300")} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2A4A2A]">
        <div className="flex items-center gap-2 text-xs text-emerald-300/60">
          <Shield className="w-4 h-4" />
          <div>
            <p className="font-medium">SNPA Digital Platform v2.1</p>
            <p>262-2-123456 | info@snpa.gov.sl</p>
          </div>
        </div>
        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
        </div>
      </div>
    </aside>
  );
}
