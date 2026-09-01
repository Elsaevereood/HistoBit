"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { splitTextIntoWords } from "@/lib/animations"

const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const heroLabelRef = useRef<HTMLDivElement>(null)
  const heroLine1Ref = useRef<HTMLDivElement>(null)
  const heroLine2Ref = useRef<HTMLDivElement>(null)
  const heroLine3Ref = useRef<HTMLDivElement>(null)
  
  const openingRef = useRef<HTMLDivElement>(null)
  
  const startedLeftRef = useRef<HTMLDivElement>(null)
  const startedRightRef = useRef<HTMLDivElement>(null)
  
  const pullQuoteRef = useRef<HTMLDivElement>(null)
  
  const whatLeftRef = useRef<HTMLDivElement>(null)
  const whatRightRef = useRef<HTMLDivElement>(null)
  
  const section6HeadingRef = useRef<HTMLDivElement>(null)
  const section6StatsRef = useRef<HTMLDivElement>(null)
  const section6FormRef = useRef<HTMLDivElement>(null)
  
  const closingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Section 1 — OPENING HERO
    if (heroLabelRef.current) {
      gsap.fromTo(
        heroLabelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 }
      )
    }

    const t1 = gsap.timeline({ delay: 0.9 })
    
    if (heroLine1Ref.current) {
      const words1 = splitTextIntoWords(heroLine1Ref.current)
      t1.fromTo(words1, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: "power3.out" }, 0)
    }
    
    if (heroLine2Ref.current) {
      const words2 = splitTextIntoWords(heroLine2Ref.current)
      t1.fromTo(words2, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: "power3.out" }, "-=0.6")
    }
    
    if (heroLine3Ref.current) {
      const words3 = splitTextIntoWords(heroLine3Ref.current)
      t1.fromTo(words3, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: "power3.out" }, "-=0.6")
    }

    gsap.fromTo(
      ".scroll-prompt-container",
      { opacity: 0 },
      { opacity: 1, delay: 1.8, duration: 0.8 }
    )
    
    gsap.fromTo(
      ".scroll-dot",
      { y: 0, opacity: 1 },
      { y: 52, opacity: 0, duration: 1.4, ease: "power1.inOut", repeat: -1 }
    )

    // Section 2 — OPENING STATEMENT
    if (openingRef.current) {
      gsap.fromTo(
        openingRef.current.children,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: openingRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    // Section 3 — HOW THIS STARTED
    if (startedLeftRef.current) {
      gsap.fromTo(
        startedLeftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: startedLeftRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }
    
    if (startedRightRef.current) {
      gsap.fromTo(
        startedRightRef.current.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: startedRightRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    // Section 4 — PULL QUOTE
    if (pullQuoteRef.current) {
      gsap.fromTo(
        pullQuoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pullQuoteRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    // Section 5 — WHAT HISTOBIT IS
    if (whatRightRef.current) {
      gsap.fromTo(
        whatRightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whatRightRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }
    
    if (whatLeftRef.current) {
      gsap.fromTo(
        whatLeftRef.current.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whatLeftRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    // Section 6 — THE NEWSLETTER
    if (section6HeadingRef.current) {
      const line1 = section6HeadingRef.current.querySelector('.heading-line-1');
      const line2 = section6HeadingRef.current.querySelector('.heading-line-2');
      
      const wordsLine1 = line1 ? splitTextIntoWords(line1 as HTMLElement) : [];
      const wordsLine2 = line2 ? splitTextIntoWords(line2 as HTMLElement) : [];
      
      const allWords = [...wordsLine1, ...wordsLine2];

      gsap.fromTo(
        allWords,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section6HeadingRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    if (section6StatsRef.current) {
      gsap.fromTo(
        section6StatsRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section6StatsRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    if (section6FormRef.current) {
      gsap.fromTo(
        section6FormRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section6FormRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )
    }

    // Section 7 — FINAL CLOSING STATEMENT
    if (closingRef.current) {
      gsap.fromTo(
        closingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 85%",
            once: true,
          }
        }
      )
    }

  }, [])

  return (
    <main style={{ backgroundColor: "#faf5ee", paddingTop: 64, minHeight: "100vh" }}>
      <CustomCursor />
      <Navigation />
      
      {/* SECTION 1 — OPENING HERO */}
      <section style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse 90% 70% at 50% 30%, #efd5a8 0%, #f5e6c8 35%, #faf5ee 75%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className="grain-overlay" />
        
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(100px, 16vw, 240px)",
          color: "rgba(58,48,42,0.04)",
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.02em"
        }}>
          HISTOBIT
        </div>

        <div style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 860,
          padding: "0 32px",
          textAlign: "center"
        }}>
          <div ref={heroLabelRef} style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#c2652a",
            fontWeight: 500,
            marginBottom: 32
          }}>
            THE STORY BEHIND HISTOBIT
          </div>
          
          <div ref={heroLine1Ref} style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 0.95,
            color: "#3a302a",
            display: "block"
          }}>
            History Was Never
          </div>

          <div ref={heroLine2Ref} style={{
            display: "inline-block",
            lineHeight: 0.9
          }}>
            <span style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(56px, 8vw, 110px)",
              color: "#c2652a",
              fontStyle: "normal"
            }}>Supposed</span>
            <span style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 7vw, 96px)",
              color: "#3a302a"
            }}> to Be</span>
          </div>

          <div ref={heroLine3Ref} style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 1.0,
            color: "#3a302a",
            display: "block",
            marginLeft: "clamp(0px, 8vw, 120px)"
          }}>
            Boring.
          </div>
        </div>

        <div className="scroll-prompt-container" style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0
        }}>
          <div style={{ position: "relative", width: 4, margin: "0 auto", height: 56 }}>
            <div style={{
              width: 1,
              height: 56,
              background: "rgba(58,48,42,0.2)",
              margin: "0 auto"
            }}></div>
            <div className="scroll-dot" style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#c2652a",
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)"
            }}></div>
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8a7a6e",
            marginTop: 8,
            textAlign: "center"
          }}>
            SCROLL
          </div>
        </div>
      </section>

      {/* SECTION 2 — OPENING STATEMENT */}
      <section style={{
        background: "#faf5ee",
        padding: "120px 48px",
        maxWidth: 820,
        margin: "0 auto"
      }}>
        <div ref={openingRef}>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.8vw, 32px)",
            lineHeight: 1.6,
            color: "#3a302a",
            marginBottom: 40
          }}>
            In school, history was a subject you survived. Dates, kings, treaties —
            memorized on Tuesday, forgotten by Friday. Nobody told you that the same
            era produced men who crossed mountain ranges with war elephants, fed armies
            of 100,000 across hostile deserts, and built empires that fell not to better
            swords but to empty grain depots.
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.8vw, 32px)",
            lineHeight: 1.6,
            color: "#c2652a",
            marginBottom: 48
          }}>
            That version of history — the real version — nobody taught it.
          </p>
          <div style={{
            width: 80,
            height: 2,
            background: "#c2652a",
            marginLeft: 0
          }} />
        </div>
      </section>

      {/* SECTION 3 — HOW THIS STARTED */}
      <section style={{
        background: "#faf5ee",
        padding: "80px 48px 120px",
        maxWidth: 1100,
        margin: "0 auto"
      }}>
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-[100px]">
          <div ref={startedLeftRef}>
            <span style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(80px, 10vw, 140px)",
              color: "rgba(194,101,42,0.12)",
              lineHeight: 1,
              marginBottom: 0,
              display: "block"
            }}>
              01
            </span>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 20,
              marginTop: -20
            }}>
              HOW THIS STARTED
            </div>
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#3a302a",
              lineHeight: 1.15,
              marginBottom: 0
            }}>
              From hating history class
            </h2>
            <span style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#c2652a",
              lineHeight: 1.2,
              display: "block"
            }}>
              to building one.
            </span>
          </div>

          <div ref={startedRightRef}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 28 }}>
              The channel launched in July 2025. Not from a studio.
              Not with a team. Just one person, a genuine obsession with military
              strategy, and a belief that the internet was full of history content
              that looked serious but said nothing.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 28 }}>
              The obsession didn&apos;t start in a classroom — it started the
              way most real interests do. Through curiosity. Through asking why.
              Through watching a documentary about medieval siege warfare and spending
              the next four hours reading about Roman engineering. Through realizing
              that the gap between what school teaches and what actually happened is
              so wide you could march an army through it.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 28 }}>
              So that&apos;s what Histobit does. It marches through that gap.
              Every week.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PULL QUOTE */}
      <section style={{
        background: "#3a302a",
        padding: "100px 48px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(160px, 20vw, 280px)",
          color: "rgba(250,245,238,0.04)",
          position: "absolute",
          top: -40,
          left: 48,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none"
        }}>
          &quot;
        </div>
        
        <div ref={pullQuoteRef} style={{
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "#faf5ee",
            lineHeight: 1.3,
            marginBottom: 24
          }}>
            &quot;Every battle you know by name was decided before it began.
          </div>
          <div style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(32px, 4.5vw, 60px)",
            color: "#c2652a",
            lineHeight: 1.2
          }}>
            Not in strategy. In supply.&quot;
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "rgba(250,245,238,0.45)",
            marginTop: 32,
            letterSpacing: "0.04em"
          }}>
            — The Logistic Nightmare, Histobit
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT HISTOBIT IS */}
      <section style={{
        background: "#faf5ee",
        padding: "120px 48px",
        maxWidth: 1100,
        margin: "0 auto"
      }}>
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-[100px]">
          <div ref={whatLeftRef} className="order-2 md:order-1">
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 28 }}>
              Histobit is a military history channel built for people who
              want the real story — not the mythology, not the Hollywood version,
              not the sanitized textbook answer. The research goes deep. The writing
              is cinematic. The goal is simple: make you understand war the way the
              people who fought it actually experienced it.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 28 }}>
              Every video. Every blog post. Every newsletter dispatch.
              The same standard: if it isn&apos;t specific, it isn&apos;t good enough.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 28 }}>
              The channel has reached over 8 million views across 60 countries and
              13,500 subscribers. None of that happened because
              of luck. It happened because the audience for serious military history is
              enormous — and almost nobody was serving them properly.
            </p>
          </div>

          <div ref={whatRightRef} className="order-1 md:order-2">
            <span style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(80px, 10vw, 140px)",
              color: "rgba(194,101,42,0.12)",
              lineHeight: 1,
              marginBottom: 0,
              display: "block"
            }}>
              02
            </span>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2652a",
              fontWeight: 500,
              marginBottom: 20,
              marginTop: -20
            }}>
              WHAT HISTOBIT IS
            </div>
            <h2 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#3a302a",
              lineHeight: 1.15,
              marginBottom: 0
            }}>
              Deep research.
            </h2>
            <span style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#c2652a",
              lineHeight: 1.2,
              display: "block"
            }}>
              No mythology.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6 — THE NEWSLETTER */}
      <section style={{
        background: "linear-gradient(180deg, #faf5ee 0%, #f0e4d0 100%)",
        padding: "120px 48px",
        maxWidth: 900,
        margin: "0 auto",
        textAlign: "center"
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(80px, 10vw, 140px)",
          color: "rgba(194,101,42,0.12)",
          lineHeight: 1,
          marginBottom: 0,
          textAlign: "center"
        }}>
          03
        </div>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "#c2652a",
          fontWeight: 500,
          marginBottom: 24,
          marginTop: -20
        }}>
          THE NEWSLETTER
        </div>

        <div ref={section6HeadingRef}>
          <div className="heading-line-1" style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(28px, 3.8vw, 48px)",
            color: "#3a302a",
            lineHeight: 1.1,
            marginBottom: 8
          }}>
            The blog and YouTube are public.
          </div>
          <div className="heading-line-2" style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(32px, 4.2vw, 56px)",
            color: "#c2652a",
            lineHeight: 1.2,
            marginBottom: 48
          }}>
            The newsletter is where the real work lives.
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 24 }}>
            Every week, one deep dispatch lands in your inbox. A battle you
            think you know — told the way it actually happened. A commander whose
            genius had nothing to do with courage. A war whose outcome was decided
            six months before the first shot was fired.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 24 }}>
            It is free. It always will be.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.85, color: "#3a302a", fontWeight: 500, marginBottom: 24 }}>
            And it is the best way to stay inside everything Histobit publishes —
            before it goes anywhere else.
          </p>
        </div>

        <div ref={section6StatsRef} style={{
          display: "flex",
          gap: 48,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 56,
          marginBottom: 56,
          alignItems: "center"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "clamp(36px, 5vw, 56px)", color: "#c2652a" }}>13,500</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", marginTop: 4, letterSpacing: "0.04em" }}>Subscribers</div>
          </div>
          <div style={{ height: 40, width: 1, background: "rgba(216,208,200,0.8)" }}></div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "clamp(36px, 5vw, 56px)", color: "#c2652a" }}>8M+</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", marginTop: 4, letterSpacing: "0.04em" }}>Total Views</div>
          </div>
          <div style={{ height: 40, width: 1, background: "rgba(216,208,200,0.8)" }}></div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "clamp(36px, 5vw, 56px)", color: "#c2652a" }}>60</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", marginTop: 4, letterSpacing: "0.04em" }}>Countries</div>
          </div>
        </div>

        <div ref={section6FormRef} style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: 28, color: "#3a302a", marginBottom: 8 }}>
            The Dispatch Launches Soon
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8a7a6e", marginBottom: 28 }}>
            Join the waitlist and get the first issue before anyone else. Free.
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              href="/newsletter"
              style={{
                display: "inline-block",
                background: "#c2652a",
                color: "#faf5ee",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Join the Waitlist &rarr;
            </Link>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e", textAlign: "center", marginTop: 12 }}>
            No spam. Free forever. Nothing sent until it launches.
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CLOSING STATEMENT */}
      <section style={{
        background: "#1a1008",
        padding: "120px 48px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center"
      }}>
        <div className="grain-overlay" />
        
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(100px, 16vw, 240px)",
          color: "rgba(250,245,238,0.03)",
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.02em"
        }}>
          HISTOBIT
        </div>

        <div ref={closingRef} style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 800,
          margin: "0 auto"
        }}>
          <span style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(36px, 5.5vw, 72px)",
            color: "#faf5ee",
            lineHeight: 0.95,
            display: "block"
          }}>
            This is the history
          </span>
          <span style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(44px, 6.5vw, 88px)",
            color: "#c2652a",
            lineHeight: 1.1,
            display: "block",
            marginLeft: "clamp(0px, 6vw, 80px)"
          }}>
            they left out.
          </span>
          <span style={{
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "rgba(250,245,238,0.55)",
            lineHeight: 1.2,
            display: "block",
            marginTop: 24
          }}>
            Now you know where to find it.
          </span>

          <div style={{ marginTop: 56 }}>
            <button style={{
              background: "#c2652a",
              color: "#faf5ee",
              padding: "18px 48px",
              borderRadius: 8,
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "transform 200ms, background 200ms"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a8521f";
              e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#c2652a";
              e.currentTarget.style.transform = "scale(1)";
            }}
            >
              Subscribe to the Newsletter — It&apos;s Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
