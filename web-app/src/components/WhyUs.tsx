import { Award, Users, BookOpen, UserCheck, FileEdit, Smartphone } from 'lucide-react';

const stats = [
  { icon: Award, value: '29+', label: 'Years of Excellence' },
  { icon: Users, value: '5000+', label: 'Students Shaped' },
  { icon: FileEdit, value: '98%', label: 'SSC/HSC Pass Rate' },
  { icon: Award, value: '100+', label: 'Distinctions Yearly' },
];

const features = [
  {
    icon: Award,
    title: '29 Years of Academic Glory',
    desc: 'Since 1997, we have been a trusted name in education, nurturing students from primary to higher secondary levels with proven results.',
  },
  {
    icon: Users,
    title: 'Expert & Experienced Faculties',
    desc: 'Learn from highly qualified and handpicked teachers who possess deep subject expertise and a passion for teaching.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Study Material',
    desc: 'Well-researched, perfect study materials and notes designed by experts to ensure complete syllabus coverage and conceptual clarity.',
  },
  {
    icon: UserCheck,
    title: 'Individual Attention',
    desc: 'We maintain optimal batch sizes to ensure every student receives personal focus, doubt-solving sessions, and academic mentoring.',
  },
  {
    icon: FileEdit,
    title: 'Strict Testing Pattern',
    desc: 'Regular weekly chapter-wise tests, prelims, and rigorous mock exams to build confidence and prepare students for board patterns.',
  },
  {
    icon: Smartphone,
    title: 'Parent Updates & Tracking',
    desc: 'Parents are consistently kept in the loop regarding student attendance, test marks, and overall academic progress via SMS/App.',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-brand-light border border-gray-100">
              <s.icon className="w-8 h-8 text-brand-primary mx-auto mb-3" />
              <div className="text-3xl font-black text-brand-dark">{s.value}</div>
              <div className="text-sm text-brand-gray font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Why Us / Best of Sanskar */}
        <div className="text-center mb-16">
          <div className="inline-block bg-brand-primary/10 text-brand-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            The Sanskar Difference
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4 uppercase tracking-tight">
            Best of Sanskar Classes!!
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full mb-6"></div>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto">
            For nearly three decades, we&apos;ve built an ecosystem that guarantees student success through discipline, expertise, and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 hover:border-brand-primary/30 hover:shadow-xl transition-all group flex flex-col items-center text-center">
              <div className="bg-white group-hover:bg-brand-primary/10 p-5 rounded-2xl transition-colors mb-6 shadow-sm">
                <f.icon className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="font-bold text-brand-dark text-xl mb-4 leading-tight">{f.title}</h3>
              <p className="text-brand-gray leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
