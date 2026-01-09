"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Settings, 
  Printer, 
  BarChart3, 
  Package,
  LineChart 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Start Here", href: "/dashboard", icon: LayoutDashboard },
  { type: "divider", label: "Gov Intelligence" },
  { name: "Security Audit", href: "/dashboard/security-audit", icon: ShieldCheck, alert: true },
  { name: "Budget Guard", href: "/dashboard/budget", icon: BarChart3 },
  { name: "National Assets", href: "/dashboard/assets", icon: FileText },
  { type: "divider", label: "Commercial Ops" },
  { name: "Procurement", href: "/dashboard/shop", icon: Briefcase },
  { name: "Production", href: "/dashboard/production", icon: Printer },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { type: "divider", label: "System Admin" },
  { name: "Content Ops", href: "/dashboard/cms", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-[#1B5E20] text-white flex flex-col fixed md:relative hidden md:flex">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <span className="font-bold text-xl">SL</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">SNPA Focus</h1>
            <p className="text-xs text-white/60">Gov.Somaliland</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i} className="pt-4 pb-2 px-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            );
          }

          const Icon = item.icon!;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-[#1B5E20]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
              {item.alert && (
                <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Director General</p>
            <p className="text-xs text-white/60 truncate">admin@snpa.govs.so</p>
          </div>
          <Settings className="w-4 h-4 text-white/60 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
}
