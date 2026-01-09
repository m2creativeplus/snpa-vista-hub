"use client";

import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Upload, 
  Calendar,
  Package,
  BarChart3,
  Droplets,
  ClipboardCheck,
  Eye,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data matching Figma design
const recentJobs = [
  { 
    id: "SNPA-PAP-A4-001", 
    name: "Ministry Forms", 
    client: "Education Ministry",
    size: "A4",
    priority: "High",
    status: "In Progress",
    progress: 75,
    deadline: "2025-02-15",
    cost: "$4 • A4 • Wood pulp"
  },
  { 
    id: "SNPA-PAP-A3-002", 
    name: "Certificate Booklets", 
    client: "Interior Ministry",
    size: "A3",
    priority: "Medium",
    status: "Pending",
    progress: 0,
    deadline: "2025-02-20",
    cost: "Custom"
  },
];

const isoScores = [
  { name: "ISO 9001", score: 94, target: 90 },
  { name: "ISO 12647", score: 87, target: 85 },
  { name: "ISO 14001", score: 91, target: 88 },
];

const pressColorLogs = [
  { time: "14:30", press: "#1", color: "Cyan", delta: "+0.2", status: "Pass" },
  { time: "14:15", press: "#2", color: "Magenta", delta: "+0.1", status: "Pass" },
  { time: "14:00", press: "#1", color: "Yellow", delta: "+2.1", status: "Fail" },
  { time: "13:45", press: "#3", color: "Black", delta: "-0.3", status: "Pass" },
];

const inkLevels = [
  { color: "Cyan", level: 75, status: "Good" },
  { color: "Magenta", level: 45, status: "Medium" },
  { color: "Yellow", level: 90, status: "Good" },
  { color: "Black", level: 25, status: "Low" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Row: System Dashboard Title + Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            ×
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold text-white">System Dashboard</h1>
            <p className="text-sm text-muted-foreground">Somaliland National Printing Agency Operations Center</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid - 3 Columns matching Figma */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Column 1: Print Job Orders */}
        <div className="col-span-4">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#CFA93F]" />
                  <CardTitle className="text-lg font-semibold">Print Job Orders</CardTitle>
                </div>
                <Button size="sm" className="bg-[#1A3A1A] hover:bg-[#2A4A2A] text-white">
                  <Plus className="w-4 h-4 mr-1" />
                  Quick Add
                </Button>
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="job-form" className="mt-4">
                <TabsList className="bg-[#2A2A2A]">
                  <TabsTrigger value="job-form">Job Form</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Job Form */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Job Name</Label>
                  <Input placeholder="Enter job name" className="bg-[#2A2A2A] border-[#3A3A3A]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Product Template</Label>
                  <Select>
                    <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                      <SelectValue placeholder="Select from database" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exercise-book">Exercise Book</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="forms">Forms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Client</Label>
                  <Select>
                    <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moe">Ministry of Education</SelectItem>
                      <SelectItem value="mof">Ministry of Finance</SelectItem>
                      <SelectItem value="moh">Ministry of Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Quantity</Label>
                  <Input type="number" defaultValue="1000" className="bg-[#2A2A2A] border-[#3A3A3A]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Size</Label>
                  <Select defaultValue="a4">
                    <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="a3">A3</SelectItem>
                      <SelectItem value="a5">A5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Paper</Label>
                  <Select defaultValue="80gsm">
                    <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="80gsm">80gsm</SelectItem>
                      <SelectItem value="100gsm">100gsm</SelectItem>
                      <SelectItem value="120gsm">120gsm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Color</Label>
                  <Select defaultValue="bw">
                    <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bw">B&W</SelectItem>
                      <SelectItem value="cmyk">CMYK</SelectItem>
                      <SelectItem value="spot">Spot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-[#3A3A3A]">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                <Button variant="outline" className="flex-1 border-[#3A3A3A]">
                  <Calendar className="w-4 h-4 mr-2" />
                  Deadline
                </Button>
                <Button className="bg-[#1A3A1A] hover:bg-[#2A4A2A] text-white">
                  Create Job
                </Button>
              </div>

              {/* Recent Jobs */}
              <div className="border-t border-[#2A2A2A] pt-4 mt-4 space-y-3">
                {recentJobs.map((job) => (
                  <div key={job.id} className="p-3 rounded-lg bg-[#2A2A2A] space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">{job.name}</h4>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            job.priority === "High" 
                              ? "bg-red-500/20 text-red-400" 
                              : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {job.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{job.size}</p>
                      </div>
                      <span className="text-xs font-mono text-[#CFA93F] bg-[#CFA93F]/10 px-2 py-1 rounded">
                        {job.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{job.client}</span>
                      <span>Due: {job.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        job.status === "In Progress" 
                          ? "bg-blue-500/20 text-blue-400" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {job.status}
                      </span>
                      <Progress value={job.progress} className="flex-1 h-1.5" />
                      <span className="text-xs text-muted-foreground">{job.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Est. Unit Cost: {job.cost}</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Packaging Module + Ink Usage */}
        <div className="col-span-4 space-y-6">
          {/* Packaging Module */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#CFA93F]" />
                <CardTitle className="text-lg font-semibold">Packaging Module</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Box Size Selector */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Box Size Selector</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Small", size: "20x15x10" },
                    { name: "Medium", size: "30x25x15", selected: true },
                    { name: "Large", size: "40x35x20" },
                  ].map((box) => (
                    <button
                      key={box.name}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        box.selected 
                          ? "border-[#CFA93F] bg-[#CFA93F]/10" 
                          : "border-[#3A3A3A] hover:border-[#4A4A4A]"
                      }`}
                    >
                      <Package className={`w-6 h-6 mx-auto mb-1 ${box.selected ? "text-[#CFA93F]" : "text-muted-foreground"}`} />
                      <p className={`text-sm font-medium ${box.selected ? "text-[#CFA93F]" : "text-white"}`}>{box.name}</p>
                      <p className="text-xs text-muted-foreground">{box.size}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Label Preview */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Label Preview</Label>
                <div className="h-32 rounded-lg border border-dashed border-[#3A3A3A] flex items-center justify-center bg-[#2A2A2A]">
                  <div className="text-center">
                    <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Label preview will appear here</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload Design
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ink Usage Tracker */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#CFA93F]" />
                <CardTitle className="text-lg font-semibold">Ink Usage Tracker</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {inkLevels.map((ink) => (
                <div key={ink.color} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: 
                        ink.color === "Cyan" ? "#00BCD4" :
                        ink.color === "Magenta" ? "#E91E63" :
                        ink.color === "Yellow" ? "#FFC107" : "#212121"
                    }}
                  />
                  <span className="w-20 text-sm text-white">{ink.color}</span>
                  <Progress 
                    value={ink.level} 
                    className="flex-1 h-2"
                    indicatorClassName={
                      ink.color === "Cyan" ? "bg-cyan-500" :
                      ink.color === "Magenta" ? "bg-pink-500" :
                      ink.color === "Yellow" ? "bg-yellow-500" : "bg-zinc-400"
                    }
                  />
                  <span className="w-10 text-sm text-right text-muted-foreground">{ink.level}%</span>
                  <span className={`w-16 text-xs px-2 py-0.5 rounded text-center ${
                    ink.status === "Good" ? "bg-emerald-500/20 text-emerald-400" :
                    ink.status === "Medium" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {ink.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Quality Control */}
        <div className="col-span-4">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#CFA93F]" />
                <CardTitle className="text-lg font-semibold">Quality Control</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ISO Calibration Scores */}
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground">ISO Calibration Scores</Label>
                {isoScores.map((iso) => (
                  <div key={iso.name} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-white">{iso.name}</span>
                    <Progress value={iso.score} className="flex-1 h-2" indicatorClassName="bg-[#CFA93F]" />
                    <span className={`text-sm font-medium ${
                      iso.score >= iso.target ? "text-emerald-400" : "text-amber-400"
                    }`}>
                      {iso.score}% (Target: {iso.target}%)
                    </span>
                  </div>
                ))}
              </div>

              {/* Press Color Logs */}
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground">Press Color Logs</Label>
                <div className="space-y-2">
                  {pressColorLogs.map((log, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm p-2 rounded bg-[#2A2A2A]">
                      <span className="text-muted-foreground w-12">{log.time}</span>
                      <span className="text-white w-16">Press {log.press}</span>
                      <span className="w-16" style={{
                        color: 
                          log.color === "Cyan" ? "#00BCD4" :
                          log.color === "Magenta" ? "#E91E63" :
                          log.color === "Yellow" ? "#FFC107" : "#9E9E9E"
                      }}>
                        {log.color}
                      </span>
                      <span className="text-muted-foreground w-12">{log.delta}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        log.status === "Pass" 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manual Log Upload */}
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground">Manual Log Upload</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-[#CFA93F] text-[#CFA93F] hover:bg-[#CFA93F]/10">
                    📋 2025 Full Catalog
                  </Button>
                  <Button variant="outline" className="border-[#CFA93F] text-[#CFA93F] hover:bg-[#CFA93F]/10">
                    📦 16 Products (2025)
                  </Button>
                </div>
                <div className="p-4 rounded-lg border border-dashed border-[#3A3A3A] text-center">
                  <p className="text-sm text-muted-foreground mb-2">Drop PDF/Image files here or click to browse</p>
                  <Button variant="outline" className="border-[#3A3A3A]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
