"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

export default function BlogTOC() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(".blog-content h2")
    ) as HTMLElement[];

    if (headings.length === 0) return;

    const tocItems: TocItem[] = headings.map((el, i) => {
      const id = el.id || `toc-section-${i}`;
      el.id = id;
      return { id, label: el.innerText };
    });

    setItems(tocItems);
    if (tocItems.length > 0) setActiveId(tocItems[0].id);

    // Show/hide based on whether the article body is in view
    const articleEl = document.querySelector(".blog-content") as HTMLElement;
    let visibilityObserver: IntersectionObserver | null = null;
    if (articleEl) {
      visibilityObserver = new IntersectionObserver(
        (entries) => setVisible(entries[0].isIntersecting),
        { threshold: 0 }
      );
      visibilityObserver.observe(articleEl);
    }

    // Smooth active section: scroll-based, finds the last heading above 35% viewport
    const onScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.35;
      let current = tocItems[0].id;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= threshold) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (visibilityObserver) visibilityObserver.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <aside
      className="blog-toc-sidebar"
      style={{
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        // Always 32px to the left of the article edge
        // Article is maxWidth 760px centered → left edge = 50vw - 380px
        // TOC is 180px wide with 32px gap → left = 50vw - 380px - 32px - 180px
        left: "calc(50vw - 592px)",
        width: 180,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease",
        display: "none", // overridden by CSS media query
        zIndex: 10,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "rgba(58,48,42,0.4)",
          marginBottom: 20,
        }}
      >
        Contents
      </p>
      <nav>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                borderLeft: `2px solid ${isActive ? "#c2652a" : "rgba(216,208,200,0.5)"}`,
                padding: "7px 0 7px 14px",
                marginBottom: 2,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.5,
                color: isActive ? "#c2652a" : "rgba(58,48,42,0.5)",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
                transition: "color 0.3s ease, border-color 0.3s ease",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
