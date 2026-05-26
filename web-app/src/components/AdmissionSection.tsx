import EnquiryForm from '@/components/EnquiryForm';
import { Phone, MapPin, Clock, MessageSquareCode, Sparkles } from 'lucide-react';
import type { StandardOption } from '@/lib/course-options';

type AdmissionSectionProps = {
  initialStandard?: StandardOption | '';
};

export default function AdmissionSection({ initialStandard = '' }: AdmissionSectionProps) {
  return (
    <section id="admission" className="relative overflow-hidden bg-[#070b13] py-20 text-white sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Enrollment Open 2026-27</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Secure Your Child&apos;s Academic Success
          </h2>
          <p className="font-sans text-sm leading-relaxed text-slate-300 sm:text-base">
            Begin the journey towards outstanding achievements today. Submit your inquiry below, and our academic mentors will get in touch with you within 24 hours.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="flex-grow space-y-8 rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-10">
              <h3 className="font-display text-xl font-bold tracking-wide text-white sm:text-2xl">
                Direct Contact Office
              </h3>

              <div className="space-y-6">
                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-2xl border border-brand-primary/20 bg-brand-primary/10 p-3 transition-colors group-hover:bg-brand-primary/20">
                    <Phone className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-sans text-xs font-bold uppercase tracking-wide text-white/80 sm:text-sm">
                      Admissions Desk
                    </div>
                    <div className="flex flex-col font-sans text-sm font-bold text-white sm:text-base">
                      <a href="tel:+917021272046" className="transition-colors hover:text-amber-300">+91 70212 72046</a>
                      <a href="tel:+919326345479" className="mt-1 text-xs font-semibold text-white/70 transition-colors hover:text-amber-300 sm:text-sm">+91 93263 45479</a>
                    </div>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-2xl border border-brand-primary/20 bg-brand-primary/10 p-3 transition-colors group-hover:bg-brand-primary/20">
                    <MapPin className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-sans text-xs font-bold uppercase tracking-wide text-white/80 sm:text-sm">
                      Main Center Address
                    </div>
                    <address className="font-sans text-sm not-italic leading-relaxed text-slate-300">
                      Rane&apos;s Sanskar Classes,<br />
                      Santacruz (East), Mumbai - 400055
                    </address>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-2xl border border-brand-primary/20 bg-brand-primary/10 p-3 transition-colors group-hover:bg-brand-primary/20">
                    <Clock className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-sans text-xs font-bold uppercase tracking-wide text-white/80 sm:text-sm">
                      Office Timings
                    </div>
                    <span className="block font-sans text-sm text-slate-300">
                      Monday - Saturday: 9:00 AM - 8:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/917021272046?text=Hello%2C%20I%20am%20interested%20in%20admission%20at%20Rane's%20Sanskar%20Classes."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-[24px] bg-emerald-600 px-6 py-4 text-center font-sans text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-950/30 active:scale-95"
            >
              <MessageSquareCode className="h-5 w-5" />
              <span>Connect Instant on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-col justify-center rounded-[28px] border border-amber-300/30 bg-white p-6 text-slate-900 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-10 lg:col-span-7">
            <div className="mb-8 space-y-2">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-brand-secondary">
                Submit Inquiry Form
              </h3>
              <p className="font-sans text-xs text-brand-gray sm:text-sm">
                Provide student details below, and an expert counsellor will review and schedule a free demo session.
              </p>
            </div>

            <EnquiryForm initialStandard={initialStandard} />
          </div>
        </div>
      </div>
    </section>
  );
}
