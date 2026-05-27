"use client";

import { useState } from "react";

interface ShareBarProps {
  title: string;
  slug: string;
}

export default function ShareBar({ title, slug }: ShareBarProps) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`
    .replace(/^undefined\//, "https://histobit.com/")
    .replace(/^\/blog\//, "https://histobit.com/blog/");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      label: "Share on WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.166.002 9.378-4.207 9.381-9.377.002-2.505-.972-4.86-2.747-6.637C16.08 2.812 13.725 1.836 11.22 1.836c-5.176 0-9.386 4.207-9.39 9.379-.002 1.702.447 3.367 1.299 4.843l-.97 3.543 3.633-.953zm11.91-5.326c-.32-.16-1.89-.933-2.185-1.04-.294-.108-.509-.16-.723.16-.214.32-.83 1.04-.963 1.246-.134.207-.268.232-.589.072-.32-.16-1.353-.499-2.576-1.59-1.01-.902-1.688-2.015-1.887-2.355-.198-.34-.022-.523.148-.692.153-.153.34-.397.51-.595.17-.198.226-.34.34-.567.113-.227.056-.425-.028-.585-.085-.16-.723-1.745-.99-2.39-.26-.628-.525-.544-.723-.554-.187-.01-.4-.01-.615-.01-.214 0-.564.08-.86.402-.296.32-1.127 1.102-1.127 2.688 0 1.587 1.153 3.12 1.312 3.332.16.213 2.27 3.466 5.5 4.863.768.332 1.368.53 1.836.679.771.245 1.472.21 2.025.128.617-.092 1.89-.773 2.157-1.48.267-.707.267-1.313.187-1.442-.08-.129-.294-.209-.614-.369z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      label: "Share on Facebook",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
    },
    {
      name: "Twitter/X",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      label: "Share on Twitter / X",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
      label: "Share on LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="mt-12 pt-8"
      style={{
        borderTop: "1px solid rgba(216, 208, 200, 0.6)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          color: "#8a7a6e",
          fontSize: "13px",
          letterSpacing: "0.05em",
          display: "block",
          marginBottom: "12px",
        }}
      >
        Share this article
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {shareOptions.map((option) => (
          <a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#d8d0c8]/60 bg-[#faf5ee] text-[#3a302a] hover:bg-[#c2652a] hover:text-white transition-all duration-200 cursor-pointer"
            aria-label={option.label}
            title={option.label}
          >
            {option.icon}
          </a>
        ))}
        <div className="relative">
          <button
            onClick={handleCopy}
            className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#d8d0c8]/60 bg-[#faf5ee] text-[#3a302a] hover:bg-[#c2652a] hover:text-white transition-all duration-200 cursor-pointer"
            aria-label="Copy post link"
            title={copied ? "Copied!" : "Copy Link"}
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>
          {copied && (
            <span
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 text-xs text-[#faf5ee] bg-[#3a302a] rounded-[4px] shadow-sm pointer-events-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Copied!
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
