"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextIntoWords } from "@/lib/animations";
import { NEWSLETTER } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function NewsletterPage() {
  const preRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  
  const quoteRef = useRef<HTMLDivElement>(null);
  
  const warRoomOverlineRef = useRef<HTMLDivElement>(null);
  const warRoomHeadlineRef = useRef<HTMLHeadingElement>(null);
  const warRoomBodyRef = useRef<HTMLParagraphElement>(null);
  const warRoomToggleRef = useRef<HTMLDivElement>(null);
  const warRoomCardRef = useRef<HTMLDivElement>(null);
  const warRoomBenefitsRef = useRef<HTMLDivElement>(null);
  
  const socialRef = useRef<HTMLDivElement>(null);

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  // Waitlist signup (free tier). Posts to the same subscribers table.
  const [waitEmail, setWaitEmail] = useState("");
  const [waitLoading, setWaitLoading] = useState(false);
  const [waitSuccess, setWaitSuccess] = useState(false);
  const [waitError, setWaitError] = useState("");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitEmail) { setWaitError("Please enter your email"); return; }
    setWaitLoading(true);
    setWaitError("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to join the waitlist");
      setWaitSuccess(true);
    } catch (err) {
      setWaitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setWaitLoading(false);
    }
  };
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = async () => {
    if (!checkoutEmail) return;
    setCheckoutError("");

    const planId = billingCycle === "monthly"
      ? process.env.NEXT_PUBLIC_RAZORPAY_PLAN_MONTHLY
      : process.env.NEXT_PUBLIC_RAZORPAY_PLAN_YEARLY;

    if (!planId) {
      setCheckoutError("Payment is not configured. Please contact support.");
      return;
    }

    try {
      const res = await fetch("/api/newsletter/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      });
      const data = await res.json();
      if (!res.ok || !data.subscription_id) {
        throw new Error(data.error || "Failed to create subscription");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscription_id,
        name: "Histobit — The War Room",
        description: billingCycle === "monthly" ? "Monthly Dispatch — ₹599/month" : "Yearly Dispatch — ₹4,999/year",
        theme: { color: "#c2652a" },
        handler: async function(response: any) {
          const upgradeRes = await fetch("/api/newsletter/upgrade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: checkoutEmail,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const upgradeData = await upgradeRes.json();
          if (upgradeData.success) {
            setPaymentSuccess(true);
          } else {
            setCheckoutError("Payment verified but account activation failed. Please contact support.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment failed", err);
      setCheckoutError(err.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    // HERO ANIMATIONS
    const tl = gsap.timeline({ delay: 0.2 });
    
    if (preRef.current) {
      gsap.set(preRef.current, { y: 16, opacity: 0 });
      tl.to(preRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    }
    
    if (headingRef.current) {
      const words = splitTextIntoWords(headingRef.current);
      if (words && words.length > 0) {
        tl.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.055,
          ease: "power3.out",
        }, ">");
      }
    }
    
    if (subRef.current) {
      gsap.set(subRef.current, { y: 20, opacity: 0 });
      tl.to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, ">");
    }
    
    if (trustRef.current) {
      gsap.set(trustRef.current, { opacity: 0 });
      tl.to(trustRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, ">");
    }

    // DIVIDER WITH QUOTE
    if (quoteRef.current) {
      gsap.set(quoteRef.current, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: quoteRef.current,
        start: "top 85%",
        once: true,
        animation: gsap.to(quoteRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      });
    }

    // WAR ROOM PRICING ANIMATIONS
    if (warRoomOverlineRef.current) {
      gsap.set(warRoomOverlineRef.current, { y: 20, opacity: 0 });
      
      const pricingTl = gsap.timeline({
        scrollTrigger: {
          trigger: warRoomOverlineRef.current,
          start: "top 75%",
          once: true
        }
      });

      pricingTl.to(warRoomOverlineRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
      
      if (warRoomHeadlineRef.current) {
        const words = splitTextIntoWords(warRoomHeadlineRef.current);
        if (words && words.length > 0) {
          pricingTl.to(words, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.055,
            ease: "power3.out"
          }, ">-0.2");
        }
      }

      if (warRoomBodyRef.current) {
        gsap.set(warRoomBodyRef.current, { y: 16, opacity: 0 });
        pricingTl.to(warRoomBodyRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, ">-0.4");
      }

      if (warRoomToggleRef.current) {
        gsap.set(warRoomToggleRef.current, { y: 12, opacity: 0 });
        pricingTl.to(warRoomToggleRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, ">-0.2");
      }

      if (warRoomCardRef.current) {
        gsap.set(warRoomCardRef.current, { y: 40, opacity: 0 });
        pricingTl.to(warRoomCardRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, ">-0.2");
      }

      if (warRoomBenefitsRef.current) {
        const items = warRoomBenefitsRef.current.querySelectorAll('.benefit-item');
        gsap.set(items, { y: 12, opacity: 0 });
        pricingTl.to(items, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, ">-0.3");
      }
    }

    // SOCIAL PROOF ANIMATION
    if (socialRef.current) {
      const cards = socialRef.current.querySelectorAll('.testimonial-card');
      gsap.set(cards, { y: 40, opacity: 0 });
      
      ScrollTrigger.create({
        trigger: socialRef.current,
        start: "top 85%",
        once: true,
        animation: gsap.to(cards, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power2.out" })
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      
      <main style={{ backgroundColor: '#faf5ee', paddingTop: '64px' }}>
        
        {/* SECTION 1: HERO HEADER */}
        <section style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #efd5a8 0%, #f5e6c8 40%, #faf5ee 100%)',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div className="grain-overlay" />
          
          <div style={{ maxWidth: '720px', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div ref={preRef} style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#c2652a',
              fontWeight: 500,
              marginBottom: '20px'
            }}>
              HISTORY & GEOPOLITICS · THE DISPATCH · COMING SOON
            </div>
            
            <h1 ref={headingRef} style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(42px, 5.5vw, 72px)',
              lineHeight: 1.05,
              color: '#3a302a',
              textAlign: 'center',
              margin: 0
            }}>
              Two Disciplines. One Dispatch. Launching Soon.
            </h1>
            
            <p ref={subRef} style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '17px',
              color: '#8a7a6e',
              lineHeight: 1.65,
              maxWidth: '520px',
              margin: '24px auto 0',
              textAlign: 'center'
            }}>
              The Dispatch has not started sending yet. Join the waitlist and you will get the 
              first issue before anyone else. One military history piece and one geopolitics story, 
              explained through a historical lens. No mythology. No filler.
            </p>
            
            <div ref={trustRef} style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '12px',
              color: '#8a7a6e',
              letterSpacing: '0.04em',
              marginTop: '16px',
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <span>No spam</span>
              <span style={{ color: '#d8d0c8' }}>·</span>
              <span>Unsubscribe anytime</span>
              <span style={{ color: '#d8d0c8' }}>·</span>
              <span>Military History</span>
              <span style={{ color: '#d8d0c8' }}>·</span>
              <span>Geopolitics</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: DIVIDER WITH QUOTE */}
        <section style={{ backgroundColor: '#faf5ee', padding: '100px 48px 100px 48px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#c2652a', margin: '0 auto 40px auto' }} />
          
          <div ref={quoteRef}>
            <p style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: '#3a302a',
              lineHeight: 1.4,
              marginBottom: '16px'
            }}>
              "War is not won by armies. It is won by the man who feeds them."
            </p>
            <p style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '13px',
              color: '#8a7a6e'
            }}>
              — Ancient military proverb
            </p>
          </div>
        </section>

        {/* SECTION: WHAT'S INSIDE */}
        <section className="whats-inside-section" style={{ backgroundColor: '#faf5ee', padding: '0 48px 120px 48px', maxWidth: '900px', margin: '0 auto' }}>
          <div className="whats-inside-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            
            {/* Pillar 1 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(216,208,200,0.6)',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 2px 16px rgba(58,48,42,0.04)'
            }}>
              <div style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#c2652a',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                Military History
              </div>
              <h3 style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: 'italic',
                fontSize: '26px',
                color: '#3a302a',
                lineHeight: 1.3,
                marginBottom: '20px',
                fontWeight: 400
              }}>
                Battles, commanders, tactics, and the logistics that decided it all.
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Battles and campaigns', 'Commanders and their decisions', 'Tactics and strategy', 'Logistics — the real reason wars are won'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#c2652a', fontSize: '14px' }}>•</span>
                    <span style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '14px', color: '#6b5c4e', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar 2 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(216,208,200,0.6)',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 2px 16px rgba(58,48,42,0.04)'
            }}>
              <div style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#8c3c3c',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                Geopolitics
              </div>
              <h3 style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: 'italic',
                fontSize: '26px',
                color: '#3a302a',
                lineHeight: 1.3,
                marginBottom: '20px',
                fontWeight: 400
              }}>
                Active conflicts and power shifts — explained through history, not headlines.
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Active conflicts and their roots', 'World events in historical context', 'Power shifts and what caused them', 'Why today looks exactly like before'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#8c3c3c', fontSize: '14px' }}>•</span>
                    <span style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '14px', color: '#6b5c4e', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom note */}
          <p style={{
            fontFamily: 'var(--font-body), Manrope, sans-serif',
            fontSize: '13px',
            color: '#8a7a6e',
            textAlign: 'center',
            marginTop: '28px',
            lineHeight: 1.6
          }}>
            No email until it launches. When it does, one a week. Never more. No algorithm, no noise.
          </p>
        </section>

        {/* WAITLIST SIGNUP — the only live newsletter action until launch */}
        <section style={{ backgroundColor: '#c2652a', padding: '104px 48px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'rgba(250,245,238,0.7)',
              fontWeight: 500,
              marginBottom: '18px'
            }}>
              {NEWSLETTER.overline}
            </div>
            <h2 style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(30px, 4vw, 44px)',
              color: '#faf5ee',
              lineHeight: 1.15,
              margin: '0 0 16px 0'
            }}>
              {NEWSLETTER.heading}
            </h2>
            <p style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(250,245,238,0.8)',
              margin: '0 auto 32px auto',
              maxWidth: '440px'
            }}>
              {NEWSLETTER.promise}
            </p>

            {waitSuccess ? (
              <div style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: 'italic',
                fontSize: '22px',
                color: '#faf5ee'
              }}>
                {NEWSLETTER.success}
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col md:flex-row justify-center items-center" style={{ gap: '12px' }}>
                <input
                  type="email"
                  value={waitEmail}
                  onChange={(e) => setWaitEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full md:w-[320px]"
                  style={{
                    height: '50px',
                    padding: '0 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(250,245,238,0.96)',
                    fontFamily: 'var(--font-body), Manrope, sans-serif',
                    fontSize: '14px',
                    color: '#3a302a',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={waitLoading}
                  className="w-full md:w-auto"
                  style={{
                    height: '50px',
                    padding: '0 28px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#3a302a',
                    color: '#faf5ee',
                    fontFamily: 'var(--font-body), Manrope, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: waitLoading ? 'not-allowed' : 'pointer',
                    opacity: waitLoading ? 0.7 : 1,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {waitLoading ? NEWSLETTER.ctaLoading : NEWSLETTER.cta}
                </button>
              </form>
            )}

            {waitError && (
              <div style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '13px',
                color: '#faf5ee',
                opacity: 0.9,
                marginTop: '14px'
              }}>
                {waitError}
              </div>
            )}

            <div style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '12px',
              color: 'rgba(250,245,238,0.6)',
              marginTop: '20px'
            }}>
              {NEWSLETTER.micro.join('  \u00b7  ')}
            </div>
          </div>
        </section>

        {/* Paid tier is hidden until the newsletter actually ships */}
        {!NEWSLETTER.live && (
        <section style={{ backgroundColor: '#faf5ee', padding: '96px 48px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            maxWidth: '620px',
            textAlign: 'center',
            border: '1px solid rgba(216,208,200,0.6)',
            borderRadius: '12px',
            padding: '40px 32px',
            boxShadow: '0 2px 16px rgba(58,48,42,0.04)'
          }}>
            <div style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#c2652a',
              fontWeight: 500,
              marginBottom: '16px'
            }}>
              THE WAR ROOM · COMING LATER
            </div>
            <h2 style={{
              fontFamily: '"EB Garamond", serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(26px, 3.2vw, 34px)',
              color: '#3a302a',
              lineHeight: 1.2,
              margin: '0 0 14px 0'
            }}>
              The paid tier opens after launch.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#8a7a6e',
              margin: 0
            }}>
              The free Dispatch comes first. Once it is running properly, The War Room adds the longer
              archive pieces and the research notes behind them. Waitlist members get first access and
              nobody is charged before then.
            </p>
          </div>
        </section>
        )}

        {/* SECTION 3: WAR ROOM PRICING (hidden until NEWSLETTER.live is true) */}
        {NEWSLETTER.live && (
        <section style={{ backgroundColor: '#faf5ee', padding: '120px 48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div ref={warRoomOverlineRef} style={{
            fontFamily: 'var(--font-body), Manrope, sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#c2652a',
            fontWeight: 500,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            THE WAR ROOM · PAID DISPATCH
          </div>
          
          <h2 ref={warRoomHeadlineRef} style={{
            fontFamily: '"EB Garamond", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(36px, 4vw, 52px)',
            color: '#3a302a',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            History the way it deserves to be told.
          </h2>
          
          <p ref={warRoomBodyRef} style={{
            fontFamily: 'var(--font-body), Manrope, sans-serif',
            fontSize: '16px',
            color: '#6b5c4e',
            maxWidth: '440px',
            textAlign: 'center',
            margin: '16px auto 0',
            lineHeight: 1.6
          }}>
            History and geopolitics in one email. Every week. Exclusive depth that never appears on the blog or YouTube.
          </p>

          {/* TOGGLE */}
          <div ref={warRoomToggleRef} style={{
            marginTop: '40px',
            backgroundColor: '#ede8e1',
            borderRadius: '100px',
            padding: '4px',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            <button 
              onClick={() => setBillingCycle("monthly")}
              style={{
                borderRadius: '100px',
                padding: '8px 24px',
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                backgroundColor: billingCycle === "monthly" ? '#c2652a' : 'transparent',
                color: billingCycle === "monthly" ? '#faf5ee' : '#6b5c4e'
              }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("yearly")}
              style={{
                borderRadius: '100px',
                padding: '8px 24px',
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                backgroundColor: billingCycle === "yearly" ? '#c2652a' : 'transparent',
                color: billingCycle === "yearly" ? '#faf5ee' : '#6b5c4e',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Yearly
              <span style={{
                fontSize: '11px',
                backgroundColor: 'rgba(194,101,42,0.12)',
                color: '#c2652a',
                borderRadius: '100px',
                padding: '2px 8px',
                fontWeight: 600
              }}>
                Save 30%
              </span>
            </button>
          </div>

          <div ref={warRoomCardRef} style={{
            backgroundColor: '#ffffff',
            border: '1px solid #d8d0c8',
            borderRadius: '8px',
            padding: '48px',
            boxShadow: '0 2px 24px rgba(58, 48, 42, 0.06)',
            width: '100%',
            maxWidth: '520px',
            marginTop: '32px'
          }}>
            {paymentSuccess ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '32px 0'
              }}>
                <h3 style={{
                  fontFamily: '"EB Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: '28px',
                  color: '#3a302a',
                  marginBottom: '8px'
                }}>
                  You're in. First dispatch arrives next week.
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '15px',
                  color: '#6b5c4e'
                }}>
                  Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              height: '96px' // Keep height stable to prevent layout jump
            }}>
              <div style={{ position: 'relative', height: '72px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  opacity: billingCycle === "monthly" ? 1 : 0,
                  transition: 'opacity 200ms ease',
                  pointerEvents: billingCycle === "monthly" ? 'auto' : 'none'
                }}>
                  <span style={{ fontFamily: '"EB Garamond", serif', fontSize: '72px', color: '#c2652a', fontWeight: 400, lineHeight: 1 }}>$7</span>
                  <span style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '16px', color: '#8a7a6e' }}>/month</span>
                </div>
                <div style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  opacity: billingCycle === "yearly" ? 1 : 0,
                  transition: 'opacity 200ms ease',
                  pointerEvents: billingCycle === "yearly" ? 'auto' : 'none'
                }}>
                  <span style={{ fontFamily: '"EB Garamond", serif', fontSize: '72px', color: '#c2652a', fontWeight: 400, lineHeight: 1 }}>$59</span>
                  <span style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '16px', color: '#8a7a6e' }}>/year</span>
                </div>
              </div>
              
              <div style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '13px',
                color: '#8a7a6e',
                height: '20px',
                opacity: billingCycle === "yearly" ? 1 : 0,
                transition: 'opacity 200ms ease',
                marginTop: '4px'
              }}>
                That's $4.92/month
              </div>
            </div>

            <div style={{
              height: '1px',
              backgroundColor: '#d8d0c8',
              margin: '28px 0'
            }} />

            <div ref={warRoomBenefitsRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {[
                { title: "The History Deep Dive", desc: "one battle, campaign, or commander — fully explained" },
                { title: "The Geopolitics Lens", desc: "one active conflict or power shift through historical context" }
              ].map((benefit, idx) => (
                <div key={idx} className="benefit-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#c2652a', fontSize: '15px', marginTop: '2px' }}>•</span>
                  <div style={{
                    fontFamily: 'var(--font-body), Manrope, sans-serif',
                    fontSize: '15px',
                    color: '#3a302a',
                    lineHeight: 1.8
                  }}>
                    <strong>{benefit.title}</strong> — {benefit.desc}
                  </div>
                </div>
              ))}
            </div>

            {showEmailCapture ? (
              <div style={{ marginBottom: '24px', width: '100%' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 16px',
                    backgroundColor: '#faf5ee',
                    border: '1px solid #d8d0c8',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-body), Manrope, sans-serif',
                    fontSize: '15px',
                    color: '#3a302a',
                    outline: 'none',
                    marginBottom: '12px'
                  }}
                />
                <button onClick={handleCheckout} style={{
                  width: '100%',
                  height: '52px',
                  backgroundColor: '#c2652a',
                  color: '#faf5ee',
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 200ms'
                }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a8521f'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#c2652a'}>
                  Continue to Payment →
                </button>
                {checkoutError && (
                  <p style={{
                    fontFamily: 'var(--font-body), Manrope, sans-serif',
                    fontSize: '13px',
                    color: '#c0392b',
                    marginTop: '8px',
                    textAlign: 'center'
                  }}>
                    {checkoutError}
                  </p>
                )}
              </div>
            ) : (
              <button onClick={() => setShowEmailCapture(true)} style={{
                width: '100%',
                height: '52px',
                backgroundColor: '#c2652a',
                color: '#faf5ee',
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 200ms',
                marginBottom: '24px'
              }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a8521f'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#c2652a'}>
                Join The War Room — {billingCycle === "monthly" ? "$7/month" : "$59/year"} →
              </button>
            )}

            <div style={{
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '12px',
              color: '#8a7a6e',
              textAlign: 'center'
            }}>
              Cancel anytime. No questions asked.
            </div>
            </>
            )}
          </div>
        </section>
        )}

        {/* Testimonials removed: the quotes were invented for a newsletter that has not shipped.
            Replace with real, attributable reader or viewer quotes before restoring this section. */}

      </main>
      
      <Footer />
    </>
  )
}
