import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { password, subject, html_content } = await req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!subject || !html_content) {
      return NextResponse.json(
        { error: "Subject and HTML content are required" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { data: draft, error } = await supabase
      .from("newsletter_drafts")
      .insert({
        subject,
        html_content,
        status: "draft",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to save draft:", error);
      return NextResponse.json({ error: "Failed to save draft" }, { status: 500 });
    }

    return NextResponse.json({ success: true, draft });
  } catch (err) {
    console.error("Save draft error:", err);
    return NextResponse.json({ error: "Failed to save draft" }, { status: 500 });
  }
}
