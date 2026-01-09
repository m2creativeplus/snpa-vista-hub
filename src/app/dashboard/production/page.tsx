"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { JobCard } from "@/components/production/JobCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Factory, Clock, Search, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const COLUMNS = [
  { id: "pending", title: "📋 Pending", icon: Clock, color: "border-yellow-400" },
  { id: "in_progress", title: "🔧 In Progress", icon: Loader2, color: "border-blue-400" },
  { id: "quality_check", title: "🔍 Quality Check", icon: Search, color: "border-orange-400" },
  { id: "complete", title: "✅ Complete", icon: CheckCircle2, color: "border-green-400" },
];

export default function ProductionPage() {
  const jobs = useQuery(api.production.getJobsByStatus);
  const updateStatus = useMutation(api.production.updateJobStatus);
  const [draggedJobId, setDraggedJobId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, jobId: string) => {
    setDraggedJobId(jobId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (!draggedJobId) return;

    try {
      await updateStatus({
        jobId: draggedJobId as Id<"printJobs">,
        newStatus,
      });
      toast.success(`Job moved to ${newStatus.replace("_", " ")}`);
    } catch (error) {
      toast.error("Failed to update job status");
    }
    setDraggedJobId(null);
  };

  if (!jobs) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-snpa-primary/10 rounded-lg">
            <Factory className="w-6 h-6 text-snpa-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-snpa-primary">
              Production Floor
            </h1>
            <p className="text-muted-foreground">
              Drag and drop jobs to update their status
            </p>
          </div>
        </div>
        <Button className="bg-snpa-primary hover:bg-snpa-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Job
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((column) => {
          const columnJobs = (jobs as any)[column.id] || [];
          return (
            <Card
              key={column.id}
              className={`border-t-4 ${column.color} bg-muted/30`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span>{column.title}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {columnJobs.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-3">
                    {columnJobs.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                        Drop jobs here
                      </div>
                    ) : (
                      columnJobs.map((job: any) => (
                        <JobCard
                          key={job._id}
                          job={job}
                          onDragStart={handleDragStart}
                        />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
