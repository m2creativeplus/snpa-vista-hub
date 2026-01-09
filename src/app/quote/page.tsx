import { PricingCalculator } from "@/components/pricing-calculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center">
                <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>
        </header>

        <main className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-snpa-primary/10 text-snpa-primary text-xs font-bold uppercase tracking-wider mb-4">
                    Price Estimator
                </span>
                <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
                    Get an Instant Quote
                </h1>
                <p className="text-lg text-muted-foreground">
                    Calculate costs for Somaliland's official printing services. 
                    From business cards to secure government documents.
                </p>
            </div>

            <PricingCalculator />
        </main>
    </div>
  );
}
