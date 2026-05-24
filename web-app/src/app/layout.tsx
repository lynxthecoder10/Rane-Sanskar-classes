import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Prestigious Header Font
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Modern UI & Body Font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rane's Sanskar Classes | 29+ Years of Academic Excellence",
  description: "Premier coaching for SSC, ICSE, CBSE, Science, Commerce, and CA Foundation in Santacruz, Mumbai.",
  keywords: "coaching classes santacruz, tuition mumbai, SSC coaching, ICSE tuition, 10th coaching mumbai, science commerce tuition",
  manifest: "/manifest.json",
  openGraph: {
    title: "Rane's Sanskar Classes | 29+ Years of Academic Excellence",
    description: "Premier coaching for SSC, ICSE, CBSE, Science, Commerce, and CA Foundation in Santacruz, Mumbai.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Rane's Sanskar Classes",
    "description": "29+ years of excellence. Premier coaching classes in Santacruz, Mumbai for SSC, ICSE, CBSE, Commerce & Science.",
    "url": "https://ranessanskarclasses.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santacruz",
      "addressRegion": "Mumbai",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.className} min-h-full flex flex-col bg-[#fcfbf9] text-[#0a0a0c]`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow min-h-screen pt-20">
          {children}
        </main>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
