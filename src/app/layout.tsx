import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

export const metadata: Metadata = {
  title: "SNPA Print Intelligence | Somaliland National Printing Agency",
  description: "Wakaaladda Madbacadda Qaranka - Official Print Services for the Republic of Somaliland. Quality printing, packaging, and publishing services.",
  keywords: ["SNPA", "Somaliland", "Printing", "Government Printing", "Wakaaladda Madbacadda"],
  authors: [{ name: "SNPA" }],
  openGraph: {
    title: "SNPA Print Intelligence",
    description: "Official Print Services for the Republic of Somaliland",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
