"use client";

import { useEffect } from "react";

export default function BlogAnimations() {
  useEffect(() => {
    // ── Reading progress bar ──────────────────────────────────────
    const bar = document.getElementById("blog-progress-bar");
    const onScroll = () => {
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + "%";

      // Parallax hero
      const heroImg = document.getElementById("blog-hero-img");
      if (heroImg && scrollTop < window.innerHeight * 1.4) {
        heroImg.style.transform = `translateY(${scrollTop * 0.25}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Drop cap on first paragraph ───────────────────────────────
    const firstP = document.querySelector(".blog-content p");
    if (firstP) firstP.classList.add("blog-dropcap");

    // ── Intersection Observer for all animated elements ───────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(
      ".blog-reveal, .blog-heading-reveal, .blog-section-rule, .blog-img-reveal"
    );
    targets.forEach((el) => observer.observe(el));

    // ── Stagger paragraph fade-ins slightly ───────────────────────
    document.querySelectorAll(".blog-reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${Math.min(i * 0.035, 0.25)}s`;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
