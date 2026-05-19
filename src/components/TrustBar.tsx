"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { num: "8M+", label: "Total Views" },
  { num: "12,000", label: "Newsletter Readers" },
  { num: "60+", label: "Countries" },
  { num: "Est. 2025", label: "Independent" },
];

export default function TrustBar() {
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trustRef.current) {
        const children = trustRef.current.children;
        gsap.set(Array.from(children), { y: 24, opacity: 0 });
        ScrollTrigger.create({
          trigger: trustRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(Array.from(children), {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
            });
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="trust-bar" style={{ background: "#3a302a", padding: "60px 48px" }}>
      <div ref={trustRef} style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 40 }}>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            <div style={{ textAlign: "center", flex: "1 1 auto" }}>
              <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px, 3vw, 36px)", color: "#faf5ee", lineHeight: 1 }}>{item.num}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(250,245,238,0.45)", marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>{item.label}</div>
            </div>
            {i < items.length - 1 && (
              <div style={{ width: 1, height: 40, background: "rgba(250,245,238,0.1)", alignSelf: "center" }} />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
