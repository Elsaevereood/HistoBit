"use client";

import { useState, useEffect, useRef } from "react";

interface ShareBarProps {
  title: string;
  slug: string;
}

export default function ShareBar({ title, slug }: ShareBarProps) {
  const url = `https://histobit.com/blog/${slug}`;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleIgCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIgCopied(true);
      setTimeout(() => setIgCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} ${url}`);

  const platforms = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}`,
      color: "#25D366",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.166.002 9.378-4.207 9.381-9.377.002-2.505-.972-4.86-2.747-6.637C16.08 2.812 13.725 1.836 11.22 1.836c-5.176 0-9.386 4.207-9.39 9.379-.002 1.702.447 3.367 1.299 4.843l-.97 3.543 3.633-.953zm11.91-5.326c-.32-.16-1.89-.933-2.185-1.04-.294-.108-.509-.16-.723.16-.214.32-.83 1.04-.963 1.246-.134.207-.268.232-.589.072-.32-.16-1.353-.499-2.576-1.59-1.01-.902-1.688-2.015-1.887-2.355-.198-.34-.022-.523.148-.692.153-.153.34-.397.51-.595.17-.198.226-.34.34-.567.113-.227.056-.425-.028-.585-.085-.16-.723-1.745-.99-2.39-.26-.628-.525-.544-.723-.554-.187-.01-.4-.01-.615-.01-.214 0-.564.08-.86.402-.296.32-1.127 1.102-1.127 2.688 0 1.587 1.153 3.12 1.312 3.332.16.213 2.27 3.466 5.5 4.863.768.332 1.368.53 1.836.679.771.245 1.472.21 2.025.128.617-.092 1.89-.773 2.157-1.48.267-.707.267-1.313.187-1.442-.08-.129-.294-.209-.614-.369z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "#000000",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "#0A66C2",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#26A5E4",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: "Reddit",
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "#FF4500",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      color: "#E60023",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
    },
    {
      name: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodeURIComponent(title + "\n\n" + url)}`,
      color: "#000000",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.336-.012 2.498-.164 3.461-.554.622-.253 1.118-.597 1.499-1.038l.044-.052c.568-.69.868-1.604.884-2.718-.016-.948-.217-1.73-.594-2.332-.369-.594-.881-1.003-1.506-1.214-.218 1.342-.668 2.386-1.34 3.097-.736.784-1.72 1.193-2.924 1.217h-.027c-.983 0-1.853-.254-2.513-.735-.778-.574-1.184-1.404-1.184-2.4 0-1.026.404-1.873 1.166-2.449.695-.526 1.658-.797 2.844-.797.578 0 1.106.044 1.576.13-.04-.42-.078-.834-.114-1.237-.055-.597-.105-1.153-.105-1.662 0-1.14.286-2.053.874-2.79.644-.811 1.593-1.256 2.75-1.256.961 0 1.798.317 2.422.916.578.555.978 1.344 1.154 2.31l-2.02.32c-.113-.626-.356-1.108-.705-1.44-.263-.252-.597-.38-.987-.38-.47 0-.855.199-1.143.59-.282.385-.426.91-.426 1.547 0 .497.05 1.038.105 1.62.067.736.136 1.488.16 2.317.41.11.79.248 1.13.414 1.073.52 1.886 1.309 2.42 2.348.499.973.748 2.092.748 3.33-.016 1.725-.54 3.12-1.559 4.148-1.069 1.08-2.609 1.643-4.406 1.643-.12 0-.24-.004-.36-.009z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent("I thought you'd enjoy this article:\n\n" + title + "\n\n" + url)}`,
      color: "#8a7a6e",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polyline points="2,4 12,13 22,4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Share trigger button */}
      <section
        className="mt-12 pt-8"
        style={{ borderTop: "1px solid rgba(216, 208, 200, 0.6)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a7a6e",
            fontSize: "13px",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: "14px",
          }}
        >
          Share this article
        </span>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 24px",
            backgroundColor: "#c2652a",
            color: "#faf5ee",
            border: "none",
            borderRadius: "8px",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#a8501e")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#c2652a")}
          aria-label="Share this article"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
      </section>

      {/* Backdrop */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(58, 48, 42, 0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Modal */}
          <div
            ref={modalRef}
            style={{
              backgroundColor: "#faf5ee",
              borderRadius: "16px",
              padding: "36px 32px 32px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 24px 64px rgba(58, 48, 42, 0.18)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8a7a6e",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
              }}
              aria-label="Close share panel"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Heading */}
            <h3 style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: "22px",
              fontWeight: 400,
              color: "#3a302a",
              marginBottom: "6px",
            }}>
              Share this article
            </h3>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#8a7a6e",
              marginBottom: "28px",
              lineHeight: 1.5,
            }}>
              {title}
            </p>

            {/* Platform grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "24px",
            }}>
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px 8px",
                    backgroundColor: "#fff",
                    border: "1px solid rgba(216, 208, 200, 0.7)",
                    borderRadius: "10px",
                    color: "#3a302a",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    transition: "all 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = p.color;
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor = p.color;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                    (e.currentTarget as HTMLElement).style.color = "#3a302a";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(216, 208, 200, 0.7)";
                  }}
                  aria-label={`Share on ${p.name}`}
                >
                  {p.icon}
                  <span>{p.name}</span>
                </a>
              ))}
            </div>

            {/* Instagram story row — special case */}
            <div style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(216, 208, 200, 0.7)",
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Instagram gradient icon */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "#3a302a", margin: 0 }}>
                    Instagram Story
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#8a7a6e", margin: 0, lineHeight: 1.4 }}>
                    Copy link, then paste in your Story
                  </p>
                </div>
              </div>
              <button
                onClick={handleIgCopy}
                style={{
                  padding: "8px 16px",
                  backgroundColor: igCopied ? "#3a302a" : "#c2652a",
                  color: "#faf5ee",
                  border: "none",
                  borderRadius: "6px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {igCopied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            {/* Copy link row */}
            <div style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}>
              <div style={{
                flex: 1,
                backgroundColor: "#fff",
                border: "1px solid rgba(216, 208, 200, 0.7)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "#8a7a6e",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>
                {url}
              </div>
              <button
                onClick={handleCopy}
                style={{
                  padding: "10px 18px",
                  backgroundColor: copied ? "#3a302a" : "#c2652a",
                  color: "#faf5ee",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
