"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupHeadingAnimation, setupScrollReveal } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  { label: "Ancient Warfare", tag: "BC 500 — AD 500", image: "/images/topic_ancient.png" },
  { label: "Battles", tag: "Strategy & Tactics", image: "/images/topic_battles.png" },
  { label: "Commanders", tag: "Genius & Failure", image: "/images/topic_commanders.png" },
  { label: "Logistics", tag: "The Hidden War", image: "/images/topic_logistics.png" },
  { label: "Naval Warfare", tag: "Sea Power", image: "/images/topic_naval.png" },
  { label: "World Wars", tag: "Modern Conflict", image: "/images/topic_worldwar.png" },
];

export default function TopicExplorer() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) setupHeadingAnimation(headingRef.current);
      cardsRef.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { y: 32, opacity: 0 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: i * 0.08 }),
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="topic-explorer" style={{ background: "#1a1008", padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      <div className="grain-overlay" />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c2652a", fontWeight: 500, marginBottom: 16 }}>EXPLORE BY TOPIC</div>
          <h2 ref={headingRef} style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", color: "#faf5ee", lineHeight: 1.05, marginBottom: 8 }}>Every War. Every Era.</h2>
          <div style={{ fontFamily: "var(--font-script)", fontSize: "clamp(40px, 5.5vw, 72px)", color: "#c2652a", lineHeight: 1.2 }}>Every Commander.</div>
        </div>

        <div className="topics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {topics.map((topic, i) => (
            <div
              key={topic.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                height: 280,
                transform: hoveredIdx === i ? "scale(1.02)" : "scale(1)",
                transition: "transform 300ms ease",
                borderLeft: hoveredIdx === i ? "3px solid #c2652a" : "3px solid transparent",
              }}
            >
              <Image
                src={topic.image}
                alt={topic.label}
                fill
                style={{
                  objectFit: "cover",
                  filter: hoveredIdx === i ? "grayscale(20%) brightness(0.75)" : "grayscale(80%) brightness(0.6)",
                  transition: "filter 500ms ease",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,6,2,0.85) 0%, rgba(10,6,2,0.2) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, zIndex: 2 }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(250,245,238,0.5)", marginBottom: 6 }}>{topic.tag}</div>
                <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 22, color: "#faf5ee", lineHeight: 1.1 }}>{topic.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`@media(max-width:1024px){.topics-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:640px){.topics-grid{grid-template-columns:1fr!important}.topics-grid>div{height:220px!important}}`}</style>
    </section>
  );
}
