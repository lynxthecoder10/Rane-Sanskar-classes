import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { EnquiryValidationSchema } from "@/lib/schemas";

export const runtime = "nodejs";

function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase service configuration.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
    }

    const validationResult = EnquiryValidationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    const sanitizedData = validationResult.data;

    const { data: enquiry, error: dbError } = await supabaseAdmin
      .from("enquiries")
      .insert([{ ...sanitizedData, status: "new" }])
      .select("id")
      .single();

    if (dbError) {
      console.error("[API] Supabase insert error:", dbError.message);
      return NextResponse.json(
        { success: false, error: "Could not save your enquiry. Please try again." },
        { status: 500 }
      );
    }

    const { error: notificationError } = await supabaseAdmin.from("notification_events").insert([
      {
        event_type: "lead.created",
        payload: {
          enquiry_id: enquiry.id,
          student_name: sanitizedData.student_name,
          phone: sanitizedData.phone,
          stream: sanitizedData.stream_selected,
        },
      },
    ]);

    if (notificationError) {
      console.error("[API] Notification event insert error:", notificationError.message);
    }

    return NextResponse.json({ success: true, enquiry_id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal system processing failure." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: "Method not allowed." }, { status: 405 });
}
