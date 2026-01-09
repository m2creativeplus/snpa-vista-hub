"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, HelpCircle, FileText, Phone, Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <div className="flex flex-col w-full z-50">
      {/* 🇸🇱 Top Government Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-snpa-gold" /> Ministry of Information, Hargeisa</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 hover:text-white cursor-pointer"><Phone className="w-3 h-3" /> Support: 9800 (Toll Free)</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
             {/* Language Toggles */}
            <div className="flex items-center gap-2 border-r border-slate-700 pr-4 mr-0">
                <span className="cursor-pointer text-white font-bold">EN</span>
                <span className="text-slate-600">|</span>
                <span className="cursor-pointer hover:text-white">SO</span>
                <span className="text-slate-600">|</span>
                <span className="cursor-pointer hover:text-white">AR</span>
            </div>
            <Link href="#" className="hover:text-white transition-colors">Order Status</Link>
            <Link href="#" className="hover:text-white transition-colors hidden sm:inline">Help Center</Link>
          </div>
        </div>
      </div>

      {/* Main Commercial Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4 lg:gap-8 justify-between">
            
            <Sheet>
               <SheetTrigger asChild>
                   <Button variant="ghost" size="icon" className="md:hidden">
                       <Menu className="w-6 h-6 text-gray-800" />
                   </Button>
               </SheetTrigger>
               <SheetContent side="left">
                   <div className="flex flex-col gap-6 mt-6">
                       <Link href="/" className="font-bold text-xl text-snpa-primary">SNPA Mobile</Link>
                       <div className="flex flex-col gap-3">
                           <Link href="/product/business-cards" className="text-lg font-medium">Business Cards</Link>
                           <Link href="/product/marketing" className="text-lg font-medium">Marketing Materials</Link>
                           <Link href="/product/gov-stationery" className="text-lg font-medium text-snpa-primary">Official Stationery</Link>
                           <Link href="/dashboard/assets" className="text-lg font-medium">My Assets</Link>
                           <Link href="/admin/dashboard" className="text-lg font-medium text-red-600">Approver Dashboard</Link>
                       </div>
                   </div>
               </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-10 h-10 rounded bg-snpa-primary flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-green-800 transition-colors">
                S
              </div>
              <div className="leading-tight">
                <h1 className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-snpa-primary transition-colors">SNPA</h1>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Print Intelligence</p>
              </div>
            </Link>

            {/* Huge Search Bar */}
            <div className="hidden md:flex flex-1 max-w-3xl relative">
              <div className="relative w-full">
                <Input 
                  type="text" 
                  placeholder="What would you like to print today? (e.g. 'Annual Reports', 'ID Cards')" 
                  className="w-full pl-4 pr-32 h-11 bg-gray-50 border-gray-300 focus:bg-white focus:ring-2 focus:ring-snpa-primary/20 rounded-lg text-sm transition-all"
                />
                <Button className="absolute right-1 top-1 h-9 px-6 bg-snpa-primary hover:bg-green-800 text-white font-bold rounded-md transition-colors">
                  <Search className="w-4 h-4 mr-2" /> Search
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
               {/* Sign In / Account */}
              <div className="hidden lg:flex items-center gap-3 px-3 py-1 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                    <User className="w-5 h-5" />
                </div>
                <div className="text-xs text-left">
                    <span className="block text-gray-500">Welcome,</span>
                    <span className="block font-bold text-gray-900">MoFAIC Admin</span>
                </div>
              </div>

               {/* Cart */}
              <Button size="lg" className="relative bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:text-snpa-primary hover:border-snpa-primary transition-all">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="font-bold hidden sm:inline">Cart</span>
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white border-2 border-white w-6 h-6 flex items-center justify-center rounded-full p-0">0</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Strip (Category Mega Menu Triggers) */}
        <div className="border-t border-gray-100 py-2 hidden md:block bg-white">
            <div className="container mx-auto px-4 flex items-center justify-between text-sm font-medium text-gray-600">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-snpa-primary font-bold cursor-pointer hover:bg-green-50 px-3 py-1 rounded transition-colors">
                        <Menu className="w-4 h-4" /> All Products
                    </div>
                    <Link href="/product/business-cards" className="hover:text-snpa-primary transition-colors">Business Cards</Link>
                    <Link href="/product/marketing" className="hover:text-snpa-primary transition-colors">Marketing</Link>
                    <Link href="/product/signs-banners" className="hover:text-snpa-primary transition-colors">Signs & Banners</Link>
                    <Link href="/product/gov-stationery" className="hover:text-snpa-primary transition-colors text-snpa-gold font-bold flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Official Stationery
                    </Link>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                     <span>Same Day Printing</span>
                     <span className="text-gray-300">|</span>
                     <span>Free Gov Delivery</span>
                </div>
            </div>
        </div>
      </header>
      
      {/* Mobile Search (Below Header) */}
      <div className="md:hidden px-4 py-3 bg-white border-b border-gray-200">
         <Input type="text" placeholder="Search products..." className="w-full h-10" />
      </div>

    </div>
  );
}
