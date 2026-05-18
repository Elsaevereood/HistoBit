"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if touch device
    if ("ontouchstart" in window) {
      cursor.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(cursor, "left", { duration: 0.08, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "top", { duration: 0.08, ease: "power2.out" });

    function handleMouseMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function handleMouseEnter(e: Event) {
      const target = e.target as HTMLElement;
      if (!cursor) return;

      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.classList.contains("interactive-card") ||
        target.closest(".interactive-card")
      ) {
        cursor.classList.add("hover-interactive");
        cursor.classList.remove("hover-text-link");
      } else if (
        target.tagName === "A" ||
        target.closest("a")
      ) {
        cursor.classList.add("hover-text-link");
        cursor.classList.remove("hover-interactive");
      }
    }

    function handleMouseLeave() {
      if (!cursor) return;
      cursor.classList.remove("hover-interactive", "hover-text-link");
    }

    document.addEventListener("mousemove", handleMouseMove);

    const interactives = document.querySelectorAll("a, button, .interactive-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll("a, button, .interactive-card");
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
