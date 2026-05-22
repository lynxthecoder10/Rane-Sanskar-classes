'use client';

import { useState } from 'react';
import { ChevronDown, Target, Eye } from 'lucide-react';

export default function DirectorMessage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('mission');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[3/4] md:aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Replace src with actual founder image later */}
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Director of Rane's Sanskar Classes" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-black text-2xl">Mr. Rane</p>
                <p className="text-brand-primary font-bold">Founder & Director</p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-brand-primary/10 rounded-3xl"></div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary tracking-widest uppercase mb-2">Rane's Sanskar Classes</h2>
              <h3 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight">
                No. 1 Coaching Classes in <span className="text-brand-primary">Santacruz</span>
              </h3>
            </div>
            
            <p className="text-brand-gray text-lg leading-relaxed">
              When Rane's Sanskar Classes first opened its doors in 1997, our goal was simple: to provide high-quality education that genuinely cares for the student's progress. Today, with thousands of successful alumni, our commitment remains stronger than ever. We don't just teach subjects; we shape careers and build futures.
            </p>

            {/* Accordions */}
            <div className="space-y-4 pt-4">
              
              {/* Mission */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 transition-all">
                <button 
                  onClick={() => toggleAccordion('mission')}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary">
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl text-brand-dark">Our Mission</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-brand-gray transition-transform duration-300 ${openAccordion === 'mission' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'mission' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-brand-gray leading-relaxed border-t border-gray-100 bg-white">
                    To impart quality education and instil strong moral values in our students, empowering them to achieve academic excellence and become responsible, capable individuals ready to face future challenges.
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 transition-all">
                <button 
                  onClick={() => toggleAccordion('vision')}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-secondary/10 p-3 rounded-xl text-brand-secondary">
                      <Eye className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl text-brand-dark">Our Vision</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-brand-gray transition-transform duration-300 ${openAccordion === 'vision' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'vision' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-brand-gray leading-relaxed border-t border-gray-100 bg-white">
                    To be the leading educational institution in Mumbai, recognized for our unwavering commitment to student success, innovative teaching methods, and a nurturing environment that fosters lifelong learning.
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
