"use client";

export default function Footer() {
  const linkColumns = [
    {
      heading: "Explore",
      links: [
        { label: "Blog", href: "#" },
        { label: "Videos", href: "#" },
        { label: "Topics", href: "#" },
      ],
    },
    {
      heading: "Products",
      links: [
        { label: "Newsletter", href: "#newsletter" },
        { label: "Shop", href: "#" },
        { label: "Ebook (Coming Soon)", href: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
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
          <form
            className="flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
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
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </form>
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
                  <a
                    key={link.label}
                    href={link.href}
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
                  </a>
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
            © 2025 Histobit. All rights reserved.
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
