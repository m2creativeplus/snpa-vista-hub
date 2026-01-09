import Link from "next/link";
import { 
  Printer, 
  Package, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Product categories based on UPrinting structure
const categories = [
  { name: "Business Cards", slug: "business-cards", icon: "💼", count: 17 },
  { name: "Brochures & Flyers", slug: "brochures-flyers", icon: "📄", count: 12 },
  { name: "Posters & Banners", slug: "posters-banners", icon: "🖼️", count: 15 },
  { name: "Labels & Stickers", slug: "labels-stickers", icon: "🏷️", count: 8 },
  { name: "Packaging", slug: "packaging", icon: "📦", count: 10 },
  { name: "Books & Catalogs", slug: "books-catalogs", icon: "📚", count: 6 },
  { name: "Forms & Documents", slug: "forms-documents", icon: "📋", count: 9 },
  { name: "Promotional Items", slug: "promotional", icon: "🎁", count: 14 },
];

const featuredProducts = [
  { name: "Exercise Books", description: "School notebooks, all sizes", price: "From $0.50/unit", popular: true },
  { name: "Government Forms", description: "Official document printing", price: "Custom Quote", popular: true },
  { name: "ID Cards", description: "Secure laminated cards", price: "From $2.00/unit", popular: false },
  { name: "Certificates", description: "Premium certificate printing", price: "From $1.50/unit", popular: false },
  { name: "Calendars 2026", description: "Wall & desk calendars", price: "From $3.00/unit", popular: true },
  { name: "Annual Reports", description: "Professional binding", price: "Custom Quote", popular: false },
];

const benefits = [
  { icon: Shield, title: "ISO Certified Quality", desc: "ISO 9001, 12647, 14001 compliant" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Free delivery across Somaliland" },
  { icon: Star, title: "40+ Years Experience", desc: "Serving since 1984" },
  { icon: Printer, title: "State-of-Art Equipment", desc: "Modern offset & digital printing" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-snpa flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg leading-tight">SNPA</h1>
                <p className="text-xs text-muted-foreground">Wakaaladda Madbacadda</p>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-sm hover:text-primary transition-colors">Products</Link>
              <Link href="/services" className="text-sm hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-sm hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
            </nav>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/quote">
                <Button variant="outline" size="sm">Get Quote</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-snpa hover:opacity-90">
                  Operations Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-snpa-primary/20 via-transparent to-snpa-gold/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-snpa-primary/20 text-snpa-primary mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Official Government Printer</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Quality Printing for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-snpa-primary to-snpa-gold"> Somaliland</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Wakaaladda Madbacadda Qaranka - Your trusted partner for professional printing, 
              packaging, and publishing services since 1984.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-snpa hover:opacity-90">
                  Browse Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/quote">
                <Button size="lg" variant="outline">
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">Find exactly what you need for your printing project</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`}>
                <Card className="hover:border-snpa-primary/50 transition-all hover:shadow-lg hover:shadow-snpa-primary/10 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-snpa-primary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our most popular printing services</p>
            </div>
            <Link href="/products">
              <Button variant="ghost">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <Card key={i} className="group hover:border-snpa-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-snpa-primary/20 to-snpa-gold/20 flex items-center justify-center">
                      <Printer className="w-8 h-8 text-snpa-primary" />
                    </div>
                    {product.popular && (
                      <span className="px-2 py-1 text-xs font-medium bg-snpa-gold/20 text-snpa-gold rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-snpa-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-snpa-gold">{product.price}</span>
                    <Button size="sm" variant="ghost" className="group-hover:bg-snpa-primary/10">
                      Order Now <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-br from-snpa-primary/10 via-background to-snpa-gold/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-snpa-primary/20 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-snpa-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-snpa rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Get a custom quote for your printing needs. Our team is ready to help bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quote">
                <Button size="lg" className="bg-white text-snpa-primary hover:bg-white/90">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-snpa flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <div>
                  <h3 className="font-display font-bold">SNPA</h3>
                  <p className="text-xs text-muted-foreground">Est. 1984</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Somaliland National Printing Agency - Official government printer serving the nation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products/business-cards" className="hover:text-foreground">Business Cards</Link></li>
                <li><Link href="/products/brochures-flyers" className="hover:text-foreground">Brochures & Flyers</Link></li>
                <li><Link href="/products/packaging" className="hover:text-foreground">Packaging</Link></li>
                <li><Link href="/products/books-catalogs" className="hover:text-foreground">Books & Catalogs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
                <li><Link href="/quality" className="hover:text-foreground">Quality Standards</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Hargeisa, Somaliland
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +252-2-123456
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@snpa.gov.sl
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Somaliland National Printing Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
