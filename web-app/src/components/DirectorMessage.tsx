'use client';

import { useState } from 'react';
import { ChevronDown, Target, Eye, Quote, Sparkles } from 'lucide-react';

export default function DirectorMessage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('mission');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      {/* Decorative Organic Elements */}
      <div className="absolute top-1/2 right-0 -z-5 h-[350px] w-[350px] rounded-full bg-brand-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Name Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[360px] sm:max-w-[400px] aspect-[4/5] bg-slate-50 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.01] z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Prof. Ramesh Rane, Managing Director of Rane's Sanskar Classes" 
                className="w-full h-full object-cover transition-scale duration-700 hover:scale-105"
              />
              {/* Profile Meta Info */}
              <div className="absolute bottom-0 left-0 p-8 text-white z-20 space-y-1">
                <cite className="font-display font-black text-xl sm:text-2xl not-italic leading-none">Prof. Ramesh Rane</cite>
                <div className="text-brand-primary font-sans font-bold text-xs uppercase tracking-wider mt-1">Founder & Managing Director</div>
              </div>
            </div>
            
            {/* Background Decorative Asymmetric Box */}
            <div className="absolute -z-5 top-8 -right-4 w-full h-full bg-brand-primary/5 border border-brand-primary/10 rounded-[32px] hidden sm:block" />
          </div>

          {/* Right Column: Mission and Legacy Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage & Vision</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-secondary tracking-tight leading-snug">
                Building Careers & Shaping Futures Since 1997
              </h2>
            </div>
            
            <p className="text-brand-gray font-sans text-sm sm:text-base leading-relaxed">
              When Rane&apos;s Sanskar Classes first opened its doors, our mission was defined by a singular promise: to deliver exceptionally high-quality education backed by pure dedication and personal attention. Nearly three decades later, that commitment is stronger than ever. We focus on bridging rigorous scholastic training with individual child development.
            </p>

            {/* Accordions */}
            <div className="space-y-4 pt-2">
              
              {/* Mission Accordion */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-slate-50 transition-all duration-300">
                <button 
                  onClick={() => toggleAccordion('mission')}
                  className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-primary/5 p-2.5 rounded-xl text-brand-primary border border-brand-primary/10">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-base sm:text-lg text-brand-secondary">
                      Our Academic Mission
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-brand-gray transition-transform duration-300 ${openAccordion === 'mission' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'mission' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 text-brand-gray font-sans text-xs sm:text-sm leading-relaxed border-t border-slate-50 bg-white">
                    To deliver premium, conceptual training and build strong study practices that empower every student to secure absolute academic distinction while fostering character and ethical intelligence.
                  </div>
                </div>
              </div>

              {/* Vision Accordion */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-slate-50 transition-all duration-300">
                <button 
                  onClick={() => toggleAccordion('vision')}
                  className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-primary/5 p-2.5 rounded-xl text-brand-primary border border-brand-primary/10">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-base sm:text-lg text-brand-secondary">
                      Our Future Vision
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-brand-gray transition-transform duration-300 ${openAccordion === 'vision' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'vision' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 text-brand-gray font-sans text-xs sm:text-sm leading-relaxed border-t border-slate-50 bg-white">
                    To stand as Mumbai&apos;s leading learning center, celebrated for modern pedagogy, maximum student support channels, and a nurturing environment that encourages lifelong learning.
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
