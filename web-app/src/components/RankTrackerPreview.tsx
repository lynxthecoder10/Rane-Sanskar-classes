import { getStudentSummary, type StudentSummary } from "@/lib/student-summary";
import { createClient } from "@/utils/supabase/server";
import RankTrackerPreviewClient from "@/components/RankTrackerPreviewClient";

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

  return <RankTrackerPreviewClient user={user} />;
}
