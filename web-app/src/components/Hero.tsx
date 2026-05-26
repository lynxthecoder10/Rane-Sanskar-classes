'use client';

import Link from 'next/link';

const STREAM_LINKS = [
  { label: 'XI-XII Commerce', slug: 'xi-xii commerce' },
  { label: 'SYJC Focus', slug: 'syjc focus' },
  { label: 'CA Foundation', slug: 'ca foundation' },
  { label: 'CMA Foundation', slug: 'cma foundation' },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top,#17294a_0%,#0a192f_42%,#070b13_100%)] py-14 text-center sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Massive Centered Headline */}
        <h1 className="max-w-5xl text-4xl font-extrabold tracking-normal text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl uppercase mb-8 leading-snug">
          29 YEARS OF UNRIVALED <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">ACADEMIC EXCELLENCE</span> <br className="hidden sm:block" />
          IN SANTACRUZ, MUMBAI
        </h1>
        
        {/* Full-bleed Sun-Gold Banner Panel */}
        <div className="mb-10 flex w-full justify-center border-y-4 border-[#c52622] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-4 py-4 shadow-[0_18px_44px_rgba(245,158,11,0.18)] sm:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#111111] uppercase tracking-wide m-0 text-center">
            MUMBAI&apos;S NO.1 COACHING CLASSES FOR XI-XII COMMERCE, SYJC & CA/CS FOUNDATION
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
          {/* Stream Buttons */}
          <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-3 pointer-events-auto">
            {STREAM_LINKS.map((stream) => (
              <Link
                key={stream.slug}
                href={`/?stream=${encodeURIComponent(stream.slug)}#enquiry-form`}
                onClick={(e) => {
                  const element = document.getElementById('enquiry-form');
                  if (element) {
                    e.preventDefault();
                    const url = new URL(window.location.href);
                    url.searchParams.set('stream', stream.slug);
                    url.hash = 'enquiry-form';
                    window.history.pushState({}, '', url.toString());
                    window.dispatchEvent(new Event('popstate'));
                    window.dispatchEvent(new Event('enquiry-form-highlight'));
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="z-20 mx-1 inline-flex cursor-pointer select-none items-center rounded-full border border-amber-300/20 bg-[#c52622] px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-[0_10px_28px_rgba(197,38,34,0.28)] transition-all duration-200 ease-out pointer-events-auto hover:-translate-y-0.5 hover:bg-[#9f1711] hover:shadow-[0_14px_34px_rgba(245,158,11,0.16)] active:scale-95 active:bg-opacity-80 sm:text-sm"
              >
                {stream.label}
              </Link>
            ))}
          </div>
          <Link 
            href="/courses" 
            className="w-full select-none border-b-4 border-[#c52622] bg-white/10 px-10 py-4 text-lg font-bold uppercase tracking-wider text-white shadow-lg ring-1 ring-white/15 transition-all hover:bg-white/15 hover:shadow-xl active:scale-95 active:bg-opacity-80 sm:w-auto"
          >
            Explore Streams
          </Link>
          <Link 
            href="/#admission" 
            className="w-full select-none border-b-4 border-amber-400 bg-[#c52622] px-10 py-4 text-lg font-bold uppercase tracking-wider text-white shadow-lg shadow-[#c52622]/20 transition-all hover:bg-[#9f1711] hover:shadow-xl active:scale-95 active:bg-opacity-80 sm:w-auto"
          >
            Join the Legacy
          </Link>
        </div>
        
      </div>
    </section>
  );
}
