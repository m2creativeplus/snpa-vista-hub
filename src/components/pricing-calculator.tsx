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

  // Product Catalog with Security Constraints
  const PRODUCTS = [
    // 🌍 Public / Standard Items (Available to Everyone)
    { id: "business-card", name: "Business Cards", rate: 0.15, restrictedTo: [] },
    { id: "flyer-a5", name: "Flyers (A5)", rate: 0.10, restrictedTo: [] },
    { id: "poster-a3", name: "Posters (A3)", rate: 1.50, restrictedTo: [] },
    { id: "booklet", name: "Booklets / Reports", rate: 3.50, restrictedTo: [] },
    
    // 🛡️ Security Restricted Items
    { id: "id-card", name: "Secure ID Cards (Polymer)", rate: 2.50, restrictedTo: ["Security-A"] },
    { id: "passport", name: "E-Passport (Bio-Chip)", rate: 8.00, restrictedTo: ["Security-A"] }, // Immigration Only (Logic handled by Tier)
    { id: "visa-sticker", name: "Holographic Visa Sticker", rate: 1.20, restrictedTo: ["Security-A"] },
    
    // 💰 Finance Specific
    { id: "tax-stamp", name: "Excise Tax Stamp (Roll)", rate: 0.05, restrictedTo: ["Security-A"] }, // MoF
  ];

  const baseRates = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.rate }), {} as Record<string, number>);

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

  // Filter Products based on Selected Ministry Tier
  const availableProducts = PRODUCTS.filter(p => {
    if (p.restrictedTo.length === 0) return true; // Public item
    if (!selectedMinistry) return false; // Locked if no ministry selected
    return p.restrictedTo.includes(selectedMinistry.tier);
  });

  // --- CONVEX INTEGRATION START ---
  // Using useMutation instead of local mock data
  const submitRequisition = useMutation(api.requisitions.submitRequisition);
  const checkBudget = useQuery(api.ministries.checkBudget, 
    selectedMinistry ? { ministryId: selectedMinistry as Id<"ministries">, amount: totalCost } : "skip"
  );
  // --- CONVEX INTEGRATION END ---

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      if (!selectedMinistry) {
        toast.error("Please select a Ministry to bill.");
        setIsAdding(false);
        return;
      }

      // 1. Budget Guard Check (Iron Dome)
      if (checkBudget && !checkBudget.allowed) {
        toast.error(`Budget Exceeded! Shortfall: $${checkBudget.shortfall}`, {
            description: "This requisition has been blocked by the Iron Dome system.",
            duration: 5000,
        });
        setIsAdding(false);
        return;
      }
      
      // 2. Submit to Backend
      await submitRequisition({
        ministryId: selectedMinistry as Id<"ministries">,
        userId: "user_mock_id_for_now" as Id<"users">, // TODO: Add real auth
        items: [{
          name: `${quantity}x ${PRODUCTS.find(p => p.id === product)?.name}`,
          quantity: quantity,
          unitPrice: calculateTotal() / quantity,
          total: totalCost
        }],
        totalAmount: totalCost,
      });

      // 3. Success UI
      setShowConfetti(true);
      toast.success("Requisition Sent to DG Dashboard", {
        description: `Order #${Math.floor(Math.random() * 1000)} created for ${selectedMinistry}. Funds frozen.`,
      });

      // Reset
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error(error);
      toast.error("System Error: Failed to submit requisition.");
    } finally {
      setIsAdding(false);
    }
  };

  const resetFlow = () => {
    setIsOpen(false);
    setBudgetStatus("idle");
    setIsCheckingBudget(false);
    // Do NOT reset Ministry ID here so they can make multiple orders
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
        
        {/* 1. CLIENT SELECTION (Context) */}
        <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
            <Label className="flex items-center gap-2">
                User / Organization
                {selectedMinistry && <span className="text-xs font-normal px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{selectedMinistry.tier} Clearance</span>}
            </Label>
            <Select value={selectedMinistryId} onValueChange={(val) => { setSelectedMinistryId(val); setProduct("business-card"); }}>
                <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Client (Required for Pricing)" />
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

        {/* 2. PRODUCT CONFIGURATION */}
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Product Type</Label>
                    <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Dynamic Catalog */}
                        {availableProducts.map(p => (
                            <SelectItem key={p.id} value={p.id}>
                                {p.name}
                                {p.restrictedTo.length > 0 && " 🔒"} 
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    {!selectedMinistry && <p className="text-[10px] text-muted-foreground">Select a client to see restricted items.</p>}
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
                    <Button size="lg" className="bg-white text-snpa-primary hover:bg-white/90 font-bold border-0 shadow-xl" disabled={!selectedMinistry}>
                        Proceed to Payment <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>🛡️ Government Budget Guard</DialogTitle>
                        <DialogDescription>
                            Verifying funds for <strong>{selectedMinistry?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    
                    {budgetStatus === "idle" && selectedMinistry && (
                        <div className="space-y-4 py-4">
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
                            
                            <Button 
                                className="w-full font-bold" 
                                disabled={isCheckingBudget} 
                                onClick={handleAddToCart}
                            >
                                {isCheckingBudget ? "Verifying with MoF..." : `Confirm & Deduct Funds`}
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
            *Restricted items (Passports, Stamps) are only visible to authorized Tier A agencies.
        </p>

      </CardContent>
    </Card>
  );
}
