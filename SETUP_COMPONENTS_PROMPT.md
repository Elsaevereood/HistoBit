# ONE-TIME SETUP — Run this once in Antigravity before using the blog prompt maker

This is a one-time setup. After this runs, every blog post can use visual components. Do not run this again.

---

Update the file `src/app/blog/[slug]/page.tsx`.

Find the `const components = {` object. Add the following entries to it. Do not remove or change any existing entries (h2, p, strong, em, hr, blockquote, img). Only add the new ones below.

Also update the existing `blockquote` entry and `img` entry as described.

Do not touch any other file.

---

## REPLACE the existing blockquote entry with this:

```tsx
blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
  <blockquote className="blog-reveal" style={{
    margin: '48px 0',
    padding: '0 0 0 28px',
    borderLeft: '3px solid #c2652a',
  }} {...props} />
),
```

## REPLACE the existing img entry with this:

```tsx
img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <figure className="blog-img-reveal" style={{ margin: '48px 0' }}>
    <img src={src} alt={alt} style={{ width: '100%', borderRadius: 8 }} {...props} />
    {alt && (
      <figcaption style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: '#8a7a6e',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 1.5,
      }}>{alt}</figcaption>
    )}
  </figure>
),
```

## ADD these new entries to the components object:

```tsx
table: (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="blog-reveal" style={{ overflowX: 'auto', margin: '40px 0' }}>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: '#3a302a',
    }} {...props} />
  </div>
),
thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead style={{ background: 'rgba(58,48,42,0.04)', borderBottom: '2px solid rgba(216,208,200,0.8)' }} {...props} />
),
tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
),
tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr style={{ borderBottom: '1px solid rgba(216,208,200,0.5)' }} {...props} />
),
th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th style={{
    padding: '12px 16px',
    textAlign: 'left',
    fontFamily: 'var(--font-body)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#6b5c4e',
    fontWeight: 600,
  }} {...props} />
),
td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td style={{
    padding: '12px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: '#3a302a',
    lineHeight: 1.6,
  }} {...props} />
),

StatBox: ({ number, label }: { number: string; label: string }) => (
  <div className="blog-reveal" style={{
    textAlign: 'center',
    padding: '56px 24px',
    margin: '56px 0',
    borderTop: '1px solid rgba(216,208,200,0.6)',
    borderBottom: '1px solid rgba(216,208,200,0.6)',
  }}>
    <div style={{
      fontFamily: "'EB Garamond', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(64px, 10vw, 104px)',
      fontWeight: 400,
      color: '#c2652a',
      lineHeight: 1,
      marginBottom: 16,
    }}>{number}</div>
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: '#6b5c4e',
      maxWidth: 420,
      margin: '0 auto',
      lineHeight: 1.65,
    }}>{label}</div>
  </div>
),

FactBox: ({ children }: { children: React.ReactNode }) => (
  <div className="blog-reveal" style={{
    background: 'rgba(194,101,42,0.05)',
    border: '1px solid rgba(194,101,42,0.18)',
    borderLeft: '3px solid #c2652a',
    borderRadius: '0 8px 8px 0',
    padding: '24px 28px',
    margin: '40px 0',
  }}>
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#c2652a',
      fontWeight: 600,
      marginBottom: 10,
    }}>Key Fact</div>
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: '#3a302a',
      lineHeight: 1.7,
    }}>{children}</div>
  </div>
),

PullQuote: ({ text, attribution }: { text: string; attribution?: string }) => (
  <div className="blog-reveal" style={{
    margin: '56px -24px',
    padding: '48px 24px',
    background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #efd5a8 0%, #f5e6c8 40%, #faf5ee 100%)',
    textAlign: 'center',
  }}>
    <p style={{
      fontFamily: "'EB Garamond', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(22px, 3.5vw, 32px)',
      color: '#3a302a',
      lineHeight: 1.4,
      marginBottom: attribution ? 20 : 0,
      maxWidth: 600,
      margin: '0 auto',
    }}>{text}</p>
    {attribution && (
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: '#8a7a6e',
        fontWeight: 500,
        marginTop: 20,
      }}>{attribution}</p>
    )}
  </div>
),

Versus: ({ leftLabel, rightLabel, leftItems, rightItems }: {
  leftLabel: string; rightLabel: string;
  leftItems: string[]; rightItems: string[];
}) => (
  <div className="blog-reveal" style={{
    display: 'grid',
    gridTemplateColumns: '1fr 40px 1fr',
    margin: '48px 0',
    border: '1px solid rgba(216,208,200,0.6)',
    borderRadius: 8,
    overflow: 'hidden',
  }}>
    <div style={{ padding: '32px 28px', background: '#faf5ee' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c2652a', fontWeight: 600, marginBottom: 20 }}>{leftLabel}</div>
      {leftItems.map((item: string, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
          <span style={{ color: '#c2652a', marginTop: 2, flexShrink: 0 }}>•</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3a302a', lineHeight: 1.6 }}>{item}</span>
        </div>
      ))}
    </div>
    <div style={{ background: 'rgba(216,208,200,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 18, color: '#8a7a6e' }}>vs</span>
    </div>
    <div style={{ padding: '32px 28px', background: 'rgba(58,48,42,0.02)' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c3c3c', fontWeight: 600, marginBottom: 20 }}>{rightLabel}</div>
      {rightItems.map((item: string, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
          <span style={{ color: '#8c3c3c', marginTop: 2, flexShrink: 0 }}>•</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3a302a', lineHeight: 1.6 }}>{item}</span>
        </div>
      ))}
    </div>
  </div>
),

Timeline: ({ items }: { items: Array<{ time: string; event: string }> }) => (
  <div className="blog-reveal" style={{ margin: '48px 0', position: 'relative', paddingLeft: 104 }}>
    <div style={{ position: 'absolute', left: 83, top: 8, bottom: 8, width: 1, background: 'rgba(216,208,200,0.8)' }} />
    {items.map((item: { time: string; event: string }, i: number) => (
      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28, position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: -104,
          width: 80,
          textAlign: 'right',
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: '#8a7a6e',
          fontWeight: 500,
          letterSpacing: '0.04em',
          paddingTop: 2,
        }}>{item.time}</div>
        <div style={{
          position: 'absolute',
          left: -13,
          top: 4,
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: '#c2652a',
          border: '2px solid #faf5ee',
          boxShadow: '0 0 0 1px #c2652a',
          flexShrink: 0,
        }} />
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3a302a', lineHeight: 1.65 }}>{item.event}</div>
      </div>
    ))}
  </div>
),

OrderOfBattle: ({ title, rows }: { title: string; rows: Array<{ unit: string; commander: string; strength: string }> }) => (
  <div className="blog-reveal" style={{ margin: '48px 0' }}>
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c2652a', fontWeight: 600, marginBottom: 16 }}>{title}</div>
    <div style={{ border: '1px solid rgba(216,208,200,0.6)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', background: 'rgba(58,48,42,0.04)', padding: '12px 20px', borderBottom: '1px solid rgba(216,208,200,0.6)' }}>
        {['Unit', 'Commander', 'Strength'].map((h: string) => (
          <div key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b5c4e', fontWeight: 600 }}>{h}</div>
        ))}
      </div>
      {rows.map((row: { unit: string; commander: string; strength: string }, i: number) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', padding: '14px 20px', borderBottom: i < rows.length - 1 ? '1px solid rgba(216,208,200,0.4)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(250,245,238,0.5)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3a302a', fontWeight: 500 }}>{row.unit}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6b5c4e' }}>{row.commander}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6b5c4e' }}>{row.strength}</div>
        </div>
      ))}
    </div>
  </div>
),
```

---

After updating `page.tsx`, add these styles to `src/app/globals.css` at the end of the file:

```css
/* Drop cap — first paragraph of blog content */
.blog-content > p:first-of-type::first-letter {
  font-family: 'EB Garamond', serif;
  font-size: 5.2em;
  font-weight: 400;
  float: left;
  line-height: 0.75;
  margin-right: 8px;
  margin-top: 6px;
  color: #c2652a;
}

/* Blockquote body style */
.blog-content blockquote p {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: clamp(18px, 2.5vw, 22px);
  color: #3a302a;
  line-height: 1.55;
  margin: 0;
}
```

---

Verify:
- `page.tsx` has all new component entries added
- No existing components were removed or changed (except blockquote and img which were replaced as instructed)
- `globals.css` has the two new CSS blocks at the bottom
- No other files were touched
- TypeScript compiles without errors
