"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Factory, Settings, Image, ClipboardList, Users, BarChart3, ArrowRight } from "lucide-react";

export default function OperationsPortalPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 text-white py-4 px-6 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-snpa-primary rounded flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold">SNPA Operations Center</h1>
              <p className="text-xs text-slate-400">Staff & Production Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Ahmed Hassan (Admin)</span>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-white">
            Operations Dashboard
          </h2>
          <p className="text-slate-400 mt-2">
            Manage production, content, and system administration.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400">Jobs In Queue</p>
              <p className="text-2xl font-bold text-white">12</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-400">5</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-green-400">$4,230</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400">Active Staff</p>
              <p className="text-2xl font-bold text-blue-400">8</p>
            </CardContent>
          </Card>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700 hover:border-snpa-primary transition-colors">
            <CardHeader>
              <Factory className="w-10 h-10 text-snpa-primary mb-2" />
              <CardTitle className="text-white">Production Floor</CardTitle>
              <CardDescription className="text-slate-400">
                Kanban board for job management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/production">
                <Button className="w-full bg-snpa-primary">
                  Open Kanban <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <ClipboardList className="w-10 h-10 text-blue-500 mb-2" />
              <CardTitle className="text-white">Order Management</CardTitle>
              <CardDescription className="text-slate-400">
                View and process requisitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/orders">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  View Orders <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
            <CardHeader>
              <Settings className="w-10 h-10 text-purple-500 mb-2" />
              <CardTitle className="text-white">Content Ops (CMS)</CardTitle>
              <CardDescription className="text-slate-400">
                Manage site content and bulk uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/cms">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  Open CMS <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-colors">
            <CardHeader>
              <Image className="w-10 h-10 text-orange-500 mb-2" />
              <CardTitle className="text-white">Media Library</CardTitle>
              <CardDescription className="text-slate-400">
                Upload and manage assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/media">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  Browse Media <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-green-500 transition-colors">
            <CardHeader>
              <BarChart3 className="w-10 h-10 text-green-500 mb-2" />
              <CardTitle className="text-white">Analytics</CardTitle>
              <CardDescription className="text-slate-400">
                Budget tracking and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/intelligence">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  View Reports <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-red-500 transition-colors">
            <CardHeader>
              <Users className="w-10 h-10 text-red-500 mb-2" />
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-slate-400">
                Staff roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
