'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full bg-[#fdfdfc] py-20 overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Massive Centered Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-normal leading-snug text-[#0b2545] uppercase mb-8 drop-shadow-sm max-w-5xl">
          29 YEARS OF UNRIVALED <br className="hidden sm:block" />
          <span className="text-[#c21e17]">ACADEMIC EXCELLENCE</span> <br className="hidden sm:block" />
          IN SANTACRUZ, MUMBAI
        </h1>
        
        {/* Full-bleed Sun-Gold Banner Panel */}
        <div className="w-full bg-gradient-to-r from-[#ffca28] to-[#ff9800] py-4 px-6 shadow-md border-y-4 border-[#0b2545] flex justify-center mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#111111] uppercase tracking-wide m-0 text-center">
            MUMBAI'S NO.1 COACHING CLASSES FOR XI-XII COMMERCE, SYJC & CA/CS FOUNDATION
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
          {/* Stream Buttons */}
          <div className="relative z-10 block pointer-events-auto flex flex-wrap gap-3 justify-center mt-4">
            {['XI-XII Commerce', 'SYJC Focus', 'CA Foundation', 'CMA Foundation'].map((stream) => (
              <button
                key={stream}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('enquiry-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL search params cleanly
                    const url = new URL(window.location.href);
                    url.searchParams.set('stream', stream.toLowerCase());
                    window.history.pushState({}, '', url.toString());
                    
                    // Trigger a custom event or dispatch if EnquiryForm needs immediate re-validation
                    window.dispatchEvent(new Event('popstate'));
                  }
                }}
                className="cursor-pointer pointer-events-auto z-20 px-4 py-2 bg-[#c21e17] text-white rounded-full transition-all hover:scale-105 inline-block mx-1 hover:bg-[#a01510]"
              >
                {stream}
              </button>
            ))}
          </div>
          <Link 
            href="/courses" 
            className="w-full sm:w-auto bg-[#0b2545] hover:bg-slate-800 text-white px-10 py-4 font-bold text-lg uppercase tracking-wider border-b-4 border-[#c21e17] transition-all shadow-lg hover:shadow-xl"
          >
            Explore Streams
          </Link>
          <Link 
            href="/#admission" 
            className="w-full sm:w-auto bg-[#c21e17] hover:bg-[#a01510] text-white px-10 py-4 font-bold text-lg uppercase tracking-wider border-b-4 border-[#0b2545] transition-all shadow-lg hover:shadow-xl"
          >
            Join the Legacy
          </Link>
        </div>
        
      </div>
    </section>
  );
}
