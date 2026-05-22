'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, X, Menu } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/test-series', label: 'Test Series' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-brand-light shadow-sm">
      {/* Top Bar */}
      <div className="bg-brand-primary text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>📍 Santacruz (W), Mumbai — Admissions Open 2026–27</div>
          <div className="flex items-center space-x-4">
            <a href="https://ranessanskarclasses.classpro.in/people/2619689/events" target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors font-semibold flex items-center gap-1">
              🎓 Student Portal (Classpro) ↗
            </a>
            <span className="text-white/30">|</span>
            <Link href="/login" className="hover:text-brand-light transition-colors font-medium">Admin & Staff Login</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-brand-primary tracking-tight">SANSKAR</span>
          <span className="text-2xl font-bold text-brand-dark tracking-tight">CLASSES</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-brand-dark">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-brand-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+917021272046" className="font-semibold hover:text-brand-primary flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-brand-primary" />
            +91 70212 72046
          </a>
          <Link
            href="/#admission"
            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg text-sm"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-dark p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-light px-4 pb-6 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 border-b border-gray-100 font-medium text-brand-dark hover:text-brand-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="https://ranessanskarclasses.classpro.in/people/2619689/events"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white text-center py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2"
            >
              🎓 Student Portal (Classpro) ↗
            </a>
            <a href="tel:+917021272046" className="flex items-center gap-2 text-brand-dark font-semibold py-1">
              <Phone className="w-4 h-4 text-brand-primary" /> +91 70212 72046
            </a>
            <Link
              href="/#admission"
              onClick={() => setMobileOpen(false)}
              className="bg-brand-primary text-white text-center py-3 rounded-full font-bold"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
