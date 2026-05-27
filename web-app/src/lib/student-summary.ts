import type { SupabaseClient } from "@supabase/supabase-js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

type ActivityLog = {
  activity_date: string;
  minutes_studied: number | null;
};

type TestResult = {
  xp_earned: number | null;
  percentage: number | null;
  subject: string;
  created_at: string;
};

export type PerformancePoint = {
  subject: string;
  percentage: number;
  createdAt: string;
};

export type ActivityPoint = {
  activityDate: string;
  minutesStudied: number;
};

export type StudentSummary = {
  studentName: string;
  batchName: string;
  streakCount: number;
  accumulatedXp: number;
  completedTests: number;
  leaderboardRank: number;
  averagePercentage: number;
  recentSubjects: string[];
  totalStudyMinutes: number;
  weeklyStudyMinutes: number;
  performanceTrend: PerformancePoint[];
  activityTrend: ActivityPoint[];
};

function startOfUtcDay(date: Date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function calculateStreak(logs: ActivityLog[]) {
  let streak = 0;
  let expectedDay = startOfUtcDay(new Date());

  for (const log of logs) {
    const recordDay = startOfUtcDay(new Date(`${log.activity_date}T00:00:00Z`));
    const dayDiff = Math.round((expectedDay - recordDay) / MS_PER_DAY);

    if (streak === 0 && (dayDiff === 0 || dayDiff === 1)) {
      streak = 1;
      expectedDay = recordDay - MS_PER_DAY;
      continue;
    }

    if (streak > 0 && dayDiff === 0) {
      streak++;
      expectedDay = recordDay - MS_PER_DAY;
      continue;
    }

    break;
  }

  return streak;
}

export async function getStudentSummary(
  supabase: SupabaseClient,
  studentId: string
): Promise<StudentSummary> {
  const [profileRes, logsRes, testRes, rankRes] = await Promise.all([
    supabase.from("profiles").select("name, current_batch").eq("id", studentId).single(),
    supabase
      .from("study_activity_logs")
      .select("activity_date, minutes_studied")
      .eq("student_id", studentId)
      .order("activity_date", { ascending: false })
      .limit(60),
    supabase
      .from("test_results")
      .select("xp_earned, percentage, subject, created_at")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false }),
    supabase
      .from("student_rank_snapshots")
      .select("rank_position")
      .eq("student_id", studentId)
      .order("calculated_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (profileRes.error) {
    throw profileRes.error;
  }

  const testResults = (testRes.data ?? []) as TestResult[];
  const activityLogs = (logsRes.data ?? []) as ActivityLog[];
  const accumulatedXp = testResults.reduce((total, result) => total + (result.xp_earned ?? 0), 0);
  const averagePercentage =
    testResults.length > 0
      ? Math.round(
          testResults.reduce((total, result) => total + (result.percentage ?? 0), 0) /
            testResults.length
        )
      : 0;
  const totalStudyMinutes = activityLogs.reduce(
    (total, log) => total + (log.minutes_studied ?? 0),
    0
  );
  const weeklyStudyMinutes = activityLogs
    .slice(0, 7)
    .reduce((total, log) => total + (log.minutes_studied ?? 0), 0);

  return {
    studentName: profileRes.data.name,
    batchName: profileRes.data.current_batch ?? "Unassigned Batch",
    streakCount: calculateStreak(activityLogs),
    accumulatedXp,
    completedTests: testResults.length,
    leaderboardRank: rankRes.data?.rank_position ?? 1,
    averagePercentage,
    recentSubjects: testResults.slice(0, 3).map((result) => result.subject),
    totalStudyMinutes,
    weeklyStudyMinutes,
    performanceTrend: testResults
      .slice(0, 6)
      .reverse()
      .map((result) => ({
        subject: result.subject,
        percentage: Math.round(result.percentage ?? 0),
        createdAt: result.created_at,
      })),
    activityTrend: activityLogs.slice(0, 7).reverse().map((log) => ({
      activityDate: log.activity_date,
      minutesStudied: log.minutes_studied ?? 0,
    })),
  };
}
