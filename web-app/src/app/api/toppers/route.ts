import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("toppers")
      .select("id, name, rank_position, score_percentage, year, stream, avatar_url")
      .order("year", { ascending: false })
      .order("rank_position", { ascending: true })
      .limit(10);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, toppers: data ?? [] }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, error: "Could not load toppers." }, { status: 500 });
  }
}
