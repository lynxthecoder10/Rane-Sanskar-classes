import { NextResponse } from "next/server";
import { getStudentSummary } from "@/lib/student-summary";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const analyticsSummary = await getStudentSummary(supabase, user.id);

    return NextResponse.json({ success: true, analyticsSummary }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load student summary.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
