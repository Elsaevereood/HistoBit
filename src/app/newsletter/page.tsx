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
  
  const freeLeftRef = useRef<HTMLDivElement>(null);
  const freeRightRef = useRef<HTMLDivElement>(null);
  
  const quoteRef = useRef<HTMLDivElement>(null);
  
  const paidLeftRef = useRef<HTMLDivElement>(null);
  const paidRightRef = useRef<HTMLDivElement>(null);
  
  const socialRef = useRef<HTMLDivElement>(null);
  
  const finalCtaRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

    // FREE SECTION ANIMATIONS
    if (freeLeftRef.current && freeRightRef.current) {
      gsap.set(freeLeftRef.current, { x: -40, opacity: 0 });
      gsap.set(freeRightRef.current, { x: 40, opacity: 0 });
      
      ScrollTrigger.create({
        trigger: freeLeftRef.current,
        start: "top 80%",
        once: true,
        animation: gsap.timeline()
          .to(freeLeftRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
          .to(freeRightRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.15)
      });
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

    // PAID SECTION ANIMATIONS
    if (paidLeftRef.current && paidRightRef.current) {
      gsap.set(paidLeftRef.current, { x: -40, opacity: 0 });
      gsap.set(paidRightRef.current, { x: 40, opacity: 0 });
      
      ScrollTrigger.create({
        trigger: paidLeftRef.current,
        start: "top 80%",
        once: true,
        animation: gsap.timeline()
          .to(paidLeftRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
          .to(paidRightRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.15)
      });
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

    // FINAL CTA STRIP
    if (finalCtaRef.current) {
      gsap.set(finalCtaRef.current, { y: 30, opacity: 0 });
      
      ScrollTrigger.create({
        trigger: finalCtaRef.current,
        start: "top 85%",
        once: true,
        animation: gsap.to(finalCtaRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" })
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
              <span style={{ color: '#d8d0c8' }}>·</span>
              <span>Free forever</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: FREE TIER SIGNUP */}
        <section style={{ backgroundColor: '#faf5ee', padding: '100px 48px', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">
            {/* LEFT COLUMN */}
            <div ref={freeLeftRef}>
              <div style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#c2652a',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                FREE TIER
              </div>
              
              <h2 style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.1,
                color: '#3a302a',
                marginBottom: '20px'
              }}>
                The Weekly Dispatch
              </h2>
              
              <p style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '16px',
                lineHeight: 1.8,
                color: '#3a302a',
                marginBottom: '32px'
              }}>
                Every week, Histobit publishes one deep-dive into military history. A battle you think you know — told the way it actually happened. A commander whose genius was in his supply lines, not his cavalry charge. A war whose outcome was decided six months before the first shot was fired. This is the newsletter that Epic History TV fans, Kings and Generals viewers, and serious history readers have been waiting for.
              </p>
              
              <div>
                {[
                  "One deep-dive every week — battles, commanders, logistics, strategy",
                  "Written in Histobit's cinematic, authoritative style. No dry textbook tone.",
                  "Exclusive content not published on YouTube or the blog",
                  "Free forever. No credit card. No catch."
                ].map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#c2652a', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '15px', color: '#3a302a', lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* RIGHT COLUMN */}
            <div ref={freeRightRef}>
              <div style={{
                backgroundColor: '#fff8f0',
                border: '1px solid rgba(216,208,200,0.6)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 2px 24px rgba(58,48,42,0.06)'
              }}>
                <h3 style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '28px', color: '#3a302a', marginBottom: '8px' }}>
                  Start Reading Free
                </h3>
                
                <p style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '14px', color: '#8a7a6e', marginBottom: '32px' }}>
                  Join 12,000 readers. Cancel anytime.
                </p>
                
                {success ? (
                  <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <p style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '24px', color: '#3a302a' }}>
                      You're in. First dispatch arrives next week.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '12px', fontWeight: 500, color: '#3a302a', marginBottom: '6px', display: 'block' }}>
                          First Name
                        </label>
                        <input type="text" placeholder="Your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '8px',
                          border: '1px solid #d8d0c8',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body), Manrope, sans-serif',
                          fontSize: '14px',
                          color: '#3a302a',
                          outline: 'none',
                          transition: 'border-color 200ms'
                        }} onFocus={(e) => e.target.style.borderColor = '#c2652a'} onBlur={(e) => e.target.style.borderColor = '#d8d0c8'} />
                      </div>
                      
                      <div>
                        <label style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '12px', fontWeight: 500, color: '#3a302a', marginBottom: '6px', display: 'block' }}>
                          Email Address
                        </label>
                        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '8px',
                          border: '1px solid #d8d0c8',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body), Manrope, sans-serif',
                          fontSize: '14px',
                          color: '#3a302a',
                          outline: 'none',
                          transition: 'border-color 200ms'
                        }} onFocus={(e) => e.target.style.borderColor = '#c2652a'} onBlur={(e) => e.target.style.borderColor = '#d8d0c8'} />
                      </div>
                    </div>
                    
                    <button type="submit" disabled={loading} style={{
                      width: '100%',
                      marginTop: '8px',
                      backgroundColor: '#c2652a',
                      color: '#faf5ee',
                      fontFamily: 'var(--font-body), Manrope, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '15px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background-color 200ms',
                      opacity: loading ? 0.7 : 1
                    }} onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#a8521f')} onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#c2652a')}>
                      {loading ? 'Joining...' : "Join the Dispatch — It's Free"}
                    </button>

                    {error && (
                      <div style={{ color: 'red', fontSize: '12px', marginTop: '8px', textAlign: 'center', fontFamily: 'var(--font-body), Manrope, sans-serif' }}>
                        {error}
                      </div>
                    )}
                    
                    <p style={{
                      fontFamily: 'var(--font-body), Manrope, sans-serif',
                      fontSize: '11px',
                      color: '#8a7a6e',
                      textAlign: 'center',
                      marginTop: '12px',
                      lineHeight: 1.6
                    }}>
                      By subscribing you agree to receive weekly emails from Histobit.<br />Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DIVIDER WITH QUOTE */}
        <section style={{ backgroundColor: '#faf5ee', padding: '0 48px 100px 48px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
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

        {/* SECTION 4: PAID TIER */}
        <section style={{ backgroundColor: '#3a302a', padding: '100px 48px', width: '100%' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }} className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">
            {/* LEFT COLUMN */}
            <div ref={paidLeftRef}>
              <div style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#c2652a',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                PAID TIER · COMING SOON
              </div>
              
              <h2 style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.1,
                color: '#faf5ee',
                marginBottom: '20px'
              }}>
                The Inner Circle
              </h2>
              
              <p style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(250,245,238,0.75)',
                marginBottom: '32px'
              }}>
                For the readers who want to go deeper. The Inner Circle is a paid tier for people who treat history as a serious pursuit — not a hobby. Extended deep-dives. Primary source breakdowns. Early access to new research. And a direct line to the Histobit archive before anything goes public.
              </p>
              
              <div>
                {[
                  "Extended deep-dives — 3,000 to 5,000 word essays on single battles",
                  "Primary source breakdowns — what the generals actually wrote",
                  "Early access — read new research before it goes public",
                  "Direct archive access — every past issue, fully searchable"
                ].map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#c2652a', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '15px', color: 'rgba(250,245,238,0.85)', lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* RIGHT COLUMN */}
            <div ref={paidRightRef}>
              <div style={{
                backgroundColor: 'rgba(250,245,238,0.06)',
                border: '1px solid rgba(250,245,238,0.12)',
                borderRadius: '12px',
                padding: '40px'
              }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(194,101,42,0.2)',
                  color: '#c2652a',
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  marginBottom: '24px'
                }}>
                  LAUNCHING SOON
                </div>
                
                <h3 style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: '28px', color: '#faf5ee', marginBottom: '8px' }}>
                  Be First on the List
                </h3>
                
                <p style={{ fontFamily: 'var(--font-body), Manrope, sans-serif', fontSize: '14px', color: 'rgba(250,245,238,0.6)', marginBottom: '32px' }}>
                  The paid tier opens soon. Leave your email and you'll be the first to know — with a founding member discount.
                </p>
                
                <input type="email" placeholder="your@email.com" className="placeholder-[rgba(250,245,238,0.4)]" style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(250,245,238,0.2)',
                  backgroundColor: 'rgba(250,245,238,0.08)',
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '14px',
                  color: '#faf5ee',
                  outline: 'none',
                  transition: 'border-color 200ms'
                }} onFocus={(e) => e.target.style.borderColor = '#c2652a'} onBlur={(e) => e.target.style.borderColor = 'rgba(250,245,238,0.2)'} />
                
                <button style={{
                  width: '100%',
                  marginTop: '12px',
                  backgroundColor: '#c2652a',
                  color: '#faf5ee',
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '15px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 200ms'
                }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a8521f'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#c2652a'}>
                  Notify Me When It Launches
                </button>
                
                <p style={{
                  fontFamily: 'var(--font-body), Manrope, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(250,245,238,0.4)',
                  textAlign: 'center',
                  marginTop: '16px'
                }}>
                  Planned pricing: $5/month or $50/year
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SOCIAL PROOF STRIP */}
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

        {/* SECTION 6: FINAL CTA STRIP */}
        <section ref={finalCtaRef} style={{ backgroundColor: '#c2652a', padding: '100px 48px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: '"EB Garamond", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            lineHeight: 1.05,
            color: '#faf5ee',
            marginBottom: '16px'
          }}>
            Still Reading? You Already Know.
          </h2>
          
          <p style={{
            fontFamily: 'var(--font-body), Manrope, sans-serif',
            fontSize: '17px',
            color: 'rgba(250,245,238,0.75)',
            marginBottom: '40px'
          }}>
            12,000 people get this every week. Join them.
          </p>
          
          <div className="flex flex-col md:flex-row gap-[12px] max-w-[480px] mx-auto w-full">
            <input type="email" placeholder="Your email address" style={{
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '14px',
              backgroundColor: 'rgba(250,245,238,0.95)',
              color: '#3a302a',
              flex: 1,
              outline: 'none'
            }} className="w-full md:w-auto" />
            
            <button style={{
              padding: '14px 28px',
              borderRadius: '8px',
              backgroundColor: '#3a302a',
              color: '#faf5ee',
              fontFamily: 'var(--font-body), Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background-color 200ms'
            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1008'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3a302a'} className="w-full md:w-auto">
              Join Free
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
