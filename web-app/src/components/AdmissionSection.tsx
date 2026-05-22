import EnquiryForm from '@/components/EnquiryForm';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function AdmissionSection() {
  return (
    <section id="admission" className="py-20 bg-gradient-to-br from-brand-dark to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-brand-primary/20 text-brand-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            Admissions Open 2026–27
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Enrol Your Child Today
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Take the first step towards academic excellence. Fill in the form and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-5">
              <h3 className="text-white font-bold text-xl mb-4">Contact Us Directly</h3>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/20 p-3 rounded-xl flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <div className="text-white font-semibold">Call / WhatsApp</div>
                  <a href="tel:+919820045000" className="text-gray-300 hover:text-brand-primary transition-colors">+91 98200 45000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/20 p-3 rounded-xl flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <div className="text-white font-semibold">Visit Us</div>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    Rane&apos;s Sanskar Classes,<br />
                    Santacruz (W), Mumbai
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-primary/20 p-3 rounded-xl flex-shrink-0">
                  <Clock className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <div className="text-white font-semibold">Office Hours</div>
                  <div className="text-gray-300 text-sm">Mon – Sat: 9 AM – 8 PM</div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919820045000?text=Hello%2C%20I%20am%20interested%20in%20admission%20at%20Rane's%20Sanskar%20Classes."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-brand-dark mb-6">Enquiry Form</h3>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
