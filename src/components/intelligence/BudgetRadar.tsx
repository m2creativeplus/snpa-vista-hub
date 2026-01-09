"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ministries } from "@/data/ministries";

export function BudgetRadar() {
  // Transform Data for Charts
  const burnRateData = ministries.map(m => ({
    name: m.code,
    Spent: m.budget.q1_spent,
    Remaining: m.budget.q1_remaining,
    Limit: m.budget.q1_allocation,
  })).sort((a, b) => b.Limit - a.Limit).slice(0, 5); // Top 5

  const COLORS = ['#1B5E20', '#CFA93F', '#FF8042', '#0088FE', '#8884d8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Budget Burn Rate (Bar Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Q1 Budget Utilization (Top 5)</CardTitle>
          <CardDescription>Comparing allocated limits vs actual spend.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={burnRateData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={50} tick={{fontSize: 12}} />
              <Tooltip 
                formatter={(value: number | undefined) => [`$${(value || 0).toLocaleString()}`, ""]}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="Spent" stackId="a" fill="#CFA93F" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Remaining" stackId="a" fill="#1B5E20" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 2. Portfolio Distribution (Pie Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Spend by Ministry</CardTitle>
          <CardDescription>Proportional breakdown of Q1 expenditure.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={burnRateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="Spent"
              >
                {burnRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | undefined) => `$${(value || 0).toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
