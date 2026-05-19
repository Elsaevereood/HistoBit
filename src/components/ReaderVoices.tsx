"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupHeadingAnimation } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "I've studied military history for 20 years. Histobit is the first source that made me understand why battles ended the way they did — not who fought, but who ate.", name: "James K.", location: "Chicago, USA", initial: "J" },
  { quote: "The level of research is extraordinary. This reads like a documentary script, not a history lesson. Genuinely addictive.", name: "Sarah M.", location: "London, UK", initial: "S" },
  { quote: "Finally someone who explains logistics, not just glory. This is what military history should always have been.", name: "David R.", location: "Toronto, Canada", initial: "D" },
];

export default function ReaderVoices() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) setupHeadingAnimation(headingRef.current);
      cardsRef.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { y: 40, opacity: 0 });
          ScrollTrigger.create({
            trigger: el, start: "top 85%", once: true,
            onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.12 }),
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="reader-voices" style={{ background: "#faf5ee", padding: "120px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500, marginBottom: 12 }}>READER VOICES</div>
          <h2 ref={headingRef} style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 4vw, 48px)", color: "#3a302a", lineHeight: 1.1 }}>What Readers Say</h2>
        </div>

        <div className="voices-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                background: "#faf5ee",
                border: "1px solid rgba(216,208,200,0.6)",
                borderRadius: 12,
                padding: "36px 32px",
                boxShadow: "0 2px 16px rgba(58,48,42,0.04)",
                transition: "transform 300ms ease, box-shadow 300ms ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(58,48,42,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(58,48,42,0.04)"; }}
            >
              <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: 56, color: "#c2652a", lineHeight: 0.7, display: "block", marginBottom: 20 }}>&ldquo;</span>
              <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 18, lineHeight: 1.65, color: "#3a302a", marginBottom: 28 }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #c2652a, #8c3c3c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#faf5ee" }}>{t.initial}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#3a302a" }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8a7a6e", marginTop: 2 }}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`@media(max-width:900px){.voices-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
