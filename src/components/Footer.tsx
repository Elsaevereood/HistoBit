"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const linkColumns = [
    {
      heading: "Explore",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Topics", href: "/blog" },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "Newsletter", href: "/newsletter" },
        { label: "Shop", href: "/shop" },
        { label: "Ebook (Coming Soon)", href: "/shop" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Press", href: "mailto:info@histobit.com" },
        { label: "Contact", href: "mailto:info@histobit.com" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer
      id="footer"
      style={{
        background: "#3a302a",
        padding: "64px 48px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between"
          style={{ marginBottom: 48, gap: 24 }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: 20,
                color: "#faf5ee",
              }}
            >
              Histobit
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(250, 245, 238, 0.45)",
                marginTop: 6,
              }}
            >
              Military history for serious people.
            </p>
          </div>

          {/* Mini newsletter */}
          {success ? (
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#faf5ee",
              background: "rgba(194, 101, 42, 0.2)",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid rgba(194, 101, 42, 0.4)"
            }}>
              You are on the waitlist.
            </div>
          ) : (
            <form
              className="flex"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: 36,
                  background: "#faf5ee",
                  border: "none",
                  borderRadius: "6px 0 0 6px",
                  padding: "0 12px",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "#3a302a",
                  outline: "none",
                  width: 180,
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  height: 36,
                  background: "#c2652a",
                  color: "#faf5ee",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "0 16px",
                  borderRadius: "0 6px 6px 0",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? "..." : "Join"}
              </button>
            </form>
          )}
        </div>

        {/* Link columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 48, marginBottom: 48 }}
        >
          {linkColumns.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(250, 245, 238, 0.4)",
                  marginBottom: 14,
                  fontWeight: 500,
                }}
              >
                {col.heading}
              </p>
              <div className="flex flex-col">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    {...((link as any).target ? { target: (link as any).target } : {})}
                    className="transition-colors duration-150"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(250, 245, 238, 0.6)",
                      textDecoration: "none",
                      lineHeight: 2.0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#faf5ee")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 245, 238, 0.6)")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(250, 245, 238, 0.1)", marginBottom: 24 }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: 12 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(250, 245, 238, 0.35)",
            }}
          >
            © 2026 Histobit. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(250, 245, 238, 0.35)",
            }}
          >
            Made in India. Read worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
