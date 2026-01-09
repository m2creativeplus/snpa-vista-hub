"use client";

import { Activity, ShieldCheck, TrendingUp, AlertOctagon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetRadar } from "@/components/intelligence/BudgetRadar";
import { SecurityPulse } from "@/components/intelligence/SecurityPulse";
import { MinistryLeaderboard } from "@/components/intelligence/MinistryLeaderboard";
import { ministries } from "@/data/ministries";

export default function IntelligenceDashboard() {
  // Aggregate Stats
  const totalMarket = ministries.reduce((acc, m) => acc + m.budget.q1_allocation, 0);
  const totalSpent = ministries.reduce((acc, m) => acc + m.budget.q1_spent, 0);
  const activeAgencies = ministries.length;
  const criticalAgencies = ministries.filter(m => (m.budget.q1_spent / m.budget.q1_allocation) > 0.9).length;

  return (
    <div className="space-y-6">
      {/* 1. Executive Summary Strip */}
      <h1 className="text-3xl font-display font-bold text-snpa-primary">Director General Intelligence</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Q1 Market</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMarket.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Allocated across {activeAgencies} MDAs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Captured Revenue</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalSpent / totalMarket) * 100)}% of Total Market Captured
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">DEFCON 4</div>
            <p className="text-xs text-muted-foreground">Normal Operations. 98% Compliance.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Budget Alerts</CardTitle>
            <AlertOctagon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAgencies}</div>
            <p className="text-xs text-muted-foreground">MDAs &gt;90% of budget spent.</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Main Visualization Layer */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="col-span-4">
            <BudgetRadar />
        </div>
        <div className="col-span-3">
            <SecurityPulse />
        </div>
      </div>

      {/* 3. Detailed Data View */}
      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leaderboard">Ministry Leaderboard</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
          <TabsTrigger value="reports">Audit Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="space-y-4">
          <MinistryLeaderboard />
        </TabsContent>
        <TabsContent value="products">
          <Card>
            <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">Product analytics module pending integration with Production Logs.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
            <Card>
            <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">Audit logs requires Admin Level 1 Clearance.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
