"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupImageReveal, setupHeadingAnimation, setupScrollReveal } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.set(labelRef.current, { y: 16, opacity: 0 });
        ScrollTrigger.create({ trigger: labelRef.current, start: "top 85%", once: true, onEnter: () => gsap.to(labelRef.current!, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }) });
      }
      if (imgWrapRef.current) {
        setupImageReveal(imgWrapRef.current);
        if (imgElRef.current) {
          gsap.to(imgElRef.current, { filter: "grayscale(0%)", duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true } });
        }
        const img = imgWrapRef.current.querySelector("img");
        if (img) gsap.to(img, { yPercent: -10, ease: "none", scrollTrigger: { trigger: imgWrapRef.current, start: "top bottom", end: "bottom top", scrub: true } });
      }
      if (rightColRef.current) {
        Array.from(rightColRef.current.children).forEach((child, i) => setupScrollReveal(child as HTMLElement, { delay: i * 0.08 }));
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="featured-story" style={{ background: "#faf5ee", padding: "120px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={labelRef} style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500, marginBottom: 48 }}>FEATURED DISPATCH</div>
        <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "58% 42%", gap: 80, alignItems: "center" }}>
          <div ref={imgWrapRef} className="img-reveal-wrapper" style={{ aspectRatio: "4/3", borderRadius: 8, overflow: "hidden" }}>
            <div className="img-reveal-overlay" />
            <Image ref={imgElRef} src="/images/featured_battle_cannae.png" alt="Battle of Cannae" width={800} height={600} style={{ objectFit: "cover", width: "100%", height: "100%", filter: "grayscale(60%)", transition: "filter 500ms ease" }} />
          </div>
          <div ref={rightColRef}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c2652a", fontWeight: 500, marginBottom: 20 }}>ANCIENT WARFARE · 216 BC</div>
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(30px, 3.8vw, 46px)", lineHeight: 1.1, color: "#3a302a", marginBottom: 24 }}>The Day 50,000 Romans Died Before Sunset</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#8a7a6e", marginBottom: 12 }}>Cannae. 216 BC. Hannibal had 40,000 men and no siege equipment. Rome had 86,000 soldiers and every advantage on paper. By nightfall, Rome had lost more soldiers in a single afternoon than America lost in the entire Vietnam War.</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#3a302a", marginBottom: 32 }}>This is how it happened. And why every military academy on earth still studies it.</p>
            <Link href="/blog/battle-of-cannae" className="cta-link" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#c2652a", textDecoration: "none" }}>Read the Full Dispatch →</Link>
            <div style={{ width: "100%", height: 1, background: "rgba(216,208,200,0.6)", marginTop: 32 }} />
            <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
              {["9 min read", "Tactics", "Ancient Warfare"].map((t) => (<span key={t} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e", letterSpacing: "0.04em" }}>{t}</span>))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`@media(max-width:900px){.featured-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}
