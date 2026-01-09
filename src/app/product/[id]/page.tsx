"use client";

import { useState, use } from "react";
import Image from "next/image"; // Import Image
import Link from "next/link";
import { ArrowLeft, Check, Truck, ShieldCheck, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products"; // Import product data

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);
  
  // Find product image based on ID or category
  // This is a simple lookup for the demo. In a real app, you'd find the exact subcategory.
  const parentCategory = products.find(p => p.subcategories.some(sub => sub.id === id)) || products[0];
  const productImage = parentCategory.image || "/images/business-cards.png";
  const productName = parentCategory.subcategories.find(sub => sub.id === id)?.name || "Product Name";

  // Calculator State
  const [size, setSize] = useState("3.5x2");
  const [paper, setPaper] = useState("14pt");
  const [quantity, setQuantity] = useState("500");
  const [turnaround, setTurnaround] = useState("3day");

  // Dynamic Pricing Logic (Mock)
  const productDetails = {
      basePrice: 0.15,
  };

  const getPrice = () => {
    let base = productDetails.basePrice;
    
    // Size multiplier
    if (size === "3.5x2") base *= 1; 
    
    // Paper multiplier
    if (paper === "14pt") base *= 1;
    if (paper === "16pt") base *= 1.2;
    if (paper === "18pt") base *= 1.5;

    // Quantity Discount
    const qty = parseInt(quantity);
    let total = base * qty;
    
    if (qty >= 1000) total *= 0.8; // 20% off
    if (qty >= 5000) total *= 0.6; // 40% off
    
    // Turnaround Fee
    if (turnaround === "1day") total *= 1.4; // 40% rush fee

    return total.toFixed(2);
  }

  const pricePerUnit = (parseFloat(getPrice()) / parseInt(quantity)).toFixed(3);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Breadcrumb / Nav */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-40">
        <div className="container mx-auto flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-snpa-primary flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Catalog
            </Link> 
            <span>/</span>
            <span className="text-gray-900 font-semibold">{productName}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Images & Info (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
                {/* Main Image Stage */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm aspect-video flex items-center justify-center bg-gray-100 text-gray-300 relative">
                     {/* Dynamic Image */}
                     <Image 
                        src={productImage} 
                        alt={productName}
                        fill
                        className="object-cover"
                     />
                </div>

                {/* Details */}
                <div className="space-y-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-snpa-gold text-slate-900 border-none">Government Standard</Badge>
                        <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> In Stock (Hargeisa Warehouse)
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Official Government Supply. High-quality production meeting all SNPA security and branding standards. 
                        Authorized for use by Ministries, Agencies, and Departments.
                      </p>
                    </div>

                    <Tabs defaultValue="specs" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="specs">Specifications</TabsTrigger>
                        <TabsTrigger value="templates">Templates</TabsTrigger>
                        <TabsTrigger value="delivery">Delivery</TabsTrigger>
                      </TabsList>
                      <TabsContent value="specs" className="p-4 bg-white border border-gray-200 rounded-b-lg mt-0">
                        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Technical Details</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex justify-between border-b border-gray-100 pb-2">
                            <span>Dimensions</span> <span className="font-medium text-gray-900">Standard (3.5" x 2") or Custom</span>
                          </li>
                          <li className="flex justify-between border-b border-gray-100 pb-2">
                            <span>Bleed Area</span> <span className="font-medium text-gray-900">0.125" (3mm)</span>
                          </li>
                          <li className="flex justify-between border-b border-gray-100 pb-2">
                            <span>Resolution</span> <span className="font-medium text-gray-900">300 DPI Extended Gamut</span>
                          </li>
                          <li className="flex justify-between pb-2">
                             <span>Paper Origin</span> <span className="font-medium text-gray-900">Sourced from EU/UAE</span>
                          </li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="templates" className="p-4 bg-white border border-gray-200 rounded-b-lg mt-0">
                        <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-snpa-primary hover:bg-green-50 transition-colors cursor-pointer group">
                             <FileText className="w-8 h-8 mx-auto text-gray-400 group-hover:text-snpa-primary mb-2" />
                             <p className="font-bold text-gray-900 text-sm">Download Official Guidelines</p>
                             <p className="text-xs text-gray-500 mb-3">Includes Adobe Illustrator & PDF Layouts</p>
                             <Button size="sm" variant="outline" className="h-8 text-xs">Download .ZIP</Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="delivery" className="p-4 bg-white border border-gray-200 rounded-b-lg mt-0">
                         <div className="flex items-start gap-3 mb-4">
                             <Truck className="w-5 h-5 text-snpa-primary mt-1" />
                             <div>
                                 <h4 className="font-bold text-sm text-gray-900">Next Day Government Courier</h4>
                                 <p className="text-xs text-gray-600">Free delivery to all Ministries in Hargeisa. 2-Day shipping to Berbera, Burao, and Borama.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-3">
                             <ShieldCheck className="w-5 h-5 text-snpa-gold mt-1" />
                             <div>
                                 <h4 className="font-bold text-sm text-gray-900">Secure Chain of Custody</h4>
                                 <p className="text-xs text-gray-600">All sensitive documents are sealed and tracked via SNPA Logistics.</p>
                             </div>
                         </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                            <h5 className="font-bold text-blue-900 text-xs uppercase mb-1">Bulk Savings</h5>
                            <p className="text-blue-700 text-xs">Save 40% when ordering 5,000+ units for your Ministry.</p>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                             <h5 className="font-bold text-green-900 text-xs uppercase mb-1">Tax Exempt</h5>
                             <p className="text-green-700 text-xs">Government orders are fully VAT exempt automatically.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Smart Calculator (Sticky) (5 cols) */}
            <div className="lg:col-span-5 relative">
                <div className="sticky top-24 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-1 bg-gradient-to-r from-green-600 to-snpa-gold"></div>
                    
                    <div className="p-6 space-y-6">
                        <h2 className="font-bold text-xl text-gray-900">Configure Order</h2>
                        
                        {/* 1. Size */}
                        <div className="space-y-3">
                            <Label className="uppercase text-xs font-bold text-gray-500">Size</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    variant={size === "3.5x2" ? "default" : "outline"} 
                                    className={size === "3.5x2" ? "bg-snpa-primary hover:bg-green-700" : ""}
                                    onClick={() => setSize("3.5x2")}
                                >
                                    Standard (3.5" x 2")
                                </Button>
                                <Button 
                                    variant={size === "europe" ? "default" : "outline"} 
                                    className={size === "europe" ? "bg-snpa-primary hover:bg-green-700" : ""}
                                    onClick={() => setSize("europe")}
                                >
                                    Alt Format (A6/DL)
                                </Button>
                            </div>
                        </div>

                        {/* 2. Paper */}
                        <div className="space-y-3">
                            <Label className="uppercase text-xs font-bold text-gray-500">Material / Stock</Label>
                            <Select value={paper} onValueChange={setPaper}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="14pt">Standard Office Bond</SelectItem>
                                    <SelectItem value="16pt">Premium Cardstock (Gloss)</SelectItem>
                                    <SelectItem value="18pt">Security Watermarked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 3. Quantity */}
                        <div className="space-y-3">
                            <Label className="uppercase text-xs font-bold text-gray-500">Quantity</Label>
                            <Select value={quantity} onValueChange={setQuantity}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="100">100 ($0.25/unit)</SelectItem>
                                    <SelectItem value="250">250 ($0.18/unit)</SelectItem>
                                    <SelectItem value="500">500 (Most Popular)</SelectItem>
                                    <SelectItem value="1000">1,000 (Bulk Savings)</SelectItem>
                                    <SelectItem value="5000">5,000 (Ministry Pack)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                         {/* 4. Turnaround */}
                        <div className="space-y-3">
                            <Label className="uppercase text-xs font-bold text-gray-500">Turnaround Time</Label>
                            <RadioGroup value={turnaround} onValueChange={setTurnaround} className="space-y-2">
                                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors ${turnaround === '3day' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                    <RadioGroupItem value="3day" id="r1" className="text-green-600" />
                                    <div className="flex-1">
                                        <Label htmlFor="r1" className="font-semibold cursor-pointer">Standard (3 Business Days)</Label>
                                        <p className="text-xs text-gray-500">Free Processing</p>
                                    </div>
                                </div>
                                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors ${turnaround === '1day' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                    <RadioGroupItem value="1day" id="r2" className="text-green-600" />
                                    <div className="flex-1">
                                        <Label htmlFor="r2" className="font-semibold cursor-pointer">Rush (Next Day)</Label>
                                        <p className="text-xs text-gray-500">Guaranteed by 5 PM (+40%)</p>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <Separator className="my-6" />

                        {/* Price Display */}
                        <div className="bg-gray-900 rounded-lg p-6 text-white text-center">
                            <p className="text-gray-400 text-sm mb-1">Total Estimated Cost</p>
                            <div className="text-4xl font-bold mb-1">${getPrice()}</div>
                            <p className="text-xs text-green-400 font-mono">${pricePerUnit} per unit</p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button className="w-full h-12 text-lg font-bold bg-snpa-primary hover:bg-green-700 shadow-lg shadow-green-900/20">
                                Add to Cart
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <ShieldCheck className="w-3 h-3 text-green-600" />
                                Official Government Supply
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
