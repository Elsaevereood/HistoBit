"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextIntoWords } from "@/lib/animations";

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!checkoutEmail) return;
    
    const planId = billingCycle === "monthly" 
      ? process.env.NEXT_PUBLIC_RAZORPAY_PLAN_MONTHLY 
      : process.env.NEXT_PUBLIC_RAZORPAY_PLAN_YEARLY;

    try {
      const res = await fetch("/api/newsletter/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      });
      const data = await res.json();
      if (!data.subscription_id) throw new Error("No subscription id");

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
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed", err);
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
              MILITARY HISTORY · THE DISPATCH
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
              History Worth Reading. Delivered Weekly.
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
              Join 12,000 readers getting deep military history every week. No mythology. No filler. Just the stories that actually changed the world.
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

        {/* SECTION 3: WAR ROOM PRICING */}
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
            One email. Every week. Exclusive content that never appears on the blog or YouTube.
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
                { title: "The Untold Detail", desc: "one fact per week too niche for YouTube" },
                { title: "The Source", desc: "one book or document recommendation" },
                { title: "This Week in Military History", desc: "what happened this exact week" },
                { title: "Early Access", desc: "know the next video topic before anyone else" }
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

        {/* SECTION 4: SOCIAL PROOF STRIP */}
        <section ref={socialRef} style={{ backgroundColor: '#faf5ee', padding: '80px 48px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"EB Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            color: '#3a302a',
            marginBottom: '48px',
            textAlign: 'center'
          }}>
            What Readers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]">
            {[
              {
                quote: "I've read military history for 20 years. Histobit's newsletter is the first one I actually look forward to opening.",
                name: "James K.",
                location: "Chicago, USA"
              },
              {
                quote: "The level of research is insane. This reads like a documentary script, not a history lesson. Genuinely addictive.",
                name: "Sarah M.",
                location: "London, UK"
              },
              {
                quote: "Finally — someone who explains the logistics, not just the glory. This is what military history should always have been.",
                name: "David R.",
                location: "Toronto, Canada"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="testimonial-card" style={{
                backgroundColor: '#faf5ee',
                border: '1px solid rgba(216,208,200,0.6)',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 2px 16px rgba(58,48,42,0.04)'
              }}>
                <div style={{
                  fontFamily: '"EB Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: '48px',
                  color: '#c2652a',
                  lineHeight: 0.8,
                  marginBottom: '16px'
                }}>
                  "
                </div>
                <p style={{
                  fontFamily: '"EB Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#3a302a',
                  marginBottom: '24px'
                }}>
                  {testimonial.quote}
                </p>
                <div style={{
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#3a302a'
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '12px',
                  color: '#8a7a6e',
                  marginTop: '4px'
                }}>
                  {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
