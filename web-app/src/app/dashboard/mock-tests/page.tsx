import { AlertCircle, Award, Clock, FileQuestion, TrendingUp } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { formatPortalDate } from '@/lib/portal-content';

type TestResultRow = {
  id: string;
  subject: string;
  marks_obtained: number;
  total_marks: number;
  percentage: number | null;
  created_at: string;
};

export default async function MockTestUI() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = user
    ? await supabase
        .from('test_results')
        .select('id, subject, marks_obtained, total_marks, percentage, created_at')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
    : { data: [] };

  const results = (data ?? []) as TestResultRow[];
  const average =
    results.length > 0
      ? Math.round(results.reduce((total, result) => total + (result.percentage ?? 0), 0) / results.length)
      : 0;

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)]">Assessment Center</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight">Mock Tests</h1>
          <p className="mt-2 text-sm font-semibold text-slate-300">
            Practice assignments and published test analytics from your live profile.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 border border-[var(--logo-gold)]/25 bg-[var(--logo-gold)]/10 p-4">
        <AlertCircle className="h-6 w-6 shrink-0 text-[var(--logo-gold)]" />
        <div>
          <h3 className="font-bold text-white">Live assignments only</h3>
          <p className="mt-1 text-sm font-semibold text-slate-300">
            Upcoming tests appear here after the academic team publishes them for your batch.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="overflow-hidden border border-white/10 bg-white/[0.05] shadow-xl">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-xl font-black uppercase tracking-tight">Available Tests</h2>
          </div>
          <div className="p-6">
            <div className="flex min-h-48 items-center justify-center border border-dashed border-white/15 bg-white/[0.04]">
              <div className="text-center">
                <FileQuestion className="mx-auto mb-3 h-10 w-10 text-[var(--logo-gold)]" />
                <p className="font-semibold text-slate-300">No active mock test is assigned to this batch right now.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border border-white/10 bg-white/[0.05] shadow-xl">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 p-6">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Performance Analytics</h2>
              <p className="mt-1 text-sm font-semibold text-slate-400">Recent published results</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-[var(--logo-gold)]">{average}%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">average</p>
            </div>
          </div>
          <div className="p-6">
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.id} className="flex items-center justify-between gap-4 border border-white/10 bg-[var(--logo-navy)]/70 p-4">
                    <div>
                      <p className="font-semibold text-white">{result.subject}</p>
                      <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {formatPortalDate(result.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={(result.percentage ?? 0) >= 85 ? 'text-xl font-black text-[var(--logo-gold)]' : 'text-xl font-black text-white'}>
                        {Math.round(result.percentage ?? 0)}%
                      </div>
                      <div className="text-xs font-bold text-slate-400">
                        {result.marks_obtained}/{result.total_marks}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-48 items-center justify-center border border-dashed border-white/15 bg-white/[0.04]">
                <div className="text-center">
                  <Award className="mx-auto mb-3 h-10 w-10 text-slate-500" />
                  <p className="font-semibold text-slate-300">Complete tests to generate your performance chart.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {results.length > 0 && (
        <div className="border border-white/10 bg-white/[0.05] p-6 shadow-xl">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[var(--logo-gold)]" />
            <h2 className="text-xl font-black uppercase tracking-tight">Recent Result Trend</h2>
          </div>
          <div className="grid h-40 grid-cols-2 items-end gap-3 sm:grid-cols-5">
            {results.slice().reverse().map((result) => (
              <div key={result.id} className="flex h-full flex-col justify-end gap-2">
                <div
                  className="min-h-3 bg-gradient-to-t from-[var(--logo-crimson)] to-[var(--logo-gold)]"
                  style={{ height: `${Math.max(8, result.percentage ?? 0)}%` }}
                />
                <p className="truncate text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {result.subject}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
