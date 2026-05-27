import Link from 'next/link';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';
import { getStudentSummary, type StudentSummary } from '@/lib/student-summary';
import { formatPortalDate, getClassVideos, getStudyMaterials } from '@/lib/portal-content';
import {
  Award,
  BookOpen,
  CalendarDays,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Flame,
  PlayCircle,
  TrendingUp,
  Zap,
} from 'lucide-react';

async function loadDashboardSummary(supabase: SupabaseClient, studentId: string) {
  try {
    return await getStudentSummary(supabase, studentId);
  } catch {
    return null;
  }
}

function MetricCard({
  title,
  value,
  icon: Icon,
  highlight,
}: {
  title: string;
  value: string;
  icon: typeof Zap;
  highlight?: boolean;
}) {
  return (
    <div className="border border-white/10 bg-white/[0.05] p-5 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">{title}</p>
          <p className={highlight ? 'mt-2 text-3xl font-black text-[var(--logo-gold)]' : 'mt-2 text-3xl font-black text-white'}>
            {value}
          </p>
        </div>
        <div className={highlight ? 'bg-[var(--logo-gold)] text-[var(--logo-navy)]' : 'bg-[var(--logo-navy)] text-slate-300'}>
          <Icon className="h-12 w-12 p-3" />
        </div>
      </div>
    </div>
  );
}

function PerformanceChart({ summary }: { summary: StudentSummary }) {
  if (summary.performanceTrend.length === 0) {
    return (
      <div className="border border-dashed border-white/15 bg-white/[0.04] p-8 text-center text-sm font-semibold text-slate-400">
        Test percentage charts will appear after marks are published.
      </div>
    );
  }

  return (
    <div className="grid h-44 grid-cols-3 items-end gap-3 sm:grid-cols-6">
      {summary.performanceTrend.map((point) => (
        <div key={`${point.subject}-${point.createdAt}`} className="flex h-full flex-col justify-end gap-2">
          <div
            className="min-h-3 bg-gradient-to-t from-[var(--logo-crimson)] to-[var(--logo-gold)]"
            style={{ height: `${Math.max(8, point.percentage)}%` }}
          />
          <div className="text-center">
            <p className="text-xs font-black text-white">{point.percentage}%</p>
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-500">{point.subject}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityChart({ summary }: { summary: StudentSummary }) {
  if (summary.activityTrend.length === 0) {
    return (
      <div className="border border-dashed border-white/15 bg-white/[0.04] p-8 text-center text-sm font-semibold text-slate-400">
        Study streak bars will appear after daily activity is logged.
      </div>
    );
  }

  const maxMinutes = Math.max(...summary.activityTrend.map((item) => item.minutesStudied), 1);

  return (
    <div className="grid h-44 grid-cols-7 items-end gap-2">
      {summary.activityTrend.map((point) => {
        const height = Math.max(8, (point.minutesStudied / maxMinutes) * 100);
        const label = new Intl.DateTimeFormat('en-IN', { weekday: 'short' }).format(new Date(`${point.activityDate}T00:00:00Z`));

        return (
          <div key={point.activityDate} className="flex h-full flex-col justify-end gap-2">
            <div
              className="min-h-3 bg-gradient-to-t from-[var(--logo-navy)] to-[var(--logo-crimson)]"
              style={{ height: `${height}%` }}
            />
            <div className="text-center">
              <p className="text-xs font-black text-white">{point.minutesStudied}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const summary = user ? await loadDashboardSummary(supabase, user.id) : null;
  const batchName = summary?.batchName ?? 'Unassigned Batch';
  const [materials, videos] = summary
    ? await Promise.all([
        getStudyMaterials(supabase, batchName, 3),
        getClassVideos(supabase, batchName, 3),
      ])
    : [[], []];

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)]">{batchName}</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight md:text-4xl">
            Welcome back{summary?.studentName ? `, ${summary.studentName}` : ''}
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-300">
            Live XP, streak, test performance, and batch content from Supabase.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden border border-[var(--logo-crimson)]/40 bg-[linear-gradient(135deg,var(--logo-crimson),#7f1211)] p-6 shadow-2xl md:p-8">
        <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--logo-gold)]/15 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
              <CalendarDays className="h-4 w-4" />
              Associated Portal
            </span>
            <h2 className="mt-4 text-2xl font-black uppercase md:text-3xl">ClassPro Student Portal</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/90">
              Check lecture events, test schedules, batch timings, and live notifications on the official ClassPro portal.
            </p>
          </div>
          <a
            href="https://ranessanskarclasses.classpro.in/people/2619689/events"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-[var(--logo-crimson)] transition hover:bg-[var(--logo-gold)] hover:text-[var(--logo-navy)]"
          >
            Go to ClassPro
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {summary ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard title="Earned XP" value={summary.accumulatedXp.toLocaleString('en-IN')} icon={Zap} highlight />
            <MetricCard title="Tests Completed" value={summary.completedTests.toString()} icon={BookOpen} />
            <MetricCard title="Study Streak" value={`${summary.streakCount} days`} icon={Flame} highlight={summary.streakCount > 0} />
            <MetricCard title="Batch Rank" value={`#${summary.leaderboardRank}`} icon={Award} highlight />
            <MetricCard title="Average" value={`${summary.averagePercentage}%`} icon={TrendingUp} highlight={summary.averagePercentage >= 85} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="border border-white/10 bg-white/[0.05] p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Performance Percentage</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-400">Recent test result trend</p>
                </div>
                <div className="text-3xl font-black text-[var(--logo-gold)]">{summary.averagePercentage}%</div>
              </div>
              <PerformanceChart summary={summary} />
            </section>

            <section className="border border-white/10 bg-white/[0.05] p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Study Activity</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-400">Last seven logged study days</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[var(--logo-gold)]">{summary.weeklyStudyMinutes}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">minutes</p>
                </div>
              </div>
              <ActivityChart summary={summary} />
            </section>
          </div>
        </>
      ) : (
        <div className="border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
          <Clock className="mx-auto h-10 w-10 text-[var(--logo-gold)]" />
          <h2 className="mt-4 text-xl font-black uppercase tracking-tight">Portal sync pending</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-400">
            Your live metrics will appear when your approved student profile and activity records are available.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="border border-white/10 bg-white/[0.05] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Recently Uploaded Notes</h2>
              <p className="mt-1 text-sm font-semibold text-slate-400">Filtered to your active batch</p>
            </div>
            <Link href="/dashboard/resources" prefetch className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)] hover:text-white">
              View All
            </Link>
          </div>

          {materials.length > 0 ? (
            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between gap-4 border border-white/10 bg-[var(--logo-navy)]/70 p-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--logo-crimson)] text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">{material.title}</p>
                      <p className="text-xs font-semibold text-slate-400">
                        {material.subject} / {formatPortalDate(material.published_at)}
                      </p>
                    </div>
                  </div>
                  <a href={material.download_url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-slate-400 transition hover:text-[var(--logo-gold)]">
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/15 bg-white/[0.04] p-8 text-center text-sm font-semibold text-slate-400">
              No published materials for this batch yet.
            </div>
          )}
        </section>

        <section className="border border-white/10 bg-white/[0.05] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Latest Class Videos</h2>
              <p className="mt-1 text-sm font-semibold text-slate-400">Lecture replays and explanations</p>
            </div>
            <Link href="/dashboard/videos" prefetch className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)] hover:text-white">
              View All
            </Link>
          </div>

          {videos.length > 0 ? (
            <div className="space-y-3">
              {videos.map((video) => (
                <a key={video.id} href={video.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 border border-white/10 bg-[var(--logo-navy)]/70 p-4 transition hover:border-[var(--logo-gold)]/60">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--logo-gold)] text-[var(--logo-navy)]">
                      <PlayCircle className="h-5 w-5 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">{video.title}</p>
                      <p className="text-xs font-semibold text-slate-400">
                        {video.subject} / {formatPortalDate(video.published_at)}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 shrink-0 text-slate-400" />
                </a>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/15 bg-white/[0.04] p-8 text-center text-sm font-semibold text-slate-400">
              No published class videos for this batch yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
