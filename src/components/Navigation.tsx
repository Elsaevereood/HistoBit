"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-200"
        style={{
          height: 64,
          width: "100%",
          backgroundColor: "rgba(250, 245, 238, 0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #d8d0c8" : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between h-full w-full" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 22,
              color: "#3a302a",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Histobit
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="no-underline transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#3a302a",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c2652a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3a302a")}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center ml-6 pl-6 border-l border-[#d8d0c8]/60">
              <Link
                href="/newsletter"
                id="nav-subscribe-btn"
                className="transition-all duration-300 no-underline inline-flex items-center justify-center hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md"
                style={{
                  background: "#c2652a",
                  color: "#faf5ee",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 8,
                  padding: "10px 24px",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#a8521f")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#c2652a")}
              >
                Subscribe
              </Link>
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", gap: 5 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: 22,
                height: 2,
                background: "#3a302a",
                transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none",
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: 22,
                height: 2,
                background: "#3a302a",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: 22,
                height: 2,
                background: "#3a302a",
                transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: 32,
              color: "#3a302a",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex flex-col items-center mt-8 w-full max-w-[200px]">
          <Link
            href="/newsletter"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center transition-all duration-300 shadow-sm"
            style={{
              background: "#c2652a",
              color: "#faf5ee",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              fontWeight: 500,
              borderRadius: 8,
              padding: "14px 0",
              textDecoration: "none",
            }}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </>
  );
}
