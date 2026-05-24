import Link from 'next/link';
import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo Brand Info */}
          <div className="space-y-6 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-brand-primary text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md shadow-brand-primary/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white">
                  RANE'S
                </span>
                <span className="font-display font-bold text-[10px] tracking-widest leading-none text-brand-primary mt-1">
                  SANSKAR CLASSES
                </span>
              </div>
            </Link>
            <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed max-w-xs">
              Since 1997, pioneering academic legacy and premium scholastic mentorship for thousands of successful student achievements in Santacruz, Mumbai.
            </p>
          </div>

          {/* Column 1: Office Address */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white/5 border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-5">
              <MapPin className="w-5 h-5 text-brand-primary" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-4">Location Address</h4>
            <address className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed not-italic">
              24/187 & 24/190 OM CHS, Anand Nagar,<br />
              Near Vakola Police Station,<br />
              Santacruz (East), Mumbai - 400055
            </address>
          </div>

          {/* Column 2: Admissions Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white/5 border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-5">
              <Phone className="w-5 h-5 text-brand-primary" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-4">Phone Support</h4>
            <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed">
              <a href="tel:+917021272046" className="hover:text-brand-primary transition-colors font-bold">+91 70212 72046</a><br />
              <a href="tel:+919326345479" className="hover:text-brand-primary/80 transition-colors text-white/50 text-xs font-semibold block mt-1">+91 93263 45479</a>
            </p>
          </div>

          {/* Column 3: Email & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white/5 border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-5">
              <Mail className="w-5 h-5 text-brand-primary" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-4">Online Enquiries</h4>
            <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed mb-5">
              <a href="mailto:info@ranessankarclasses.com" className="hover:text-brand-primary transition-colors">info@ranessankarclasses.com</a>
            </p>
            {/* Social Links Row */}
            <div className="flex space-x-3.5">
              <a href="#" className="bg-white/5 hover:bg-brand-primary border border-white/10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="bg-white/5 hover:bg-brand-primary border border-white/10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="bg-white/5 hover:bg-brand-primary border border-white/10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Sub Links */}
        <div className="border-t border-slate-900 pt-8 text-center text-slate-500 text-xs sm:text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Rane&apos;s Sanskar Classes. All Rights Reserved.</p>
          <div className="flex items-center justify-center flex-wrap gap-4 font-sans font-medium text-slate-400">
            <a 
              href="https://ranessanskarclasses.classpro.in/people/2619689/events" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Student Portal (Classpro) ↗
            </a>
            <span className="text-slate-800">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-800">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
