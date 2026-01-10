"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ShoppingCart, FileText, Clock, ArrowRight } from "lucide-react";

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-snpa-primary/5 to-white">
      {/* Header */}
      <header className="bg-snpa-primary text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
              <span className="font-bold">SL</span>
            </div>
            <div>
              <h1 className="font-bold">SNPA Customer Portal</h1>
              <p className="text-xs text-white/70">Ministry Procurement Gateway</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-snpa-primary">
            Welcome, Ministry of Finance
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage your stationery requisitions and track order status.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="text-sm text-green-600">Budget Remaining</p>
              <p className="text-2xl font-bold text-green-700">$45,230</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-600">Active Orders</p>
              <p className="text-2xl font-bold text-blue-700">3</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <p className="text-sm text-yellow-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-700">1</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <p className="text-sm text-purple-600">This Quarter</p>
              <p className="text-2xl font-bold text-purple-700">$12,450</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <ShoppingCart className="w-10 h-10 text-snpa-primary mb-2" />
              <CardTitle>New Requisition</CardTitle>
              <CardDescription>
                Browse the catalog and submit a new print order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/products">
                <Button className="w-full bg-snpa-primary">
                  Start Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Clock className="w-10 h-10 text-blue-600 mb-2" />
              <CardTitle>Track Orders</CardTitle>
              <CardDescription>
                View status of your active and past orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portal/orders">
                <Button variant="outline" className="w-full">
                  View Orders <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <FileText className="w-10 h-10 text-purple-600 mb-2" />
              <CardTitle>Asset Library</CardTitle>
              <CardDescription>
                Download official letterheads and templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portal/assets">
                <Button variant="outline" className="w-full">
                  Browse Assets <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
