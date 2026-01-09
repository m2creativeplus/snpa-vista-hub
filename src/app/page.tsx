"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Phone, 
  Search, 
  ShoppingCart, 
  User, 
  Menu,
  ChevronRight,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { products } from "@/data/products";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {/* Search (Mobile Only, if needed, or already in global) - Global handles mobile search. */}
      
      <div className="flex flex-1 container mx-auto px-4 py-6 gap-8">
        
        {/* Left Sidebar (Catalog) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 flex items-center gap-2">
              <Menu className="w-4 h-4" />
              Product Catalog
            </div>
            <ScrollArea className="h-[calc(100vh-250px)]">
              <Accordion type="single" collapsible className="w-full">
                {products.map((category) => (
                  <AccordionItem key={category.id} value={category.id} className="border-b-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 hover:no-underline [&[data-state=open]]:bg-green-50 [&[data-state=open]]:text-snpa-primary">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-0">
                      <div className="bg-gray-50 border-t border-gray-100">
                        {category.subcategories.map((sub) => (
                          <Link 
                            key={sub.id} 
                            href={`/product/${sub.id}`}
                            className="block px-8 py-2 text-sm text-gray-600 hover:text-snpa-primary hover:bg-green-50 border-l-2 border-transparent hover:border-snpa-primary transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          
          {/* Promo Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 mb-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10 max-w-lg">
              <span className="inline-block px-3 py-1 bg-snpa-gold text-black text-xs font-bold rounded mb-4 uppercase tracking-wider">
                FY 2025 Allocation Active
              </span>
              <h2 className="text-3xl font-bold mb-4">Official Government Stationery Supply</h2>
              <p className="text-gray-300 mb-6">
                Secure printing services for Ministries, Agencies, and Departments. 
                Approved by the Auditor General.
              </p>
              <div className="flex gap-3">
                <Button className="bg-snpa-primary hover:bg-green-700 text-white font-bold border-0">
                  Start New Requisition
                </Button>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Check Budget Status
                </Button>
              </div>
            </div>
            {/* Abstract Pattern */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-snpa-primary rounded-full blur-3xl opacity-50" />
          </div>

          {/* Product Grid (Popular) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Frequently Ordered</h2>
              <Link href="/products" className="text-sm font-medium text-snpa-primary hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Product Card 1 */}
              <div className="group bg-white rounded-lg border border-gray-200 hover:border-snpa-primary transition-all hover:shadow-md cursor-pointer">
                <div className="h-40 bg-gray-100 rounded-t-lg relative overflow-hidden flex items-center justify-center text-gray-300">
                    <FileText className="w-12 h-12" />
                    <span className="absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">In Stock</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-snpa-primary">Standard Business Cards</h3>
                  <p className="text-xs text-gray-500 mb-4">from $0.02 / unit</p>
                  <Button size="sm" className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-snpa-primary">
                    Configure & Order
                  </Button>
                </div>
              </div>

               {/* Product Card 2 */}
              <div className="group bg-white rounded-lg border border-gray-200 hover:border-snpa-primary transition-all hover:shadow-md cursor-pointer">
                <div className="h-40 bg-gray-100 rounded-t-lg relative overflow-hidden flex items-center justify-center text-gray-300">
                    <FileText className="w-12 h-12" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-snpa-primary">Official Letterheads (A4)</h3>
                  <p className="text-xs text-gray-500 mb-4">from $0.15 / unit</p>
                  <Button size="sm" className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-snpa-primary">
                    Configure & Order
                  </Button>
                </div>
              </div>

               {/* Product Card 3 */}
              <div className="group bg-white rounded-lg border border-gray-200 hover:border-snpa-primary transition-all hover:shadow-md cursor-pointer">
                <div className="h-40 bg-gray-100 rounded-t-lg relative overflow-hidden flex items-center justify-center text-gray-300">
                    <FileText className="w-12 h-12" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-snpa-primary">Security ID Badges</h3>
                  <p className="text-xs text-gray-500 mb-4">from $2.50 / unit</p>
                  <Button size="sm" className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-snpa-primary">
                    Configure & Order
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats / Dashboard Link */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-8 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Your Budget</p>
                <div className="text-2xl font-bold text-blue-900">$11,227.00</div>
                <p className="text-xs text-blue-400 mt-1">FY 2025 Remaining</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-xs text-yellow-700 font-bold uppercase mb-1">Pending Approval</p>
                <div className="text-2xl font-bold text-yellow-900">3 Orders</div>
                <p className="text-xs text-yellow-600 mt-1">Awaiting DG Sign-off</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-green-700 font-bold uppercase mb-1">Delivered (Q1)</p>
                <div className="text-2xl font-bold text-green-900">12 Items</div>
                <p className="text-xs text-green-600 mt-1">View Delivery Reports</p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
