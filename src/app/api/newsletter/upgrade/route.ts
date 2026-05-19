import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { email, razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await req.json();

    if (!email || !razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const body = razorpay_payment_id + "|" + razorpay_subscription_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Upsert into Supabase
    const { error: dbError } = await supabase
      .from("subscribers")
      .upsert(
        {
          email: email,
          plan: "paid",
          status: "active",
          razorpay_subscription_id: razorpay_subscription_id
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    // Send confirmation email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL || "info@histobit.com";

    if (resendApiKey) {
      const emailHtml = `
        <div style="background-color: #faf5ee; padding: 48px; font-family: Arial, sans-serif; color: #3a302a;">
          <h1 style="font-family: 'EB Garamond', serif; font-size: 32px; font-style: italic; color: #3a302a; margin-bottom: 24px;">Welcome to The War Room.</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">Your paid subscription is confirmed. Every week you'll receive exclusive military history content that never appears on YouTube or the blog.</p>
          <a href="https://histobit.com/blog" style="display: inline-block; background-color: #c2652a; color: #faf5ee; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">Read the Archive →</a>
        </div>
      `;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: resendFromEmail,
            to: email,
            subject: "You're in — The War Room dispatch starts now",
            html: emailHtml
          })
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Continue even if email fails
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Upgrade error:", error);
    return NextResponse.json({ error: "Failed to upgrade subscription" }, { status: 500 });
  }
}
