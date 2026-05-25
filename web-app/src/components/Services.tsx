'use client';

import { useState } from 'react';
import Link from 'next/link';
import { School, GraduationCap, Calculator, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'school', name: 'School Division (VIII-X)' },
  { id: 'college', name: 'Junior College (XI-XII)' },
  { id: 'professional', name: 'Professional (CA/CMA)' },
];

const courses = [
  {
    title: "Secondary Board SSC",
    category: "school",
    desc: "Building Bedrock Foundations for Board Excellence.",
    subjects: ["Algebra", "Geometry", "Science & Tech", "English", "History & Civics", "Geography"],
    features: ["Strictly Capped Batches of 30"],
    icon: School,
    badge: "Class VIII - X",
    accent: "text-rose-600 bg-rose-50 border-rose-100/50",
  },
  {
    title: "ICSE & CBSE Board Division",
    category: "school",
    desc: "Building Bedrock Foundations for Board Excellence.",
    subjects: ["Algebra", "Geometry", "Science & Tech", "English", "History & Civics", "Geography"],
    features: ["Strictly Capped Batches of 30"],
    icon: Sparkles,
    badge: "Class VIII - X",
    accent: "text-amber-600 bg-amber-50 border-amber-100/50",
  },
  {
    title: "Science Junior College",
    category: "college",
    desc: "Nurturing Stream Specializations & Career Paths.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    features: ["Regular performance tracking reports synced directly with parents"],
    icon: GraduationCap,
    badge: "Class XI & XII",
    accent: "text-blue-600 bg-blue-50 border-blue-100/50",
  },
  {
    title: "Commerce Junior College",
    category: "college",
    desc: "Nurturing Stream Specializations & Career Paths.",
    subjects: ["Book Keeping & Accountancy (BK)", "Economics", "Organisation of Commerce (OCM)", "Secretarial Practice (SP)", "Mathematics & Statistics"],
    features: ["Regular performance tracking reports synced directly with parents"],
    icon: TrendingUp,
    badge: "Class XI & XII",
    accent: "text-emerald-600 bg-emerald-50 border-emerald-100/50",
  },
  {
    title: "CA Foundation Prep",
    category: "professional",
    desc: "The Launchpad for Future Chartered Professionals.",
    subjects: ["Principles and Practice of Accounting", "Business Laws", "Business Mathematics", "Logical Reasoning & Statistics", "Business Economics"],
    features: ["Intensive past-10-years paper drills and dedicated doubt-solving hubs"],
    icon: Calculator,
    badge: "ICAI Entrance",
    accent: "text-indigo-600 bg-indigo-50 border-indigo-100/50",
  },
  {
    title: "CMA Foundation Prep",
    category: "professional",
    desc: "The Launchpad for Future Chartered Professionals.",
    subjects: ["Accounting Fundamentals", "Laws & Ethics Fundamentals", "Business Mathematics & Stats", "Economics Fundamentals"],
    features: ["Speed testing modules", "One-on-one doubt slots", "Revision summary handouts"],
    icon: Sparkles,
    badge: "ICMAI Entrance",
    accent: "text-purple-600 bg-purple-50 border-purple-100/50",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <section className="py-24 bg-slate-50/40 border-y border-slate-100" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Academic Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-secondary tracking-tight">
            Our Elite Coaching Streams
          </h2>
          <p className="text-brand-gray font-sans text-sm sm:text-base leading-relaxed">
            Delivering absolute conceptual clarity. Click or hover on a course card to explore core subjects, exclusive features, and academic Timings.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-14">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-3 rounded-full font-sans font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
                  : 'bg-white border border-slate-200 text-brand-secondary/70 hover:border-slate-300 hover:text-brand-secondary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Dynamic Courses Grid with Progressive Disclosure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredCourses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-6">
                  {/* Top Row: Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${course.accent} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded-full">
                      {course.badge}
                    </span>
                  </div>

                  {/* Title & Core Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-extrabold text-brand-secondary group-hover:text-brand-primary transition-colors duration-300 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-brand-gray leading-relaxed">
                      {course.desc}
                    </p>
                  </div>

                  {/* Expandable Section - Hidden by default, smooth height reveal on hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-[350px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden space-y-5 pt-0 group-hover:pt-4 border-t border-slate-50">
                    
                    {/* Included Subjects */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-sans font-bold text-brand-secondary/65 uppercase tracking-wider block">
                        Core Subjects Covered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.subjects.map((sub, sIdx) => (
                          <span 
                            key={sIdx}
                            className="bg-slate-50 border border-slate-100 text-[10px] sm:text-xs font-semibold font-sans px-2.5 py-1 rounded-lg text-brand-secondary/80"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Course Features */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-sans font-bold text-brand-secondary/65 uppercase tracking-wider block">
                        What&apos;s Included:
                      </span>
                      <div className="space-y-2">
                        {course.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs font-sans text-brand-secondary/80">
                            <CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <Link
                    href="/#admission"
                    className="w-full bg-slate-50 hover:bg-brand-primary/5 border border-slate-100 hover:border-brand-primary/10 text-brand-secondary hover:text-brand-primary py-3 rounded-2xl font-sans font-bold transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm group/btn"
                  >
                    <span>Enquire for Admissions</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
