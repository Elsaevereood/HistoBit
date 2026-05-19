import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
      }
      // Reactivate if unsubscribed
      await supabase
        .from("subscribers")
        .update({ status: "active" })
        .eq("email", email);
    } else {
      // Insert new subscriber
      const { error: insertError } = await supabase.from("subscribers").insert({
        email,
        plan: "free",
        status: "active",
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return NextResponse.json({ error: "Failed to save subscriber" }, { status: 500 });
      }
    }

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "newsletter@histobit.com",
        to: email,
        subject: "Welcome to The Dispatch — Histobit",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #faf5ee; color: #3a302a;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #c2652a; margin-bottom: 24px;">HISTOBIT · THE DISPATCH</div>
            <h1 style="font-style: italic; font-weight: 400; font-size: 32px; line-height: 1.2; margin: 0 0 24px 0;">
              Welcome to The Dispatch.
            </h1>
            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.8; color: #3a302a; margin: 0 0 16px 0;">
              You're in. Every week, you'll receive one deep-dive into military history — the battles, the logistics, the commanders, and the decisions that changed the world.
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.8; color: #8a7a6e; margin: 0 0 32px 0;">
              No mythology. No filler. Just history told the way it deserves.
            </p>
            <a href="https://histobit.com/blog" style="display: inline-block; background: #c2652a; color: #faf5ee; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px; font-weight: 500;">
              Read the Archive →
            </a>
            <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #d8d0c8; font-family: Arial, sans-serif; font-size: 12px; color: #8a7a6e;">
              You subscribed at histobit.com. To unsubscribe, reply to this email with "unsubscribe".
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.warn("Failed to send welcome email:", emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
