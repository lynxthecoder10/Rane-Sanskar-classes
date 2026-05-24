import EnquiryForm from '@/components/EnquiryForm';
import { Phone, MapPin, Clock, MessageSquareCode, Sparkles } from 'lucide-react';

export default function AdmissionSection() {
  return (
    <section id="admission" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glowing Organic Gradients */}
      <div className="absolute top-0 right-0 -z-5 h-[400px] w-[400px] rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-5 h-[450px] w-[450px] rounded-full bg-brand-accent/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enrollment Open 2026–27</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Secure Your Child's Academic Success
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            Begin the journey towards outstanding achievements today. Submit your inquiry below, and our academic mentors will get in touch with you within 24 hours.
          </p>
        </div>

        {/* 2-Column Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Premium Contact Info Blocks */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 sm:p-10 space-y-8 flex-grow">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide">
                Direct Contact Office
              </h3>
              
              <div className="space-y-6">
                
                {/* Contact Card: Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-2xl flex-shrink-0 transition-colors group-hover:bg-brand-primary/20">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/80 font-sans font-bold text-xs sm:text-sm uppercase tracking-wide">
                      Admissions Desk
                    </div>
                    <div className="flex flex-col font-sans font-bold text-sm sm:text-base text-white">
                      <a href="tel:+917021272046" className="hover:text-brand-primary transition-colors">+91 70212 72046</a>
                      <a href="tel:+919326345479" className="hover:text-brand-primary transition-colors text-white/70 text-xs sm:text-sm font-semibold mt-1">+91 93263 45479</a>
                    </div>
                  </div>
                </div>

                {/* Contact Card: Address */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-2xl flex-shrink-0 transition-colors group-hover:bg-brand-primary/20">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/80 font-sans font-bold text-xs sm:text-sm uppercase tracking-wide">
                      Main Center Address
                    </div>
                    <address className="font-sans text-sm text-slate-300 not-italic leading-relaxed">
                      Rane&apos;s Sanskar Classes,<br />
                      Santacruz (East), Mumbai - 400055
                    </address>
                  </div>
                </div>

                {/* Contact Card: Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="bg-brand-primary/10 border border-brand-primary/20 p-3 rounded-2xl flex-shrink-0 transition-colors group-hover:bg-brand-primary/20">
                    <Clock className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/80 font-sans font-bold text-xs sm:text-sm uppercase tracking-wide">
                      Office Timings
                    </div>
                    <span className="font-sans text-sm text-slate-300 block">
                      Monday – Saturday: 9:00 AM – 8:00 PM
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Premium WhatsApp Button Card */}
            <a
              href="https://wa.me/917021272046?text=Hello%2C%20I%20am%20interested%20in%20admission%20at%20Rane's%20Sanskar%20Classes."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold py-4.5 px-6 rounded-[24px] transition-all duration-300 shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:shadow-emerald-950/30 text-center text-sm"
            >
              <MessageSquareCode className="w-5 h-5" />
              <span>Connect Instant on WhatsApp</span>
            </a>
          </div>

          {/* Right Column: Premium Form Card container */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl text-slate-900 border border-slate-100 flex flex-col justify-center">
            <div className="space-y-2 mb-8">
              <h3 className="font-display font-extrabold text-2xl text-brand-secondary tracking-tight">
                Submit Inquiry Form
              </h3>
              <p className="text-brand-gray font-sans text-xs sm:text-sm">
                Provide student details below, and an expert counsellor will review and schedule a free demo session.
              </p>
            </div>
            
            <EnquiryForm />
          </div>

        </div>
      </div>
    </section>
  );
}
