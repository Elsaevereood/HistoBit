import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: NextRequest) {
  try {
    const { password, draftId } = await req.json();
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    // Get the draft
    const { data: draft, error: draftError } = await supabase
      .from("newsletter_drafts")
      .select("*")
      .eq("id", draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 });
    }

    // Get all active paid subscribers
    const { data: subscribers, error: subError } = await supabase
      .from("subscribers")
      .select("email, first_name")
      .eq("status", "active")
      .eq("plan", "paid");

    if (subError) {
      return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }

    // Also get free subscribers for this send (free tier gets newsletter too)
    const { data: freeSubscribers } = await supabase
      .from("subscribers")
      .select("email, first_name")
      .eq("status", "active")
      .eq("plan", "free");

    const allSubscribers = [...(subscribers || []), ...(freeSubscribers || [])];

    if (allSubscribers.length === 0) {
      return NextResponse.json({ error: "No active subscribers found" }, { status: 400 });
    }

    // Send to all subscribers
    let sentCount = 0;
    for (const sub of allSubscribers) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: sub.email,
          subject: draft.subject,
          html: draft.html_content,
        });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send to ${sub.email}:`, err);
      }
    }

    // Mark draft as sent
    await supabase
      .from("newsletter_drafts")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", draftId);

    return NextResponse.json({ success: true, sentCount });
  } catch (err) {
    console.error("Send error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
