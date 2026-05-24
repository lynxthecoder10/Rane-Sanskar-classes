'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/#about",        label: "About Us"    },
  { href: "/#courses",      label: "Courses"     },
  { href: "/#results",      label: "Results"     },
  { href: "/#faculty",      label: "Faculty"     },
  { href: "/#testimonials", label: "Reviews"     },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-md" : "bg-white/60 backdrop-blur-sm py-5"
      }`}
    >
      {/* Top info bar — only on desktop */}
      <div className="hidden md:block bg-[#0f172a] text-white/80 text-xs py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center font-sans">
          <span>📍 Santacruz (East), Mumbai — <span className="text-[#ff3115] font-bold">Admissions Open 2026–27</span></span>
          <div className="flex items-center gap-5">
            <a
              href="https://ranessanskarclasses.classpro.in/people/2619689/events"
              target="_blank" rel="noopener noreferrer"
              className="hover:text-[#ff3115] transition-colors font-semibold"
            >
              🎓 Student Portal ↗
            </a>
            <span className="opacity-30">|</span>
            <Link href="/login" className="hover:text-[#ff3115] transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span
              className="text-2xl font-bold text-[#0f172a] leading-none group-hover:text-[#ff3115] transition-colors duration-300"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Rane&apos;s Sanskar
            </span>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5 font-sans">
              Classes · Est. 1997
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold text-slate-600 hover:text-[#ff3115] transition-colors duration-300 group py-1 font-sans"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff3115] rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+917021272046"
            className="text-sm font-semibold text-slate-700 hover:text-[#ff3115] transition-colors flex items-center gap-1.5 font-sans"
          >
            <Phone className="w-4 h-4 text-[#ff3115]" />
            +91 70212 72046
          </a>
          <Link
            href="/#admission"
            className="bg-[#ff3115] hover:bg-[#e41f05] text-white text-sm font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-sans glow-red-hover"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-xl transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 px-6 py-6 shadow-xl space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex justify-between items-center py-3 px-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-semibold font-sans text-sm hover:text-[#ff3115] transition-colors"
            >
              {link.label}
              <span className="text-slate-300">→</span>
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href="https://ranessanskarclasses.classpro.in/people/2619689/events"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#ff3115] text-[#ff3115] py-3 rounded-full font-bold text-sm font-sans hover:bg-[#ff3115] hover:text-white transition-all"
            >
              🎓 Student Portal ↗
            </a>
            <a
              href="tel:+917021272046"
              className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-sm font-bold font-sans text-slate-800"
            >
              <Phone className="w-4 h-4 text-[#ff3115]" /> +91 70212 72046
            </a>
            <Link
              href="/#admission"
              onClick={() => setMobileOpen(false)}
              className="block bg-[#ff3115] hover:bg-[#e41f05] text-white text-center py-3.5 rounded-full font-bold text-sm font-sans transition-colors shadow-md"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
