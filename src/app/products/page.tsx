"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";

export default function ProductsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        
        <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Complete Government Supply Catalog</h2>
                <p className="text-gray-500">Select a category to view approved specifications and pricing.</p>
            </div>

            <div className="grid gap-8">
                {products.map((category) => (
                    <div key={category.id} id={category.id} className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                             {/* Category Icon Placeholder logic if needed, or just text */}
                             <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.subcategories.map((product) => (
                                <Link key={product.id} href={`/product/${product.id}`} className="group">
                                    <Card className="h-full hover:shadow-md transition-shadow hover:border-snpa-primary overflow-hidden">
                                        <div className="h-32 bg-gray-100 relative">
                                            {/* Use category image as fallback for all sub-products for now */}
                                            <Image 
                                                src={category.image || "/images/placeholder.png"} 
                                                alt={product.name}
                                                fill
                                                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                            <div className="absolute bottom-2 left-2 right-2">
                                                <span className="text-xs font-bold text-white bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                                                    SNPA Approved
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h4 className="font-bold text-gray-900 group-hover:text-snpa-primary mb-1">{product.name}</h4>
                                            <div className="flex items-center text-xs text-gray-500">
                                                Configure & Order <ChevronRight className="w-3 h-3 ml-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </main>
      
    </div>
  );
}
