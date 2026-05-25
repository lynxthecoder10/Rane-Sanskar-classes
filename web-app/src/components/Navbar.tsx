import Link from "next/link";
import { default as NextImage } from "next/image";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white font-sans border-b-4 border-[#c21e17]">
      {/* Tier 1: Top Black Mini-Bar */}
      <div className="w-full bg-[#111111] text-white text-xs py-1 px-4 flex justify-between items-center font-medium">
        <div className="flex items-center gap-2">
          <span className="text-red-600 text-sm">🏛️</span>
          <span>Welcome to Ranes Sanskar Classes</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/student-login" className="text-[#ff3b00] font-bold hover:underline transition-all">
            Student Login
          </Link>
          <Link href="/careers" className="text-[#ff3b00] font-bold hover:underline transition-all">
            Careers
          </Link>
          {/* Native Inline SVGs for social */}
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4 ml-2 text-slate-400">
            <svg className="w-3.5 h-3.5 hover:text-white cursor-pointer fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            <svg className="w-3.5 h-3.5 hover:text-white cursor-pointer fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Identity Core Branding Row */}
      <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-3 items-center">
        {/* Left Side: Anniversary Emblem Seal */}
        <div className="flex justify-start">
          <div className="relative w-24 h-24 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-center text-xs p-1 shadow-md border-2 border-amber-400 bg-gradient-to-b from-amber-700 to-red-800">
            CELEBRATING 29th ANNIVERSARY
          </div>
        </div>

        {/* Center: Main Institutional Logo */}
        <div className="flex justify-center">

          <Link href="/" className="relative w-[320px] h-[70px] block mx-auto my-4 hover:opacity-90 transition-opacity">
            <NextImage
              src="/logo1.png"
              alt="Ranes Sanskar Classes Logo"
              fill
              priority
              unoptimized
              className="object-contain object-center"
            />
          </Link>

        </div>

        {/* Right Side: Stacking Contact Numbers */}
        <div className="flex justify-end items-center gap-3">
          <div className="p-2.5 bg-red-50 rounded-full border border-orange-200 text-[#ff3b00]">
            <Phone className="w-6 h-6 fill-current" />
          </div>
          <div className="text-right">
            <div className="text-sm font-black text-[#0b2545] tracking-tight">+91 70212 72046</div>
            <div className="text-sm font-black text-[#0b2545] tracking-tight">+91 93263 45479</div>
          </div>
        </div>
      </div>

      {/* Tier 3: Nav links */}
      <div className="w-full bg-slate-50 border-t border-slate-200 flex justify-between items-center pl-6 font-semibold text-sm">
        <div className="flex gap-8 text-[#0b2545]">
          <Link href="/" className="text-[#c21e17] py-3.5 px-1 font-bold">HOME</Link>
          <Link href="#about" className="hover:text-[#c21e17] py-3.5 transition-all">ABOUT</Link>
          <Link href="#courses" className="hover:text-[#c21e17] py-3.5 transition-all">COURSES</Link>
          <Link href="#results" className="hover:text-[#c21e17] py-3.5 transition-all">TEST SERIES</Link>
          <Link href="#contact" className="hover:text-[#c21e17] py-3.5 transition-all">CONTACT</Link>
        </div>
        <Link href="#enquiry" className="bg-[#c21e17] hover:bg-[#a01610] text-white text-xs font-black uppercase tracking-wider py-4 px-8 transition-colors shadow-inner self-stretch flex items-center">
          Admission Enquiry
        </Link>
      </div>
    </header>
  );
}
