import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateEnquiry } from "@/lib/validation";

// Uses Service Role only on the SERVER — never exposed to client
// This bypasses RLS, so we must validate everything manually before inserting
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // 1. Parse body safely
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    // 2. Server-side validation — never trust the client
    const result = validateEnquiry(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 422 });
    }

    // 3. Insert clean, validated data only
    const { error } = await supabaseAdmin
      .from("enquiries")
      .insert([result.data]);

    if (error) {
      console.error("[API] Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Could not save your enquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[API] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
