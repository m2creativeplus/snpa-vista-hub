"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ministries } from "@/data/ministries";

export function MinistryLeaderboard() {
  const sortedMinistries = [...ministries]
    .sort((a, b) => b.budget.q1_spent - a.budget.q1_spent)
    .slice(0, 10);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>MDA Code</TableHead>
            <TableHead>Agency Name</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Spent (Q1)</TableHead>
            <TableHead className="text-right">Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMinistries.map((m) => {
             const usage = (m.budget.q1_spent / m.budget.q1_allocation) * 100;
             let statusColor = "bg-green-100 text-green-700";
             if (usage > 80) statusColor = "bg-orange-100 text-orange-700";
             if (usage > 95) statusColor = "bg-red-100 text-red-700";

             return (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.code}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{m.tier}</Badge>
                </TableCell>
                <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                        {Math.round(usage)}% Utilized
                    </span>
                </TableCell>
                <TableCell className="text-right font-mono">${m.budget.q1_spent.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">${m.budget.q1_allocation.toLocaleString()}</TableCell>
              </TableRow>
             );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
