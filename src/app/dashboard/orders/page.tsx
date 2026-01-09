"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { StatusTimeline } from "@/components/orders/StatusTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Loader2, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const statusColors: Record<string, string> = {
  pending_approval: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  in_production: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export default function OrdersPage() {
  const requisitions = useQuery(api.requisitions.getRequisitions);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!requisitions) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-snpa-primary/10 rounded-lg">
          <ClipboardList className="w-6 h-6 text-snpa-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-snpa-primary">
            Order Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your ministry's print requisitions in real-time
          </p>
        </div>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Requisitions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {requisitions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No requisitions found</p>
                </div>
              ) : (
                requisitions.map((req: any) => (
                  <Collapsible
                    key={req._id}
                    open={expandedOrder === req._id}
                    onOpenChange={() =>
                      setExpandedOrder(expandedOrder === req._id ? null : req._id)
                    }
                  >
                    <Card className="border">
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-mono text-sm text-muted-foreground">
                                  REQ-{req._id.slice(-6).toUpperCase()}
                                </p>
                                <p className="font-semibold">
                                  {req.items?.length || 0} item(s) • $
                                  {req.totalAmount?.toLocaleString() || 0}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                className={
                                  statusColors[req.status] || "bg-gray-100"
                                }
                              >
                                {req.status?.replace("_", " ")}
                              </Badge>
                              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform data-[state=open]:rotate-180" />
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="border-t pt-6 space-y-6">
                          {/* Status Timeline */}
                          <div className="py-4">
                            <StatusTimeline currentStatus={req.status} />
                          </div>

                          {/* Items Table */}
                          <div>
                            <h4 className="font-medium mb-2">Order Items</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-right">Qty</TableHead>
                                  <TableHead className="text-right">Unit Price</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {req.items?.map((item: any, i: number) => (
                                  <TableRow key={i}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">
                                      {item.quantity?.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      ${item.unitPrice?.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                      ${item.total?.toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
