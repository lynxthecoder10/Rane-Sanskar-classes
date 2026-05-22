import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Users, Heart, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "About Us | Rane's Sanskar Classes — 29 Years of Excellence",
  description: "Learn about Rane's Sanskar Classes — 29+ years of trusted coaching in Santacruz, Mumbai. Our mission, faculty philosophy, and commitment to every student's success.",
};

const values = [
  { icon: Heart, title: "Student First", desc: "Every decision we make centers on what's best for the student — not the institution." },
  { icon: Award, title: "Excellence", desc: "We set high standards and work with each student to achieve them, without exception." },
  { icon: Users, title: "Community", desc: "We treat every family as our own. We've coached three generations of Santacruz families." },
  { icon: Target, title: "Results", desc: "We are proud of our 98%+ pass rate and hundreds of distinctions year after year." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-dark to-gray-800 py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block bg-brand-primary/20 text-brand-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
              Est. 1997 · Santacruz, Mumbai
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              29 Years of <span className="text-brand-primary">Shaping Futures</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              We started with a single classroom and a belief that every student can excel with the right guidance.
              Today, thousands of alumni carry that belief into their professional lives.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black text-brand-dark mb-6">Our Story</h2>
                <div className="space-y-4 text-brand-gray leading-relaxed">
                  <p>
                    Rane&apos;s Sanskar Classes was founded in 1997 by a group of passionate educators who believed that quality coaching should be accessible to every family in Santacruz — not just a privileged few.
                  </p>
                  <p>
                    From humble beginnings in a small room, we have grown into one of the most trusted educational institutions in the area, coaching students across SSC, ICSE, Commerce, Science, and beyond.
                  </p>
                  <p>
                    What has never changed is our philosophy: <strong className="text-brand-dark">small batches, personal attention, and genuine care for every student who walks through our doors.</strong>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "1997", label: "Founded" },
                  { value: "5000+", label: "Students Coached" },
                  { value: "98%+", label: "Pass Rate" },
                  { value: "29+", label: "Years Active" },
                ].map(stat => (
                  <div key={stat.label} className="bg-brand-light rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-brand-primary">{stat.value}</div>
                    <div className="text-sm text-brand-gray font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-brand-dark mb-4">Our Core Values</h2>
              <p className="text-brand-gray text-lg">The principles that guide everything we do.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map(v => (
                <div key={v.title} className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-brand-primary/30 hover:shadow-lg transition-all group flex gap-5">
                  <div className="bg-brand-primary/10 group-hover:bg-brand-primary/20 p-4 rounded-xl h-fit flex-shrink-0 transition-colors">
                    <v.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg mb-2">{v.title}</h3>
                    <p className="text-brand-gray leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-brand-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Become Part of Our Story</h2>
            <p className="text-white/80 text-lg mb-8">Admissions are open for 2026–27. Let your child&apos;s journey begin here.</p>
            <Link href="/#admission" className="bg-white text-brand-primary font-black px-10 py-4 rounded-full text-lg hover:shadow-xl transition-all inline-block">
              Enquire About Admission
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
