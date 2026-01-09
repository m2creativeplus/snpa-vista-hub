"use client";

import { Check, X, Bell, Search, Filter, Printer, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

// Mock Data for "War Room"
const initialRequisitions = [
  { id: "REQ-2026-001", ministry: "Ministry of Health", item: "Vaccination Campaign Flyers", quantity: 15000, cost: 1250.00, requester: "Dr. Amira", status: "pending", date: "2 mins ago" },
  { id: "REQ-2026-002", ministry: "Ministry of Education", item: "Standard Business Cards", quantity: 500, cost: 75.00, requester: "Ahmed Ali", status: "pending", date: "15 mins ago" },
  { id: "REQ-2026-003", ministry: "Civil Service Commission", item: "Employee ID Badges (Secure)", quantity: 50, cost: 125.00, requester: "DG Khadra", status: "pending", date: "1 hour ago" },
  { id: "REQ-2026-004", ministry: "Ministry of Interior", item: "Police Vehicle Decals", quantity: 20, cost: 450.00, requester: "Col. Yassin", status: "approved", date: "Yesterday" },
];

export default function AdminDashboardPage() {
  const [requisitions, setRequisitions] = useState(initialRequisitions);

  const handleApprove = (id: string) => {
    setRequisitions(reqs => reqs.map(r => r.id === id ? { ...r, status: "approved" } : r));
    toast.success(`Requisition ${id} Approved by DG`);
  };

  const handleReject = (id: string) => {
    setRequisitions(reqs => reqs.map(r => r.id === id ? { ...r, status: "rejected" } : r));
    toast.error(`Requisition ${id} Rejected`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-slate-50 min-h-screen">
      
      {/* War Room Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white p-6 rounded-xl shadow-lg">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-red-600 hover:bg-red-700 border-none">DG EYES ONLY</Badge>
                <span className="text-slate-400 text-xs font-mono">SECURE CONNECTION</span>
            </div>
            <h1 className="text-3xl font-bold">The War Room</h1>
            <p className="text-slate-400">Director General Procurement Oversight Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <p className="text-sm font-bold">Hon. Director General</p>
                <p className="text-xs text-slate-400">Last login: Just now</p>
            </div>
            <Avatar className="h-12 w-12 border-2 border-snpa-gold">
                <AvatarFallback className="bg-snpa-primary text-white font-bold">DG</AvatarFallback>
            </Avatar>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-orange-600">{requisitions.filter(r => r.status === 'pending').length}</div>
                <p className="text-xs text-gray-400">Requisitions awaiting sign-off</p>
            </CardContent>
        </Card>
        <Card>
             <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Q1 Budget Velocity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-snpa-primary">$142,500</div>
                <p className="text-xs text-gray-400">Total approved spending this quarter</p>
            </CardContent>
        </Card>
        <Card>
             <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Ministry Compliance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-blue-600">98.2%</div>
                <p className="text-xs text-gray-400">Adhering to brand & budget specs</p>
            </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Incoming Requisitions</CardTitle>
                    <CardDescription>Live feed of requests from all Ministries</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                    <Button variant="outline" size="sm"><Printer className="w-4 h-4 mr-2" /> Export Report</Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Req ID</TableHead>
                        <TableHead>Ministry</TableHead>
                        <TableHead>Item Details</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requisitions.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell className="font-mono text-xs">{req.id}</TableCell>
                            <TableCell>
                                <div className="font-medium text-sm">{req.ministry}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1"><User className="w-3 h-3" /> {req.requester}</div>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-gray-900">{req.quantity.toLocaleString()} x</span> {req.item}
                            </TableCell>
                            <TableCell className="font-bold text-gray-900">
                                ${req.cost.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                {req.status === 'pending' && <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Pending</Badge>}
                                {req.status === 'approved' && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>}
                                {req.status === 'rejected' && <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>}
                            </TableCell>
                            <TableCell className="text-right">
                                {req.status === 'pending' ? (
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={() => handleReject(req.id)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700" onClick={() => handleApprove(req.id)}>
                                            <Check className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-400">Processed</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
