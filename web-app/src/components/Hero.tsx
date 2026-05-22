import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full bg-brand-light overflow-hidden">
      {/* Background Pattern / Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-white"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-block bg-brand-primary/10 text-brand-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-2">
              No. 1 Coaching Classes in Santacruz
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-brand-dark leading-tight">
              Shape Your Child's <br />
              <span className="text-brand-primary">Future Today.</span>
            </h1>
            <p className="text-lg text-brand-gray md:pr-10 leading-relaxed">
              For over 29 years, we have achieved a perfect balance between knowledge, wisdom, and individual attention to shape the leaders of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
              <Link href="/courses" className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl text-center">
                Explore Courses
              </Link>
              <Link href="/success-stories" className="w-full sm:w-auto bg-white border-2 border-brand-light hover:border-brand-primary hover:text-brand-primary text-brand-dark px-8 py-4 rounded-full font-bold transition-all text-center">
                View Success Stories
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            {/* Image Placeholder with modern styling */}
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students Learning" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-4 border border-brand-light">
              <div className="bg-brand-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">
                29+
              </div>
              <div>
                <div className="font-bold text-brand-dark">Years of Excellence</div>
                <div className="text-sm text-brand-gray">Trusted by parents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
