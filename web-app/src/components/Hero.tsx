import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50/50 py-16 lg:py-24">
      {/* Decorative Premium Glow Background */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-12 -z-10 h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & High Impact Hooks */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/10 text-brand-primary font-semibold px-4 py-2 rounded-full text-xs sm:text-sm tracking-wide shadow-sm shadow-brand-primary/2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>29+ Years of Academic Excellence</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-brand-secondary leading-[1.1]">
              Shape Your Child's <br />
              <span className="relative inline-block text-brand-primary mt-1">
                Future Today.
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-primary/10 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-brand-gray max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Since 1997, we have pioneered educational excellence in Santacruz, Mumbai. By matching small batches with personal mentorship, we inspire students to achieve outstanding results.
            </p>

            {/* Quick trust flags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2 text-xs sm:text-sm font-semibold text-brand-secondary/85">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
                <span>Max 30 Students Batch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-5 h-5 text-brand-primary" />
                <span>30,000+ Alumni Guided</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/courses" 
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore Our Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link 
                href="/#admission" 
                className="w-full sm:w-auto bg-white border border-slate-200 hover:border-brand-primary text-brand-secondary hover:text-brand-primary px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md text-center"
              >
                Schedule Free Demo
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Asymmetric Visual Grid */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            {/* Primary Portrait Card Container */}
            <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 z-10 transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students Collaborating in Rane's Sanskar Classes" 
                className="w-full h-full object-cover transition-scale duration-700 hover:scale-105"
              />
            </div>
            
            {/* Floating Card 1: Flags Topper score */}
            <div className="absolute -top-6 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100/50 flex items-center gap-3.5 z-20 animate-bounce-slow">
              <div className="bg-brand-accent/15 p-2 rounded-xl">
                <Trophy className="w-6 h-6 text-brand-accent" />
              </div>
              <div>
                <div className="font-display font-black text-brand-secondary text-sm sm:text-base leading-none">99.20%</div>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-brand-gray">SSC Board Topper</span>
              </div>
            </div>

            {/* Floating Card 2: Legacy Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100/50 flex items-center gap-4.5 z-20">
              <div className="w-12 h-12 bg-brand-primary text-white rounded-xl flex flex-col items-center justify-center font-display font-extrabold text-lg shadow-md shadow-brand-primary/10">
                29+
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-brand-secondary leading-none">Years of Legacy</span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-brand-gray mt-1">Santacruz's Most Trusted</span>
              </div>
            </div>

            {/* Mini Trust Star Box */}
            <div className="absolute bottom-24 -right-6 bg-slate-900 text-white py-2 px-3 rounded-xl shadow-lg flex items-center gap-1.5 z-20">
              <Star className="w-4 h-4 text-brand-accent fill-brand-accent" />
              <span className="font-sans font-bold text-xs">5.0 Parent Rating</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
