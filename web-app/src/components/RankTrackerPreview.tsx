import { Award, Zap, Flame, CheckCircle, BookOpen } from "lucide-react";
import { getStudentSummary, type StudentSummary } from "@/lib/student-summary";
import { createClient } from "@/utils/supabase/server";

const previewSummary: StudentSummary = {
  studentName: "Sanskar Student",
  batchName: "SYJC Commerce",
  leaderboardRank: 3,
  accumulatedXp: 2750,
  streakCount: 12,
  completedTests: 8,
  averagePercentage: 91,
  recentSubjects: ["Accounts", "Economics", "Maths"],
};

async function loadPreviewSummary() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return previewSummary;
    }

    return await getStudentSummary(supabase, user.id);
  } catch {
    return previewSummary;
  }
}

export default async function RankTrackerPreview() {
  const user = await loadPreviewSummary();
  const subjectCount = user.recentSubjects.length || 5;

  const stats = [
    { label: "Batch Rank", value: `#${user.leaderboardRank}`, icon: <Award size={28} className="text-amber-500" /> },
    { label: "Earned XP", value: `${user.accumulatedXp} pts`, icon: <Zap size={28} className="text-amber-500" /> },
    { label: "Study Streak", value: `${user.streakCount} Days`, icon: <Flame size={28} className="text-[#c21e17]" /> },
    { label: "Tests Completed", value: `${user.completedTests}`, icon: <CheckCircle size={28} className="text-emerald-600" /> },
    { label: "Subjects", value: `${subjectCount}`, icon: <BookOpen size={28} className="text-[#0b2545]" /> },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t-8 border-b-8 border-[#0b2545]" id="rank-tracker">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-black text-[#c21e17] uppercase tracking-widest bg-white border-2 border-[#c21e17] px-6 py-2 shadow-sm mb-6">
            RankForge Premium Integration
          </span>
          <div className="flex items-center justify-center mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse relative inline-block mr-2"></span>
            <span className="text-gray-500 text-sm">Live Syncing with SANSKAR-DB Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0b2545] uppercase">
            Rane Sanskar <span className="text-[#c21e17]">Premium Portal</span>
          </h2>
          <p className="text-[#0b2545] font-bold text-sm md:text-base mt-4 uppercase tracking-wide">
            Gamified motivation metrics engineered to drive consistency and academic mastery.
          </p>
        </div>

        {/* High-Contrast Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-white border-4 border-[#0b2545] p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              <div className="p-4 bg-slate-100 rounded-full mb-4 border-2 border-slate-200">
                {item.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#c21e17] mb-2">
                {item.label}
              </span>
              <span className="text-3xl font-black text-[#0b2545] tracking-tighter">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Anti-Spam / Motivation Subtext Banner */}
        <div className="mt-14 bg-white border-4 border-[#0b2545] p-5 text-center shadow-md max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1 border border-emerald-300">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">Gateway Active</span>
          </div>
          <p className="text-sm font-bold text-[#0b2545] uppercase tracking-wide">
            <span className="text-[#c21e17]">Instructor Validation Required:</span> All homework uploads are strictly verified before XP allocation.
          </p>
        </div>

      </div>
    </section>
  );
}
