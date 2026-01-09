import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ShieldCheck, CreditCard, Truck, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="w-8 h-8 text-snpa-primary" />
                    <span className="font-bold text-white">Government Approved</span>
                    <span className="text-xs">Audited & Secure Supply Chain</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Truck className="w-8 h-8 text-snpa-gold" />
                    <span className="font-bold text-white">Nationwide Delivery</span>
                    <span className="text-xs">To all 6 Regions & Districts</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <CreditCard className="w-8 h-8 text-blue-500" />
                    <span className="font-bold text-white">Budget Code Integrated</span>
                    <span className="text-xs">Direct MoF Billing System</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-purple-400" />
                    <span className="font-bold text-white">Free Templates</span>
                    <span className="text-xs">Official .AI & .PDF Standards</span>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
                 <div className="w-8 h-8 rounded bg-snpa-primary flex items-center justify-center text-white font-bold">S</div>
                 <h2 className="text-white font-bold text-xl">SNPA Print Intelligence</h2>
            </div>
            <p className="leading-relaxed text-slate-400 max-w-sm">
              The official centralized procurement portal for the Government of Somaliland. 
              Review budgets, configure print orders, and manage Ministry assets in one secure ecosystem.
            </p>
            <div className="flex items-center gap-4 pt-4">
               <Link href="#" className="bg-slate-800 p-2 rounded hover:bg-snpa-primary hover:text-white transition-colors"><Twitter className="w-4 h-4" /></Link>
               <Link href="#" className="bg-slate-800 p-2 rounded hover:bg-snpa-primary hover:text-white transition-colors"><Facebook className="w-4 h-4" /></Link>
               <Link href="#" className="bg-slate-800 p-2 rounded hover:bg-snpa-primary hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></Link>
            </div>
          </div>

          {/* Column 2: Popular Products */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Popular Products</h3>
            <ul className="space-y-2">
                <li><Link href="/product/business-cards" className="hover:text-snpa-gold transition-colors">Business Cards</Link></li>
                <li><Link href="/product/gov-letterhead" className="hover:text-snpa-gold transition-colors">Official Letterheads</Link></li>
                <li><Link href="/product/sgn-vinyl-banner" className="hover:text-snpa-gold transition-colors">Vinyl Banners</Link></li>
                <li><Link href="/product/gov-id-badges" className="hover:text-snpa-gold transition-colors">Civil Service IDs</Link></li>
                <li><Link href="/product/gov-folders" className="hover:text-snpa-gold transition-colors">Presentation Folders</Link></li>
            </ul>
          </div>

          {/* Column 3: Government Support */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Ministry Support</h3>
            <ul className="space-y-2">
                <li><Link href="#" className="hover:text-snpa-gold transition-colors">Check Budget Balance</Link></li>
                <li><Link href="#" className="hover:text-snpa-gold transition-colors">Track Requisition</Link></li>
                <li><Link href="#" className="hover:text-snpa-gold transition-colors">Download Templates</Link></li>
                <li><Link href="#" className="hover:text-snpa-gold transition-colors">Auditor General Reports</Link></li>
                <li><Link href="#" className="hover:text-snpa-gold transition-colors">Procurement Policy 2026</Link></li>
            </ul>
          </div>
          
           {/* Column 4: Contact */}
           <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Contact HQ</h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-snpa-gold flex-shrink-0" />
                    <span>Independence Avenue,<br/>Hargeisa, Somaliland</span>
                </li>
                 <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-snpa-gold flex-shrink-0" />
                    <span>+252 (63) 123-4567</span>
                </li>
                 <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-snpa-gold flex-shrink-0" />
                    <span>procurement@snpa.gov.so</span>
                </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Strip */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 Somaliland National Printing Agency. Official Government Portal.</p>
            <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-white">Privacy Policy</Link>
                <Link href="#" className="hover:text-white">Terms of Use</Link>
                <Link href="#" className="hover:text-white">Sitemap</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
