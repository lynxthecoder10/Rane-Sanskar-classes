import { getStudentSummary, type StudentSummary } from "@/lib/student-summary";
import { createClient } from "@/utils/supabase/server";
import RankTrackerPreviewClient from "@/components/RankTrackerPreviewClient";

async function loadPreviewSummary(): Promise<StudentSummary | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return await getStudentSummary(supabase, user.id);
  } catch {
    return null;
  }
}

export default async function RankTrackerPreview() {
  const summary = await loadPreviewSummary();

  return <RankTrackerPreviewClient summary={summary} />;
}
