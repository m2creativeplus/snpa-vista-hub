"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, CheckCircle, Globe, Shield, Zap, ArrowRight, Mail } from "lucide-react"

export default function ISBNPortalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<"available" | "taken" | null>(null)
  const [email, setEmail] = useState("")
  const [bookTitle, setBookTitle] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSearch = () => {
    // Simulate search - in production, this would check a real database
    if (searchQuery.trim()) {
      // Random availability for demo
      setSearchResult(Math.random() > 0.3 ? "available" : "taken")
    }
  }

  const handlePreRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would save to database and trigger email sequence
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#B68A35]/20 to-transparent blur-3xl"></div>
        
        <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1EB53A] to-[#0d7a24] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SNPA <span className="text-[#B68A35]">ISBN</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white">About</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Pricing</Button>
            <Button className="bg-[#1EB53A] hover:bg-[#0d7a24] text-white">Register Now</Button>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B68A35]/20 border border-[#B68A35]/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-[#B68A35]" />
            <span className="text-sm text-[#B68A35]">Official Somaliland ISBN Agency</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get Your <span className="text-[#1EB53A]">ISBN</span> for Just <span className="text-[#B68A35]">$20</span>
          </h1>
          <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            Stop paying $295 to foreign agencies. Register your book with Somaliland's official ISBN authority.
          </p>
          <p className="text-lg text-[#1EB53A] mb-8">
            ✓ Globally recognized • ✓ 24-hour processing • ✓ Free pre-registration
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search existing ISBNs or check title availability..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-lg"
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="h-14 px-8 bg-[#1EB53A] hover:bg-[#0d7a24] text-white text-lg"
                  >
                    Search
                  </Button>
                </div>

                {searchResult && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    searchResult === "available" 
                      ? "bg-[#1EB53A]/20 border border-[#1EB53A]/30" 
                      : "bg-red-500/20 border border-red-500/30"
                  }`}>
                    {searchResult === "available" ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-[#1EB53A]" />
                        <div className="text-left">
                          <p className="text-[#1EB53A] font-semibold">Title Available!</p>
                          <p className="text-gray-400 text-sm">"{searchQuery}" can be registered. Pre-register now for free!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-red-400" />
                        <div className="text-left">
                          <p className="text-red-400 font-semibold">Title Already Registered</p>
                          <p className="text-gray-400 text-sm">This title exists in our database. Try a different title.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/10 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#B68A35]">2,500+</p>
              <p className="text-gray-400">Books Registered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#1EB53A]">$20</p>
              <p className="text-gray-400">vs $295 Foreign</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">24hr</p>
              <p className="text-gray-400">Processing Time</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#B68A35]">100%</p>
              <p className="text-gray-400">Globally Recognized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Pre-Register Your Book <span className="text-[#1EB53A]">Free</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Reserve your book title and get a temporary certificate while you prepare for publication. 
                When you're ready, pay just $20 for your official, globally-citable ISBN.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1EB53A]/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#1EB53A]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Instant Confirmation</h3>
                    <p className="text-gray-400 text-sm">Get your pre-registration certificate immediately via email</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#B68A35]/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-[#B68A35]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Global Recognition</h3>
                    <p className="text-gray-400 text-sm">Your ISBN will be listed in international databases</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1EB53A]/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-[#1EB53A]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Publishing Support</h3>
                    <p className="text-gray-400 text-sm">Access SNPA's printing services at discounted rates</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Pre-Register Your Title</CardTitle>
                <CardDescription className="text-gray-400">
                  Free registration • No payment required
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handlePreRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">Book Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter your book title"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-gray-300">Author Name</Label>
                      <Input
                        id="author"
                        placeholder="Your full name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-[#1EB53A] hover:bg-[#0d7a24] text-white text-lg"
                    >
                      Pre-Register Free <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-center text-gray-500 text-xs">
                      By registering, you agree to receive updates from SNPA
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#1EB53A]/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#1EB53A]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Title Reserved!</h3>
                    <p className="text-gray-400 mb-4">
                      Check your email for your pre-registration certificate.
                    </p>
                    <Button variant="outline" className="border-[#B68A35] text-[#B68A35] hover:bg-[#B68A35]/10">
                      <Mail className="mr-2 w-4 h-4" /> Check Email
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Pay <span className="text-red-400 line-through">$295</span> When You Can Pay <span className="text-[#1EB53A]">$20</span>?
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            As Somaliland's official ISBN agency, SNPA provides the same globally-recognized ISBNs at a fraction of the cost.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-red-500/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400">Foreign Agencies</CardTitle>
                <CardDescription className="text-gray-400">Bowker, Nielsen, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-400 mb-4">$295</p>
                <ul className="text-left text-gray-400 space-y-2">
                  <li>❌ Slow processing</li>
                  <li>❌ Foreign currency payment</li>
                  <li>❌ No local support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1EB53A]/10 border-[#1EB53A]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#B68A35] text-black text-xs font-bold px-3 py-1">
                RECOMMENDED
              </div>
              <CardHeader>
                <CardTitle className="text-[#1EB53A]">SNPA ISBN</CardTitle>
                <CardDescription className="text-gray-400">Official Somaliland Agency</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-[#1EB53A] mb-4">$20</p>
                <ul className="text-left text-gray-400 space-y-2">
                  <li>✅ 24-hour processing</li>
                  <li>✅ Pay in SLSH or USD</li>
                  <li>✅ Local support team</li>
                  <li>✅ Free pre-registration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-500/10 border-gray-500/30">
              <CardHeader>
                <CardTitle className="text-gray-400">No ISBN</CardTitle>
                <CardDescription className="text-gray-500">Self-publish without</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-400 mb-4">$0</p>
                <ul className="text-left text-gray-500 space-y-2">
                  <li>❌ Not found in catalogs</li>
                  <li>❌ Can't sell in stores</li>
                  <li>❌ No credibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1EB53A] to-[#0d7a24] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SNPA ISBN Portal</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Somaliland National Printing Agency. Official ISBN Agency.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Privacy</Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Terms</Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
