import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rane's Sanskar Classes | Best Coaching in Santacruz, Mumbai",
  description: "29+ years of excellence. Premier coaching classes in Santacruz, Mumbai for SSC, ICSE, CBSE, Commerce & Science. Small batches, expert teachers, proven results. Enquire now!",
  keywords: "coaching classes santacruz, tuition mumbai, SSC coaching, ICSE tuition, 10th coaching mumbai, science commerce tuition",
  manifest: "/manifest.json",
  openGraph: {
    title: "Rane's Sanskar Classes | Best Coaching in Santacruz, Mumbai",
    description: "29+ years of excellence. Trusted by 5000+ families in Mumbai. Enquire for admissions today.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
