"use client";

import { 
  Search, 
  Bell, 
  MessageSquare, 
  Settings, 
  RefreshCw,
  User,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] px-6">
      <div className="flex items-center justify-between h-full">
        {/* Left: Title */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-muted-foreground bg-[#2A2A2A] px-2 py-1 rounded">AI</span>
          <h1 className="text-lg font-semibold text-white">SNPA Print Intelligence Dashboard</h1>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search jobs, batches, inventory..." 
              className="pl-10 bg-[#2A2A2A] border-[#3A3A3A] focus:border-[#CFA93F]"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
            <User className="w-4 h-4 mr-2" />
            Admin
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
          
          <div className="flex items-center gap-1 ml-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
