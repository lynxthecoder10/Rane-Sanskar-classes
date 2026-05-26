import Link from "next/link";
import { default as NextImage } from "next/image";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-[#c52622] bg-white/95 font-sans shadow-sm backdrop-blur-xl">
      <div className="hidden w-full justify-between bg-[#07111f] px-4 py-1 text-xs font-medium text-white md:flex">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,183,27,0.65)]" />
          <span>Welcome to Ranes Sanskar Classes</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/student-login" className="font-bold text-[#c52622] transition-all hover:underline">
            Student Login
          </Link>
          <Link href="/careers" className="font-bold text-[#c52622] transition-all hover:underline">
            Careers
          </Link>
          <div className="ml-2 flex items-center gap-3 border-l border-slate-700 pl-4 text-slate-400">
            <svg className="h-3.5 w-3.5 cursor-pointer fill-current hover:text-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            <svg className="h-3.5 w-3.5 cursor-pointer fill-current hover:text-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-2 md:grid md:grid-cols-3 md:items-center md:px-6">
        <div className="hidden justify-start md:flex">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-xl border-2 border-amber-400 bg-gradient-to-b from-amber-600 to-[#9f1711] p-1 text-center text-xs font-black text-white shadow-md">
            CELEBRATING 29th ANNIVERSARY
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/" className="relative my-1 block h-14 w-[240px] max-w-full transition-opacity hover:opacity-90 sm:h-[70px] sm:w-[320px] md:my-4">
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

        <div className="hidden items-center justify-end gap-3 md:flex">
          <div className="rounded-full border border-orange-200 bg-red-50 p-2.5 text-[#c52622]">
            <Phone className="h-6 w-6 fill-current" />
          </div>
          <div className="text-right">
            <div className="text-sm font-black tracking-tight text-[#0a192f]">+91 70212 72046</div>
            <div className="text-sm font-black tracking-tight text-[#0a192f]">+91 93263 45479</div>
          </div>
        </div>
      </div>

      <div className="hidden w-full items-center justify-between border-t border-slate-200 bg-slate-50 pl-6 text-sm font-semibold md:flex">
        <div className="flex gap-8 text-[#0a192f]">
          <Link href="/" className="py-3.5 px-1 font-bold text-[#c52622]">
            HOME
          </Link>
          <Link href="#about" className="py-3.5 transition-all hover:text-[#c52622]">
            ABOUT
          </Link>
          <Link href="#courses" className="py-3.5 transition-all hover:text-[#c52622]">
            COURSES
          </Link>
          <Link href="#results" className="py-3.5 transition-all hover:text-[#c52622]">
            TEST SERIES
          </Link>
          <Link href="#contact" className="py-3.5 transition-all hover:text-[#c52622]">
            CONTACT
          </Link>
        </div>
        <Link href="#enquiry-form" className="flex self-stretch bg-[#c52622] px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-inner transition-colors hover:bg-[#9f1711]">
          Admission Enquiry
        </Link>
      </div>
    </header>
  );
}
