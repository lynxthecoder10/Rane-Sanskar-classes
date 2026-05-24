import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calculator, GraduationCap, Laptop, Landmark, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Courses & Programs | Rane's Sanskar Classes, Santacruz Mumbai",
  description: "Expert coaching for SSC, ICSE, CBSE, Commerce (11th & 12th), Science, CA Foundation and Computer courses in Santacruz, Mumbai. Small batches, proven results.",
};

const courses = [
  {
    title: "SSC (5th – 10th)",
    icon: BookOpen,
    color: "text-brand-primary",
    bg: "bg-brand-primary/5",
    border: "border-brand-primary/20",
    subjects: ["Mathematics", "Science", "English", "History & Civics", "Geography"],
    desc: "Comprehensive SSC coaching with focus on board exam preparation, regular tests, and concept clarity.",
    badge: "Most Popular",
  },
  {
    title: "ICSE (5th – 10th)",
    icon: GraduationCap,
    color: "text-brand-secondary",
    bg: "bg-brand-secondary/5",
    border: "border-brand-secondary/20",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English Literature"],
    desc: "In-depth ICSE coaching with strong emphasis on analytical thinking and detailed subject understanding.",
    badge: null,
  },
  {
    title: "Commerce (11th & 12th)",
    icon: Landmark,
    color: "text-brand-accent",
    bg: "bg-brand-accent/5",
    border: "border-brand-accent/20",
    subjects: ["Accounts", "Economics", "Business Studies", "Mathematics", "OC"],
    desc: "Result-oriented commerce coaching that builds strong conceptual and practical knowledge.",
    badge: "High Demand",
  },
  {
    title: "Science (11th & 12th)",
    icon: Calculator,
    color: "text-brand-secondary",
    bg: "bg-brand-secondary/5",
    border: "border-brand-secondary/20",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    desc: "Rigorous science coaching designed for HSC board exams and competitive entrance preparation.",
    badge: null,
  },
  {
    title: "CA Foundation",
    icon: Calculator,
    color: "text-brand-primary",
    bg: "bg-brand-primary/5",
    border: "border-brand-primary/20",
    subjects: ["Principles of Accounting", "Business Laws", "Business Mathematics", "Business Economics"],
    desc: "Structured coaching for ICAI CA Foundation with expert faculty and regular mock tests.",
    badge: null,
  },
  {
    title: "Computer Courses",
    icon: Laptop,
    color: "text-brand-dark",
    bg: "bg-brand-light",
    border: "border-brand-dark/10",
    subjects: ["MS Office", "Tally", "Basic Programming", "Internet & Email"],
    desc: "Practical computer literacy courses for students and working professionals.",
    badge: null,
  },
];

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-dark to-gray-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block bg-brand-primary/20 text-brand-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
              Courses & Programs
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Every Stream. <span className="text-brand-primary">Every Standard.</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Expert coaching from 5th to 12th across SSC, ICSE, Commerce, Science & more.
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className={`bg-white rounded-3xl border-2 ${course.border} p-8 hover:shadow-2xl transition-all hover:-translate-y-1 relative`}
                >
                  {course.badge && (
                    <span className="absolute top-6 right-6 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.badge}
                    </span>
                  )}
                  <div className={`w-14 h-14 ${course.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <course.icon className={`w-7 h-7 ${course.color}`} />
                  </div>
                  <h2 className="text-xl font-black text-brand-dark mb-3">{course.title}</h2>
                  <p className="text-brand-gray mb-5 leading-relaxed">{course.desc}</p>
                  <div className="space-y-2 mb-6">
                    {course.subjects.map(sub => (
                      <div key={sub} className="flex items-center gap-2 text-sm text-brand-gray">
                        <ChevronRight className={`w-4 h-4 ${course.color} flex-shrink-0`} />
                        {sub}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/#admission"
                    className="w-full block text-center bg-brand-dark hover:bg-brand-primary text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Enquire Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-brand-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Not sure which course is right?</h2>
            <p className="text-white/80 mb-8 text-lg">Talk to us — we'll help you choose the perfect program for your child.</p>
            <Link href="/#admission" className="bg-white text-brand-primary font-black px-10 py-4 rounded-full text-lg hover:shadow-xl transition-all inline-block">
              Get Free Counselling
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
