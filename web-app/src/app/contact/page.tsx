import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: "Contact Us | Rane's Sanskar Classes, Santacruz Mumbai",
  description: "Get in touch with Rane's Sanskar Classes. Call, WhatsApp or visit us in Santacruz, Mumbai. Admission enquiries welcome.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-dark to-gray-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Get In <span className="text-brand-primary">Touch</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-xl mx-auto">
              We&apos;re always happy to answer your questions. Reach us by call, WhatsApp, or visit.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                  <h2 className="text-xl font-black text-brand-dark">Contact Information</h2>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 p-3 rounded-xl flex-shrink-0">
                      <Phone className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">Call / WhatsApp</div>
                      <a href="tel:+917021272046" className="text-brand-gray hover:text-brand-primary transition-colors">+91 70212 72046</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 p-3 rounded-xl flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">Email</div>
                      <a href="mailto:info@ranesanskarclasses.com" className="text-brand-gray hover:text-brand-primary transition-colors text-sm">info@ranesanskarclasses.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 p-3 rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">Address</div>
                      <div className="text-brand-gray text-sm leading-relaxed">
                        Rane&apos;s Sanskar Classes,<br />
                        Santacruz (E), Mumbai – 400055
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 p-3 rounded-xl flex-shrink-0">
                      <Clock className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">Office Hours</div>
                      <div className="text-brand-gray text-sm">Mon – Sat: 9:00 AM – 8:00 PM</div>
                      <div className="text-brand-gray text-sm">Sun: 10:00 AM – 1:00 PM</div>
                    </div>
                  </div>
                </div>
                <a
                  href="https://wa.me/917021272046?text=Hello%2C%20I%20am%20interested%20in%20admission%20at%20Rane's%20Sanskar%20Classes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg w-full"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-brand-dark mb-6">Send an Enquiry</h2>
                <EnquiryForm />
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="mt-10 rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-72 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-brand-gray">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-brand-primary" />
                <p className="font-semibold">Rane&apos;s Sanskar Classes</p>
                <p className="text-sm">Santacruz (E), Mumbai – 400055</p>
                <a
                  href="https://maps.google.com/?q=Rane+Sanskar+Classes+Santacruz+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary text-sm font-semibold mt-2 inline-block hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
