import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Address */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-brand-primary" />
            </div>
            <h4 className="text-xl font-bold mb-4">Address</h4>
            <p className="text-gray-400">
              24/187 & 24/190 OM CHS, Anand Nagar<br />
              near Vakola Police Station.<br />
              Santacruz(E), Mumbai-400055
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Phone className="w-6 h-6 text-brand-primary" />
            </div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-gray-400">
              <a href="tel:+917021272046" className="hover:text-brand-primary transition-colors">+91 70212 72046</a><br />
              <a href="tel:+919326345479" className="hover:text-brand-primary transition-colors">+91 93263 45479</a>
            </p>
          </div>

          {/* Email & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-brand-primary" />
            </div>
            <h4 className="text-xl font-bold mb-4">Email & Social</h4>
            <p className="text-gray-400 mb-6">
              <a href="mailto:info@ranessankarclasses.com" className="hover:text-brand-primary transition-colors">info@ranessankarclasses.com</a>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-brand-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-brand-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-brand-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Rane's Sanskar Classes. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4 flex items-center justify-center flex-wrap">
            <a href="https://ranessanskarclasses.classpro.in/people/2619689/events" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold text-gray-300 transition-colors mr-4">
              Student Portal ↗
            </a>
            <Link href="/privacy" className="hover:text-white transition-colors mr-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
