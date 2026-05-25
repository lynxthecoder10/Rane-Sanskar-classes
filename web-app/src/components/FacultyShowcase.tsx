import Image from 'next/image';
import { Briefcase, GraduationCap } from 'lucide-react';

const facultyMembers = [
  {
    id: 1,
    name: 'Prof. Ramesh Rane',
    title: 'Founder & Managing Director',
    qualification: 'M.Sc. Mathematics',
    experience: '29+ Years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Ms. Anita Sharma',
    title: 'Head of Science Department',
    qualification: 'M.Sc. Physics, B.Ed.',
    experience: '18+ Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Mr. Rohit Patel',
    title: 'Senior Commerce Consultant',
    qualification: 'M.Com, CA Inter',
    experience: '14+ Years',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    name: 'Ms. Neha Gupta',
    title: 'Lead English & ICSE Mentor',
    qualification: 'M.A. English Lit, B.Ed.',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=200&q=80',
  },
];

export default function FacultyShowcase() {
  return (
    <section className="py-24 bg-slate-50/50 border-b border-slate-100" id="faculty">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-secondary tracking-tight">
            Meet Our Expert Faculty
          </h2>
          <p className="text-brand-gray font-sans text-sm sm:text-base leading-relaxed">
            Highly qualified, handpicked educators with extensive board-level expertise, committed to driving exceptional academic outcomes.
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {facultyMembers.map(member => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-primary/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Asymmetric Profile Frame */}
                <div className="relative w-24 h-24 min-w-[96px] min-h-[96px] max-w-[96px] max-h-[96px] rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-6 border-2 border-slate-50 bg-slate-50 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent z-10" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Faculty Info */}
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-brand-secondary text-lg group-hover:text-brand-primary transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-brand-primary font-sans font-bold text-xs sm:text-sm tracking-wide">
                    {member.title}
                  </p>
                </div>

                {/* Qualification Pills */}
                <div className="mt-4 flex items-center justify-center gap-1 text-[11px] font-sans text-brand-gray font-semibold bg-slate-50 border border-slate-100 py-1.5 px-3 rounded-xl mx-auto w-max">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>{member.qualification}</span>
                </div>
              </div>

              {/* Experience Info Container */}
              <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-center gap-2 font-sans font-extrabold text-xs text-brand-secondary/80">
                <Briefcase className="w-4 h-4 text-brand-primary shrink-0" />
                <span>{member.experience} Classroom Experience</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust footer */}
        <p className="text-center text-brand-gray font-sans font-medium mt-12 text-xs sm:text-sm">
          💡 Facilitating learning with over <span className="font-bold text-brand-secondary">60+ qualified subject mentors</span> across all centers.
        </p>
      </div>
    </section>
  );
}
