import { default as NextImage } from "next/image";

export default function DirectorMessage() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-b-4 border-[#0b2545]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#0b2545] tracking-tight uppercase mb-4">
            Message from the Founder
          </h2>
          <div className="w-24 h-2 bg-[#c21e17] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Framed Founder Portrait */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Heavy Academic Gold Border Frame */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] overflow-hidden shadow-xl border-8 border-amber-400 bg-slate-100">
              <NextImage
                src="/prof-rane.png"
                alt="Prof. Santosh Rane - Founder & Managing Director"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top"
              />
              {/* Overlay Label for Name Stability */}
              <div className="absolute bottom-0 inset-x-0 bg-[#0b2545] border-t-4 border-[#c21e17] p-4 text-center">
                <h4 className="text-xl font-black text-white uppercase tracking-wide">
                  Prof. Santosh Rane
                </h4>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mt-1">
                  Founder & Managing Director
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Legacy details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-slate-50 p-8 border-l-8 border-[#c21e17] shadow-sm">
              <h3 className="text-2xl md:text-3xl font-black text-[#0b2545] uppercase tracking-tight mb-4">
                29+ Years of Proven Teaching Mastery in Santacruz
              </h3>
              <p className="text-slate-700 font-bold text-lg leading-relaxed mb-6">
                Welcome to Rane Sanskar Classes. For nearly three decades, our mission has been singular: to break down complex concepts into crystal-clear milestones and build unshakable academic confidence in every student.
              </p>
              <p className="text-slate-700 font-medium text-base leading-relaxed mb-6">
                We don&apos;t believe in rote learning. We believe in strict personalized tracking, conceptual clarity, and dedicated mentorship. Out of our physical coaching centers right here in Santacruz, Mumbai, we have mentored thousands of alumni to top board rankings and successful professional careers.
              </p>
              
              <div className="flex items-center gap-4 mt-8">
                <span className="text-sm font-black text-[#c21e17] uppercase tracking-widest">
                  Building Careers Since 1997
                </span>
                <div className="h-[2px] flex-grow bg-slate-300"></div>
              </div>
            </div>

            {/* Core Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                "Strict Personalized Tracking",
                "Absolute Conceptual Clarity",
                "Highly Experienced Faculty",
                "Proven Board Results"
              ].map((pillar) => (
                <div key={pillar} className="bg-white border-2 border-[#0b2545] p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-3 h-3 bg-[#c21e17] rounded-sm"></div>
                  <span className="font-bold text-[#0b2545] uppercase text-sm">{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
