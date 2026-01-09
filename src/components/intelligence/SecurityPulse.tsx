"use client";

import { AlertTriangle, ShieldAlert, BadgeDollarSign, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const MOCK_ALERTS = [
  {
    id: 1,
    type: "CRITICAL",
    message: "MoF Budget Exceeded (Iron Dome Block)",
    time: "2 mins ago",
    icon: Lock,
    color: "text-red-600 bg-red-100",
  },
  {
    id: 2,
    type: "WARNING",
    message: "Immigration Passport Stock Low (<500)",
    time: "15 mins ago",
    icon: ShieldAlert,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 3,
    type: "INFO",
    message: "MoE Textbook Order Approved ($450k)",
    time: "1 hour ago",
    icon: BadgeDollarSign,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 4,
    type: "WARNING",
    message: "Unverified Vendor Attempt - Ministry of Health",
    time: "3 hours ago",
    icon: AlertTriangle,
    color: "text-orange-600 bg-orange-100",
  },
];

export function SecurityPulse() {
  return (
    <Card className="h-full border-l-4 border-l-snpa-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Live Security Pulse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {MOCK_ALERTS.map((alert) => (
              <div key={alert.id} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className={`p-2 rounded-full h-fit ${alert.color}`}>
                  <alert.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{alert.type}</p>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
