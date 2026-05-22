import { createClient } from '@/utils/supabase/server';
import { BookOpen, Clock, Award, FileText } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark mb-2">Welcome back!</h1>
          <p className="text-brand-gray text-lg">Here's an overview of your academic progress.</p>
        </div>
      </div>

      {/* Classpro Student Portal CTA */}
      <div className="bg-gradient-to-r from-brand-primary to-orange-500 rounded-3xl p-8 text-white shadow-xl flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 text-center lg:text-left">
          <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            Associated Portal
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-2">Classpro Student Portal</h2>
          <p className="text-white/95 max-w-xl font-medium text-sm md:text-base">
            Check your personalized lecture events, test schedules, batch timings, and live notifications directly on the official Classpro portal.
          </p>
        </div>
        <a
          href="https://ranessanskarclasses.classpro.in/people/2619689/events"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-brand-primary hover:bg-brand-light hover:-translate-y-0.5 font-black px-8 py-4 rounded-full shadow-lg transition-all flex-shrink-0 text-center w-full lg:w-auto relative z-10 flex items-center justify-center gap-2"
        >
          <span>Go to Classpro Events</span>
          <span className="text-lg">↗</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Recent Resources', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
          { title: 'Tests Completed', value: '4', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Upcoming Classes', value: '2', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
          { title: 'Achievements', value: '1', icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-black text-brand-dark">{stat.value}</div>
              <div className="text-sm font-medium text-brand-gray">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-brand-dark mb-6">Latest Announcements</h2>
          <div className="space-y-6">
            {[
              { title: 'Mid-term schedule released', date: 'Oct 15', new: true },
              { title: 'Physics extra doubt solving session', date: 'Oct 12', new: false },
              { title: 'Maths assignment 4 deadline extended', date: 'Oct 10', new: false },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-16 flex-shrink-0 text-sm font-bold text-brand-gray pt-1">{item.date}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-brand-dark">{item.title}</p>
                    {item.new && <span className="bg-brand-primary text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">New</span>}
                  </div>
                  <p className="text-sm text-brand-gray mt-1">Please check the resources section for detailed information.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-brand-dark">Recently Uploaded Notes</h2>
            <button className="text-sm font-bold text-brand-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Chemistry Ch-4: Carbon Compounds', type: 'PDF', size: '2.4 MB' },
              { title: 'Maths Algebra Practice Set 3', type: 'PDF', size: '1.1 MB' },
              { title: 'English Grammar Tenses Rules', type: 'DOCX', size: '0.8 MB' },
            ].map((note, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-primary/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">{note.title}</p>
                    <p className="text-xs text-brand-gray font-medium">{note.type} • {note.size}</p>
                  </div>
                </div>
                <button className="text-brand-gray hover:text-brand-primary font-semibold text-sm">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
