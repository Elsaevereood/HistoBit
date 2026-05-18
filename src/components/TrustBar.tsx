"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countUpAnimation } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 40000, suffix: "+", label: "YouTube Subscribers" },
  { target: 8, suffix: "M+", label: "Total Views" },
  { target: 60, suffix: "+", label: "Countries Reached" },
  { target: 3, suffix: " Years", label: "Of Military History" },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(sectionRef.current, { y: 40, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(sectionRef.current!, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });

        if (!hasAnimated.current) {
          hasAnimated.current = true;
          numberRefs.current.forEach((el, i) => {
            if (el) {
              countUpAnimation(el, stats[i].target, stats[i].suffix, 1.8);
            }
          });
        }
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust-bar"
      style={{
        width: "100%",
        background: "#f0e8dc",
        padding: "80px 48px",
      }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-4 items-center justify-items-center"
        style={{ maxWidth: 1200, margin: "0 auto", gap: "32px 0" }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center relative"
            style={{
              padding: "0 32px",
            }}
          >
            {/* Vertical divider (hidden on first and on mobile) */}
            {i > 0 && (
              <div
                className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2"
                style={{ width: 1, height: 48, background: "#d8d0c8" }}
              />
            )}
            <span
              ref={(el) => { numberRefs.current[i] = el; }}
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "clamp(36px, 4vw, 56px)",
                color: "#c2652a",
                lineHeight: 1,
              }}
            >
              0
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#8a7a6e",
                fontWeight: 400,
                marginTop: 8,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
