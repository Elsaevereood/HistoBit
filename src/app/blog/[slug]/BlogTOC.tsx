"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

export default function BlogTOC() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Read all h2 headings from the rendered article
    const headings = Array.from(
      document.querySelectorAll(".blog-content h2")
    ) as HTMLElement[];

    if (headings.length === 0) return;

        // Assign IDs if they don't have them, then build items list
    const tocItems: TocItem[] = headings.map((el, i) => {
      const id = el.id || `toc-section-${i}`;
      el.id = id;
      return { id, label: el.innerText };
    });

    setTimeout(() => {
      setItems(tocItems);
      if (tocItems.length > 0) setActiveId(tocItems[0].id);
    }, 0);

    // IntersectionObserver — update active section as user scrolls
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <aside
      style={{
        position: "sticky",
        top: 120,
        width: 220,
        flexShrink: 0,
        alignSelf: "flex-start",
        display: "none", // hidden on mobile — overridden by CSS class below
      }}
      className="blog-toc-sidebar"
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
                borderLeft: isActive
                  ? "2px solid #c2652a"
                  : "2px solid rgba(216,208,200,0.5)",
                padding: "6px 0 6px 14px",
                marginBottom: 4,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                lineHeight: 1.45,
                color: isActive ? "#c2652a" : "rgba(58,48,42,0.55)",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s",
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
