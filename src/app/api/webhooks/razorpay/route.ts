import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;

    if (event === "subscription.charged") {
      const subscriptionId = body.payload.subscription.entity.id;
      
      const { error } = await supabase
        .from("subscribers")
        .update({ status: "active" })
        .eq("razorpay_subscription_id", subscriptionId);

      if (error) {
        console.error("Webhook Supabase update error:", error);
      }
    } else if (event === "subscription.cancelled") {
      const subscriptionId = body.payload.subscription.entity.id;
      
      const { error } = await supabase
        .from("subscribers")
        .update({ plan: "free", status: "unsubscribed" })
        .eq("razorpay_subscription_id", subscriptionId);

      if (error) {
        console.error("Webhook Supabase update error:", error);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
