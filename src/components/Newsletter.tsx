"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextIntoWords } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // Headline 1
    if (headline1Ref.current) {
      const spans1 = splitTextIntoWords(headline1Ref.current);
      tl.to(spans1, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.055,
        ease: "power3.out",
      });
    }

    // Headline 2
    if (headline2Ref.current) {
      const spans2 = splitTextIntoWords(headline2Ref.current);
      tl.to(spans2, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.055,
        ease: "power3.out",
      }, "+=0.2");
    }

    // Subline
    if (sublineRef.current) {
      gsap.set(sublineRef.current, { y: 20, opacity: 0 });
      tl.to(sublineRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "+=0.3");
    }

    // Micro lines
    if (microRef.current) {
      gsap.set(microRef.current, { y: 16, opacity: 0 });
      tl.to(microRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.15");
    }

    // Form
    if (formRef.current) {
      gsap.set(formRef.current, { y: 20, opacity: 0 });
      tl.to(formRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.2");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      style={{
        width: "100%",
        background: "#c2652a",
        padding: "120px 48px",
        textAlign: "center",
      }}
    >
      <h2
        ref={headline1Ref}
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontSize: "clamp(36px, 5vw, 60px)",
          color: "#faf5ee",
          lineHeight: 1.0,
          textAlign: "center",
        }}
      >
        The History They Left Out
      </h2>
      <h2
        ref={headline2Ref}
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontSize: "clamp(36px, 5vw, 60px)",
          color: "#faf5ee",
          lineHeight: 1.0,
          textAlign: "center",
          marginLeft: "clamp(0px, 5vw, 80px)",
          marginTop: 4,
        }}
      >
        — in your inbox.
      </h2>

      <p
        ref={sublineRef}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          color: "rgba(250, 245, 238, 0.75)",
          lineHeight: 1.6,
          maxWidth: 480,
          margin: "28px auto 0",
        }}
      >
        One email. Every week. Military history told the way it deserves — deep, specific, and without mythology. Free forever.
      </p>

      <div
        ref={microRef}
        className="flex flex-wrap items-center justify-center"
        style={{
          gap: 24,
          marginTop: 16,
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "rgba(250, 245, 238, 0.55)",
        }}
      >
        <span>No spam</span>
        <span>·</span>
        <span>Unsubscribe anytime</span>
        <span>·</span>
        <span>Read by 12,000 people</span>
      </div>

      {success ? (
        <div style={{
          maxWidth: 480,
          margin: "40px auto 0",
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontSize: 22,
          color: "#faf5ee",
          textAlign: "center",
        }}>
          You&apos;re in. First dispatch arrives next week.
        </div>
      ) : (
        <form
          ref={formRef}
          className="flex flex-col items-center gap-3"
          style={{ maxWidth: 480, margin: "40px auto 0" }}
          onSubmit={handleSubmit}
        >
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                height: 48,
                background: "#faf5ee",
                border: "none",
                borderRadius: "8px 0 0 8px",
                padding: "0 20px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#3a302a",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="transition-colors duration-200"
              style={{
                height: 48,
                background: "#3a302a",
                color: "#faf5ee",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "0 28px",
                borderRadius: "0 8px 8px 0",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#1a1008"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#3a302a"; }}
            >
              {loading ? "Joining..." : "Send Me the History"}
            </button>
          </div>
          {error && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#faf5ee", opacity: 0.85 }}>
              {error}
            </div>
          )}
        </form>
      )}
    </section>
  );
}
