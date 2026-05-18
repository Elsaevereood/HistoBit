"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupCardHover } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  { name: "Battles", desc: "Where empires were decided in a single afternoon", image: "/images/topic_battles.png" },
  { name: "Commanders", desc: "The minds that determined the fate of millions", image: "/images/topic_commanders.png" },
  { name: "Logistics", desc: "The unglamorous science behind every victory", image: "/images/topic_logistics.png" },
  { name: "Ancient Warfare", desc: "From the first bronze spear to the fall of Rome", image: "/images/topic_ancient.png" },
  { name: "Naval History", desc: "When the sea decided who ruled the world", image: "/images/topic_naval.png" },
  { name: "World War", desc: "The century that burned the old map and drew a new one", image: "/images/topic_worldwar.png" },
];

export default function TopicExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    // Calculate total scroll distance
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    const scrollTween = gsap.to(track, {
      x: -(totalWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth * 2.5}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Card hover
    cardsRef.current.forEach((card) => {
      if (card) setupCardHover(card);
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="topic-explorer"
      className="relative"
      style={{ overflow: "hidden" }}
    >
      <div style={{ padding: "60px 48px 32px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#c2652a",
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          EXPLORE THE ARCHIVE
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "#8a7a6e",
            marginBottom: 48,
          }}
        >
          Six thousand years of warfare. Pick your era.
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: 24, padding: "0 48px", willChange: "transform" }}
      >
        {topics.map((topic, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="interactive-card"
            style={{
              width: "clamp(300px, 30vw, 460px)",
              height: 500,
              borderRadius: 16,
              overflow: "hidden",
              flexShrink: 0,
              position: "relative",
              cursor: "pointer",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="card-glow" />
            <div className="card-sheen" />

            {/* Background image */}
            <Image
              src={topic.image}
              alt={topic.name}
              fill
              className="card-hover-img object-cover"
              style={{ filter: "grayscale(100%)", transition: "transform 400ms ease" }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(42, 28, 18, 0.85) 0%, rgba(42, 28, 18, 0.2) 60%, transparent 100%)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ padding: 32, zIndex: 2 }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  color: "#faf5ee",
                  lineHeight: 1.1,
                  marginBottom: 10,
                }}
              >
                {topic.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                  marginBottom: 20,
                }}
              >
                {topic.desc}
              </p>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                }}
              >
                Explore →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 2, background: "#d8d0c8" }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            width: "0%",
            background: "#c2652a",
            transition: "none",
          }}
        />
      </div>
    </section>
  );
}
