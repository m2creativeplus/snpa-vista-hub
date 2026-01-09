"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";

interface JobCardProps {
  job: {
    _id: Id<"printJobs">;
    jobNumber: string;
    jobName: string;
    quantity: number;
    priority: string;
    deadline: string;
    status: string;
  };
  onDragStart: (e: React.DragEvent, jobId: string) => void;
}

export function JobCard({ job, onDragStart }: JobCardProps) {
  const priorityColors: Record<string, string> = {
    urgent: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    normal: "bg-blue-500 text-white",
    low: "bg-gray-400 text-white",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4 text-yellow-500" />,
    in_progress: <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />,
    quality_check: <AlertTriangle className="w-4 h-4 text-orange-500" />,
    complete: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  };

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, job._id)}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border-l-4 border-l-snpa-primary"
    >
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono">{job.jobNumber}</CardTitle>
          <Badge className={priorityColors[job.priority] || "bg-gray-400"}>
            {job.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4 space-y-2">
        <p className="text-sm font-medium truncate">{job.jobName}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Qty: {job.quantity.toLocaleString()}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.deadline}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          {statusIcons[job.status]}
          <span className="capitalize">{job.status.replace("_", " ")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
