"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupHeadingAnimation, countUpAnimation } from "@/lib/animations";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsHistobit() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) setupHeadingAnimation(headingRef.current);

      if (leftRef.current) {
        gsap.set(leftRef.current, { x: -40, opacity: 0 });
        ScrollTrigger.create({
          trigger: leftRef.current, start: "top 80%", once: true,
          onEnter: () => gsap.to(leftRef.current!, { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" }),
        });
      }
      if (rightRef.current) {
        gsap.set(rightRef.current, { x: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: rightRef.current, start: "top 80%", once: true,
          onEnter: () => gsap.to(rightRef.current!, { x: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.15 }),
        });
      }

      if (countRef.current) {
        ScrollTrigger.create({
          trigger: countRef.current, start: "top 80%", once: true,
          onEnter: () => countUpAnimation(countRef.current!, 40000, "+"),
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const pStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.85, color: "#3a302a", marginBottom: 24 };

  return (
    <section id="what-is-histobit" style={{ background: "#faf5ee", padding: "120px 48px" }}>
      <div className="whatishb-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100 }}>
        <div ref={leftRef}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500, marginBottom: 20 }}>WHAT IS HISTOBIT</div>
          <h2 ref={headingRef} style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", color: "#3a302a", lineHeight: 1.1, marginBottom: 4 }}>Military history</h2>
          <div style={{ fontFamily: "var(--font-script)", fontSize: "clamp(36px, 4.5vw, 58px)", color: "#c2652a", lineHeight: 1.2, marginBottom: 36 }}>told properly.</div>
          <p style={pStyle}>Histobit is a military history channel built for people who want the real story — not the mythology, not the Hollywood version. The research goes deep. The writing is cinematic.</p>
          <p style={pStyle}>Every video, every post, every newsletter dispatch meets the same standard: if it isn&apos;t specific, it isn&apos;t good enough.</p>
          <p style={pStyle}>8 million views. 60 countries. 40,000 readers every week. None of that happened by accident.</p>
          <Link href="/about" className="cta-link" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#c2652a", textDecoration: "none", marginTop: 8, display: "inline-block" }}>Read the Full Story →</Link>
        </div>

        <div ref={rightRef}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div style={{ borderLeft: "2px solid rgba(194,101,42,0.3)", paddingLeft: 28 }}>
              <div ref={countRef} style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(48px, 6vw, 72px)", color: "#c2652a", lineHeight: 1 }}>0</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e", marginTop: 6 }}>Weekly Newsletter Readers</div>
            </div>
            <div style={{ borderLeft: "2px solid rgba(194,101,42,0.3)", paddingLeft: 28 }}>
              <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(48px, 6vw, 72px)", color: "#c2652a", lineHeight: 1 }}>8M+</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e", marginTop: 6 }}>Total Video Views</div>
            </div>
            <div style={{ borderLeft: "2px solid rgba(194,101,42,0.3)", paddingLeft: 28 }}>
              <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(48px, 6vw, 72px)", color: "#c2652a", lineHeight: 1 }}>60</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8a7a6e", marginTop: 6 }}>Countries Reached</div>
            </div>
          </div>
          <div style={{ marginTop: 48, height: 1, background: "rgba(216,208,200,0.6)" }} />
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a7a6e", marginTop: 20 }}>Trusted by serious history readers worldwide.</div>
        </div>
      </div>
      <style jsx>{`@media(max-width:900px){.whatishb-grid{grid-template-columns:1fr!important;gap:60px!important}}`}</style>
    </section>
  );
}
