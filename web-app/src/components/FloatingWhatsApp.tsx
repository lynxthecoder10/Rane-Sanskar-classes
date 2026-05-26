'use client';

import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    const showTimer = setTimeout(() => setShow(true), 2000);
    
    // Stop aggressive pulsing after 10 seconds to avoid distracting users
    const pulseTimer = setTimeout(() => setPulsing(false), 12000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 animate-fade-in group md:bottom-6 md:right-6 md:z-50">
      
      {/* Dynamic Hover Tooltip Message */}
      <div className="bg-slate-900 text-white font-sans font-bold text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-white/5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 hidden sm:block">
        Need assistance? Let&apos;s chat!
      </div>

      {/* Breathing WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/917021272046?text=Hello%20Rane%27s%20Sanskar%20Classes%20-%20I%20would%20like%20more%20information%20about%20admissions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Rane's Sanskar Classes"
        className="relative flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-6 w-6 fill-white flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:rotate-6"
        >
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.735 5.47 2.018 7.773L0 32l8.466-2.217A15.937 15.937 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 01-6.763-1.843l-.484-.289-5.024 1.315 1.34-4.888-.317-.502A13.271 13.271 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.88c-.398-.199-2.356-1.162-2.72-1.295-.366-.133-.631-.199-.898.199-.266.399-1.031 1.295-1.264 1.561-.232.266-.465.298-.863.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.024-.614.175-.812.179-.178.398-.465.597-.697.199-.232.266-.398.399-.664.133-.266.066-.498-.033-.697-.1-.199-.898-2.164-1.23-2.963-.324-.777-.653-.672-.898-.684l-.765-.013c-.266 0-.698.1-.1064.498-.365.398-1.396 1.362-1.396 3.32 0 1.959 1.43 3.851 1.629 4.117.2.266 2.814 4.296 6.817 6.026.953.411 1.697.657 2.277.84.957.304 1.828.261 2.517.158.767-.114 2.356-.963 2.689-1.893.333-.93.333-1.727.233-1.893-.099-.166-.365-.266-.763-.465z" />
        </svg>

        {/* Breathing Halo Ping Ring */}
        {pulsing && (
          <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-30 pointer-events-none" />
        )}
      </a>
    </div>
  );
}
