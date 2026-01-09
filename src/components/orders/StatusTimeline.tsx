"use client";

import { CheckCircle2, Circle, Clock, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusTimelineProps {
  currentStatus: string;
}

const STATUSES = [
  { id: "pending_approval", label: "Submitted", icon: Clock },
  { id: "approved", label: "Approved", icon: CheckCircle2 },
  { id: "in_production", label: "In Production", icon: Package },
  { id: "delivered", label: "Delivered", icon: Truck },
];

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = STATUSES.findIndex((s) => s.id === currentStatus);

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
      {STATUSES.map((status, index) => {
        const Icon = status.icon;
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={status.id} className="flex flex-col items-center relative flex-1">
            {/* Connector line */}
            {index < STATUSES.length - 1 && (
              <div
                className={cn(
                  "absolute top-5 left-1/2 w-full h-1 -z-10",
                  index < currentIndex ? "bg-green-500" : "bg-muted"
                )}
              />
            )}

            {/* Icon circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                isComplete
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-background border-muted text-muted-foreground",
                isCurrent && "ring-4 ring-green-200"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-xs mt-2 text-center",
                isComplete ? "text-green-600 font-medium" : "text-muted-foreground"
              )}
            >
              {status.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
