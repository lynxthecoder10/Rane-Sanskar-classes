import { Award, Users, BookOpen, UserCheck, FileEdit, Smartphone, Check, HelpCircle, Trophy } from 'lucide-react';

const stats = [
  { icon: Award, value: '29+', label: 'Years of Legacy', text: 'Est. 1997 in Mumbai' },
  { icon: Users, value: '30k+', label: 'Students Mentored', text: 'Shaping career success' },
  { icon: FileEdit, value: '100%', label: 'Board Pass Rate', text: 'SSC & HSC milestones' },
  { icon: Trophy, value: '250+', label: 'Merit List Ranks', text: 'Toppers every year' },
];

const features = [
  {
    icon: UserCheck,
    title: 'Individual Academic Mentorship',
    desc: 'Optimal student batches (maximum 30) ensuring each child gets custom attention, dedicated doubt slots, and targeted guidance.',
  },
  {
    icon: Award,
    title: 'Expert Subject Specialists',
    desc: 'Learn from highly qualified and handpicked educators who possess years of experience in state board, ICSE, and university syllabus coaching.',
  },
  {
    icon: BookOpen,
    title: 'Precision-Engineered Study Materials',
    desc: 'Fully updated, comprehensive study notes, formula sheets, and chapter checklists curated specifically by subject masters.',
  },
  {
    icon: FileEdit,
    title: 'Rigorous Testing & Revision Sheets',
    desc: 'Weekly topic-wise papers, mock prelims, and time-bound test series designed to maximize exam confidence and speed.',
  },
  {
    icon: Smartphone,
    title: 'Transparent Parent-Teacher Ecosystem',
    desc: 'Consistent digital reports covering daily attendance, mock marks, syllabus coverage, and visual progress tracking metrics.',
  },
  {
    icon: Users,
    title: 'Proven Top-Tier Board Results',
    desc: 'A decades-long history of generating top marks across Mumbai, backed by outstanding alumni records in higher education and professional fields.',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Statistics Showcase */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-white hover:shadow-xl hover:shadow-slate-100/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-black text-brand-secondary leading-none">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-sans font-extrabold text-brand-secondary/85 mt-2 leading-none">
                  {s.label}
                </div>
                <div className="text-[10px] sm:text-xs font-sans text-brand-gray mt-1 leading-none">
                  {s.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            <span>The Sanskar Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-secondary tracking-tight">
            Why Rane's Sanskar Classes Stands Apart
          </h2>
          <p className="text-brand-gray font-sans text-sm sm:text-base leading-relaxed">
            Education goes beyond reading textbooks. Our decades of success stem from a highly disciplined, nurturing system designed to unlock each student's peak potential.
          </p>
        </div>

        {/* Feature Infographics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 p-8 rounded-3xl hover:border-brand-primary/15 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="bg-slate-50 group-hover:bg-brand-primary/5 text-brand-primary w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="font-display font-extrabold text-brand-secondary text-lg sm:text-xl leading-snug group-hover:text-brand-primary transition-colors duration-300">
                      {f.title}
                    </h3>
                    <p className="text-brand-gray font-sans text-xs sm:text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-sans font-bold text-brand-primary mt-6 tracking-wide group-hover:translate-x-0.5 transition-transform duration-300 uppercase">
                  <span>Elite standard</span>
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
