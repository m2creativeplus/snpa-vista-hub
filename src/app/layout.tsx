import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-display",
  display: "swap", 
});

const poppins = Poppins({ 
  weight: ["300", "400", "500", "600", "700"], 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SNPA Print Intelligence | Official Government Supply",
  description: "Secure printing procurement for the Government of Somaliland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable} font-sans bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        <ConvexClientProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
