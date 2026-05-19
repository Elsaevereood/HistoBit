import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys missing" }, { status: 500 });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify({
        plan_id: planId,
        total_count: 12,
        quantity: 1
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Razorpay subscription error:", data);
      return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
    }

    return NextResponse.json({ subscription_id: data.id }, { status: 200 });

  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
