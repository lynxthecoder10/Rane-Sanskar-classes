'use client';

import { useEffect, useState } from 'react';
import { Quote, Star, Users } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mrs. Meera Sharma',
    child: 'Class 10 (SSC Board)',
    rating: 5,
    quote: "Rane's Sanskar gave my son the confidence and disciplined study habit to secure 96.40% in his boards! The teachers treat every student like their own child.",
  },
  {
    id: 2,
    name: 'Mr. Vijay Patel',
    child: 'Class 12 (HSC Commerce)',
    rating: 5,
    quote: 'The daily revision schedules and specialized mock prelim exams prepared my daughter perfectly. Her scores improved dramatically within just three months.',
  },
  {
    id: 3,
    name: 'Ms. Rekha Desai',
    child: 'Class 9 (ICSE Division)',
    rating: 5,
    quote: 'Optimal batch sizes make an immense difference. My child receives dedicated individual doubt-solving and academic mentoring that larger classes fail to provide.',
  },
  {
    id: 4,
    name: 'Mr. Suresh Nair',
    child: 'CA Foundation prep',
    rating: 5,
    quote: "Highly structured training at competitive fees — they deliver on every single academic promise. My son cleared CA Foundation in his very first attempt.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % testimonials.length);
        setAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const t = testimonials[current];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden" id="testimonials">
      {/* Decorative Organic Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-5 h-[500px] w-[500px] rounded-full bg-brand-primary/5 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Parent Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Trusted by Over 30,000 Families
          </h2>
        </div>

        {/* Large Testimonial Quote Card */}
        <div className="relative">
          {/* Decorative Large Background Quote Icon */}
          <div className="absolute -top-10 -left-6 sm:-left-12 opacity-5 text-brand-primary pointer-events-none">
            <Quote className="w-24 h-24 stroke-[3px]" />
          </div>

          <div
            className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 sm:p-14 text-center transition-all duration-300 ${
              animating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Glowing Stars Rating Row */}
            <div className="flex justify-center gap-1.5 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-accent fill-brand-accent drop-shadow-md shadow-brand-accent/25" />
              ))}
            </div>

            {/* Testimonial Quote Text using Playfair Display for key messaging */}
            <blockquote className="text-slate-100 text-lg sm:text-2xl font-display font-medium leading-relaxed italic mb-8 max-w-3xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Testimonial Author & Child Info */}
            <div className="space-y-1">
              <cite className="font-sans font-bold text-white text-base sm:text-lg not-italic block">
                {t.name}
              </cite>
              <span className="text-brand-primary font-sans font-bold text-xs uppercase tracking-wider block">
                Parent of {t.child} Student
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Slider Dots */}
        <div className="flex justify-center items-center gap-2.5 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current 
                  ? 'bg-brand-primary w-8 shadow-sm shadow-brand-primary/25' 
                  : 'bg-white/20 hover:bg-white/40 w-2'
              }`}
              aria-label={`Show review ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
