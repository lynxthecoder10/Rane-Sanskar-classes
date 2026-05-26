'use client';

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Award, BookOpen, CheckCircle, Flame, Zap } from "lucide-react";
import type { StudentSummary } from "@/lib/student-summary";

type RankTrackerPreviewClientProps = {
  user: StudentSummary;
};

type StatTone = "gold" | "crimson" | "navy" | "emerald";

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    const duration = 900;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, value]);

  return (
    <span>
      {prefix}{(reduceMotion ? value : display).toLocaleString("en-IN")}{suffix}
    </span>
  );
}

function iconToneClass(tone: StatTone) {
  switch (tone) {
    case "gold":
      return "text-amber-500";
    case "crimson":
      return "text-[#c52622]";
    case "emerald":
      return "text-emerald-600";
    default:
      return "text-[#0a192f]";
  }
}

export default function RankTrackerPreviewClient({ user }: RankTrackerPreviewClientProps) {
  const reduceMotion = useReducedMotion();
  const subjectCount = user.recentSubjects.length || 5;

  const stats = [
    { label: "Batch Rank", value: user.leaderboardRank, prefix: "#", suffix: "", icon: Award, tone: "gold" as const },
    { label: "Earned XP", value: user.accumulatedXp, prefix: "", suffix: " pts", icon: Zap, tone: "gold" as const },
    { label: "Study Streak", value: user.streakCount, prefix: "", suffix: " Days", icon: Flame, tone: "crimson" as const },
    { label: "Tests Completed", value: user.completedTests, prefix: "", suffix: "", icon: CheckCircle, tone: "emerald" as const },
    { label: "Subjects", value: subjectCount, prefix: "", suffix: "", icon: BookOpen, tone: "navy" as const },
  ];

  return (
    <section className="border-y-8 border-[#0a192f] bg-[#fffdf7] py-20" id="rank-tracker">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-6 inline-block border-2 border-[#c52622] bg-white px-6 py-2 text-xs font-black uppercase tracking-widest text-[#c52622] shadow-sm">
            RankForge Premium Integration
          </span>
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-300 opacity-40" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.85)]" />
            </span>
            <span className="text-sm font-semibold text-slate-500">Live Syncing with SANSKAR-DB Engine</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f] md:text-5xl">
            Rane Sanskar <span className="text-[#c52622]">Premium Portal</span>
          </h2>
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-[#0a192f] md:text-base">
            Gamified motivation metrics engineered to drive consistency and academic mastery.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {stats.map((item) => {
            const Icon = item.icon;
            const achievement = item.label === "Earned XP" || item.label === "Study Streak" || item.label === "Batch Rank";

            return (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
                }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className={[
                  "flex cursor-pointer flex-col items-center rounded-[24px] border-4 p-6 text-center transition-all duration-300 hover:scale-[1.03]",
                  achievement
                    ? "border-[#0a192f] bg-gradient-to-b from-white to-amber-50 shadow-[0_16px_34px_rgba(245,158,11,0.12)]"
                    : "border-[#0a192f] bg-white shadow-sm hover:shadow-md",
                ].join(" ")}
              >
                <div className={achievement ? "mb-4 rounded-full border-2 border-amber-300 bg-gradient-to-br from-amber-100 to-yellow-50 p-4" : "mb-4 rounded-full border-2 border-slate-200 bg-slate-100 p-4"}>
                  <Icon size={28} className={iconToneClass(item.tone)} />
                </div>
                <span className="mb-2 text-xs font-black uppercase tracking-widest text-[#c52622]">
                  {item.label}
                </span>
                <span className="text-3xl font-black tracking-tighter text-[#0a192f]">
                  <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-4 border-4 border-[#0a192f] bg-white p-5 text-center shadow-md md:flex-row">
          <div className="flex items-center gap-2 border border-emerald-300 bg-emerald-100 px-3 py-1">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">Gateway Active</span>
          </div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#0a192f]">
            <span className="text-[#c52622]">Instructor Validation Required:</span> All homework uploads are strictly verified before XP allocation.
          </p>
        </div>
      </div>
    </section>
  );
}
