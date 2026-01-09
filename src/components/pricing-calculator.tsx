"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Check, ArrowRight, Printer, AlertTriangle, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ministries, type Ministry } from "@/data/ministries";

export function PricingCalculator() {
  const [product, setProduct] = useState("business-card");
  const [quantity, setQuantity] = useState(500);
  const [paperType, setPaperType] = useState("standard");
  const [isUrgent, setIsUrgent] = useState(false);
  
  // Gov Layer State
  const [selectedMinistryId, setSelectedMinistryId] = useState<string>("");
  const [isCheckingBudget, setIsCheckingBudget] = useState(false);
  const [budgetStatus, setBudgetStatus] = useState<"idle" | "approved" | "rejected">("idle");
  const [isOpen, setIsOpen] = useState(false);

  // Pricing Logic (Mock Data based on market rates)
  const baseRates: Record<string, number> = {
    "business-card": 0.15,
    "flyer-a5": 0.10,
    "poster-a3": 1.50,
    "booklet": 3.50,
    "id-card": 2.50, // Security Printing item
  };

  const calculateTotal = () => {
    let base = baseRates[product] || 0;
    
    // Quantity Discount
    if (quantity >= 1000) base *= 0.9;
    if (quantity >= 5000) base *= 0.8;
    
    // Paper Multiplier
    if (paperType === "premium") base *= 1.5;
    if (paperType === "cardstock") base *= 1.2;
    
    let total = base * quantity;

    // Urgency Fee
    if (isUrgent) total *= 1.25;

    return Number(total.toFixed(2));
  };

  const totalCost = calculateTotal();
  const selectedMinistry = ministries.find(m => m.id === selectedMinistryId);

  const handleBudgetCheck = () => {
    if (!selectedMinistry) return;
    
    setIsCheckingBudget(true);
    
    // Simulate API delay
    setTimeout(() => {
        const remaining = selectedMinistry.budget.q1_remaining;
        setIsCheckingBudget(false);
        
        if (totalCost > remaining) {
            setBudgetStatus("rejected");
            toast.error(`Budget Exceeded! ${selectedMinistry.code} has insufficient funds.`);
        } else {
            setBudgetStatus("approved");
            toast.success("Budget Approved! Requisition sent to DG.");
        }
    }, 1500);
  };

  const resetFlow = () => {
    setIsOpen(false);
    setBudgetStatus("idle");
    setIsCheckingBudget(false);
    setSelectedMinistryId("");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-snpa-primary/10 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-snpa-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-snpa-primary/10 rounded-lg">
                <Calculator className="w-6 h-6 text-snpa-primary" />
            </div>
            <div>
                <CardTitle className="text-2xl font-display font-bold">Instant Quote Calculator</CardTitle>
                <CardDescription>Estimate your printing costs in seconds</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        
        {/* Product Selection */}
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Product Type</Label>
                    <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="business-card">Business Cards</SelectItem>
                        <SelectItem value="flyer-a5">Flyers (A5)</SelectItem>
                        <SelectItem value="poster-a3">Posters (A3)</SelectItem>
                        <SelectItem value="booklet">Booklets / reports</SelectItem>
                        <SelectItem value="id-card">Secure ID Cards</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                
                <div className="space-y-2">
                    <Label>Paper / Material</Label>
                    <Select value={paperType} onValueChange={setPaperType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard">Standard (80-100gsm)</SelectItem>
                        <SelectItem value="cardstock">Cardstock (300gsm)</SelectItem>
                        <SelectItem value="premium">Premium Glossy/Matte</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>
        </div>

        {/* Quantity Slider */}
        <div className="space-y-4">
            <div className="flex justify-between">
                <Label>Quantity: <span className="font-bold text-lg text-snpa-primary">{quantity.toLocaleString()}</span> units</Label>
            </div>
            <Slider 
                value={[quantity]} 
                onValueChange={(vals) => setQuantity(vals[0])} 
                max={10000} 
                min={50} 
                step={50}
                className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>50</span>
                <span>5,000</span>
                <span>10,000+</span>
            </div>
        </div>

        {/* Urgency Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card/50">
            <div className="space-y-0.5">
                <Label className="text-base">Rush Order (24h)</Label>
                <p className="text-xs text-muted-foreground">Prioritize production queue (+25%)</p>
            </div>
            <div className="flex items-center space-x-2">
                 <input 
                    type="checkbox" 
                    checked={isUrgent} 
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-snpa-primary focus:ring-snpa-primary"
                 />
            </div>
        </div>

        {/* Total Cost Display with Budget Modal Trigger */}
        <div className="flex items-center justify-between p-6 bg-gradient-snpa rounded-xl text-white shadow-lg">
            <div>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Estimated Total</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${totalCost.toFixed(2)}</span>
                    <span className="text-sm opacity-80">USD</span>
                </div>
            </div>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-snpa-primary hover:bg-white/90 font-bold border-0 shadow-xl">
                        Start Requisition <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>🛡️ Government Budget Guard</DialogTitle>
                        <DialogDescription>
                            SNPA integrates directly with the Ministry of Finance. Select your Ministry to verify funds.
                        </DialogDescription>
                    </DialogHeader>
                    
                    {budgetStatus === "idle" && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Select Ministry / Agency</Label>
                                <Select value={selectedMinistryId} onValueChange={setSelectedMinistryId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Search Ministry Code..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ministries.map(m => (
                                            <SelectItem key={m.id} value={m.id}>
                                                {m.code} - {m.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {selectedMinistry && (
                                <div className="p-4 bg-slate-50 rounded-lg space-y-3 border border-slate-200">
                                    <div className="flex justify-between text-sm">
                                        <span>Q1 Allocation:</span>
                                        <span className="font-bold">${selectedMinistry.budget.q1_allocation.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Current Spent:</span>
                                        <span className="text-orange-600 font-bold">${selectedMinistry.budget.q1_spent.toLocaleString()}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Budget Usage</span>
                                            <span>
                                                {Math.round((selectedMinistry.budget.q1_spent / selectedMinistry.budget.q1_allocation) * 100)}%
                                            </span>
                                        </div>
                                        <Progress value={(selectedMinistry.budget.q1_spent / selectedMinistry.budget.q1_allocation) * 100} />
                                    </div>
                                </div>
                            )}

                            <Button 
                                className="w-full font-bold" 
                                disabled={!selectedMinistry || isCheckingBudget} 
                                onClick={handleBudgetCheck}
                            >
                                {isCheckingBudget ? "Verifying with MoF..." : `Verify & Request Approval ($${totalCost})`}
                            </Button>
                        </div>
                    )}

                    {budgetStatus === "rejected" && selectedMinistry && (
                        <div className="py-6 text-center space-y-4">
                             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                <Lock className="w-8 h-8 text-red-600" />
                             </div>
                             <div>
                                <h3 className="text-xl font-bold text-red-700">Budget Exceeded</h3>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">
                                    This order of <strong>${totalCost}</strong> exceeds the remaining balance of <strong>${selectedMinistry.budget.q1_remaining}</strong>.
                                </p>
                             </div>
                             <Button variant="outline" onClick={resetFlow} className="w-full">Modify Order</Button>
                        </div>
                    )}

                    {budgetStatus === "approved" && selectedMinistry && (
                        <div className="py-6 text-center space-y-4">
                             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <Check className="w-8 h-8 text-green-600" />
                             </div>
                             <div>
                                <h3 className="text-xl font-bold text-green-700">Funds Secured</h3>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto mt-2">
                                    Requisition sent to <strong>{selectedMinistry.authorized_approver}</strong> for final sign-off.
                                </p>
                             </div>
                             <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {toast.success("Order Placed!"); setIsOpen(false);}}>
                                Return to Dashboard
                             </Button>
                        </div>
                    )}

                </DialogContent>
            </Dialog>
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on specific design requirements and tax.
        </p>

      </CardContent>
    </Card>
  );
}
