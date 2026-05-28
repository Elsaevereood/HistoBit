# Antigravity Build Prompt — Histobit Blog Section Split + Tag Filter System

## What This Is

This is a Next.js 15 App Router project with TypeScript and Tailwind CSS. The site is called Histobit — a military history and geopolitics blog. The design system is called "Sahara Warm Minimalism". Do not change any existing design, colors, fonts, or animations unless specifically told to.

Design tokens to preserve:
- Primary color: #c2652a (burnt sienna)
- Background: #faf5ee (warm linen)
- Accent: #8c3c3c (dusty rose)
- Border: #d8d0c8 at 60% opacity
- Heading font: EB Garamond (serif, italic)
- Body font: Manrope (variable: var(--font-body))
- Border radius on buttons/chips: max 8px (no pill shapes except filter chips which use 20px as already coded)
- Card shadow: 0 2px 16px rgba(58,48,42,0.04)

---

## Current File Structure (relevant files only)

```
src/
  app/
    blog/
      BlogIndexClient.tsx       ← current single blog index, needs to be replaced
      [slug]/
        page.tsx                ← individual blog post page
        BlogAnimations.tsx
      layout.tsx
      page.tsx                  ← server component that feeds BlogIndexClient
  components/
    Navigation.tsx              ← needs dropdown added for Blog
  lib/
    mdx.ts                      ← MDX reader, needs section + tags support
content/
  blog/                         ← MDX files live here
```

---

## Task 1 — Update MDX Frontmatter Schema in `src/lib/mdx.ts`

Update the `PostMeta` interface and `getAllPosts()` function to support two new fields:

```typescript
export interface PostMeta {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  tag: string;           // keep for backward compat (single tag, legacy)
  tags: string[];        // NEW — array of tags e.g. ["Tactics", "Rome", "Ancient"]
  section: string;       // NEW — either "military-history" or "geopolitics"
  date: string;
  readTime: string;
  image: string;
  keywords?: string[];
  regionAliases?: string[]; // NEW — alternate historical names e.g. ["Persia"] maps to "Iran"
}
```

In `getAllPosts()`, read these new fields from MDX frontmatter:
- `tags`: array of strings, default to `[data.tag]` if not present (backward compat)
- `section`: string, default to `"military-history"` if not present
- `regionAliases`: array of strings, default to `[]`

Add a new exported function `getPostsBySection(section: string): PostMeta[]` that returns only posts where `post.section === section`.

---

## Task 2 — Update Navigation.tsx

Change the `navLinks` array so that "Blog" is no longer a simple link — it becomes a dropdown trigger with two sub-items.

The dropdown should:
- Open on hover (desktop) and on tap (mobile)
- Show two items:
  - "Military History" → href: `/blog/military-history`
  - "Geopolitics" → href: `/blog/geopolitics`
- Match the existing nav visual style exactly: same font, size, color, hover state (#c2652a)
- Dropdown panel: background #faf5ee, border 1px solid #d8d0c8, border-radius 8px, soft shadow (0 4px 24px rgba(58,48,42,0.08)), padding 8px 0
- Each dropdown item: padding 10px 20px, font Manrope, 13px, color #3a302a, hover background rgba(194,101,42,0.06), hover color #c2652a
- No delay on close — dropdown closes immediately when mouse leaves
- On mobile: in the mobile overlay, show "Military History" and "Geopolitics" as separate full-size links (same style as current mobile links), remove the parent "Blog" link

Keep all other nav links (Newsletter, Shop, About) and the Subscribe button exactly as they are.

---

## Task 3 — Create Two New Blog Index Pages

### 3a — Create `src/app/blog/military-history/page.tsx`

Server component. Calls `getPostsBySection("military-history")` from `@/lib/mdx`. Passes posts to a new client component `BlogSectionClient` with prop `section="military-history"`.

### 3b — Create `src/app/blog/geopolitics/page.tsx`

Server component. Calls `getPostsBySection("geopolitics")` from `@/lib/mdx`. Passes posts to `BlogSectionClient` with prop `section="geopolitics"`.

### 3c — Update `src/app/blog/page.tsx`

The existing `/blog` route should now show a landing page with two cards — one for Military History and one for Geopolitics — instead of the full article grid. Each card links to the respective section. Keep the same warm linen design, use EB Garamond for headings, Manrope for body. This is a simple 2-card layout, nothing complex.

---

## Task 4 — Create `src/app/blog/BlogSectionClient.tsx`

This is the main new component. It replaces `BlogIndexClient.tsx` and is used by both section pages. It receives `posts: PostMeta[]` and `section: "military-history" | "geopolitics"`.

### Tag Taxonomy

Hardcode these tag lists inside the component:

```typescript
const MILITARY_HISTORY_TAGS = [
  // Era
  "Ancient", "Medieval", "Crusades", "Napoleonic", "WWI", "WWII", "Cold War", "Modern",
  // Topic
  "Tactics", "Commanders", "Logistics", "Siege", "Naval", "Cavalry", "Strategy", "Intelligence",
  // Region
  "Rome", "Greece", "Persia", "Mongolia", "Ottoman Empire", "Britain", "France",
  "Germany", "Russia", "Japan", "India", "China", "Africa", "Middle East", "USA"
];

const GEOPOLITICS_TAGS = [
  // Theme
  "Alliances", "Conflict", "Diplomacy", "Nuclear", "Proxy War", "Sanctions",
  "Trade War", "Resources", "Maritime", "Sovereignty",
  // Region
  "USA", "Russia", "China", "Europe", "Middle East", "India", "Africa",
  "Southeast Asia", "Ukraine", "Taiwan", "Israel", "Iran", "Turkey",
  "Pakistan", "NATO", "Central Asia", "Saudi Arabia", "Japan", "North Korea"
];
```

Use `section === "military-history" ? MILITARY_HISTORY_TAGS : GEOPOLITICS_TAGS` to pick the right list.

### Section Labels and Copy

```typescript
const SECTION_CONFIG = {
  "military-history": {
    label: "MILITARY HISTORY · THE ARCHIVE",
    heading: "The Archive",
    subtext: "Every dispatch, every battle, every story. Deep research with no mythology.",
    searchPlaceholder: "Search military history...",
    countLabel: "Dispatches",
  },
  "geopolitics": {
    label: "GEOPOLITICS · WORLD ORDER",
    heading: "World Order",
    subtext: "Historically grounded analysis of the forces shaping today's world.",
    searchPlaceholder: "Search geopolitics...",
    countLabel: "Dispatches",
  }
};
```

### State

```typescript
const [searchQuery, setSearchQuery] = useState("");
const [activeChips, setActiveChips] = useState<string[]>([]); // active tag filter chips
const [tagInputValue, setTagInputValue] = useState("");
const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
```

### Search Bar

A single text input. Searches only the current section's posts. Searches against: `post.title`, `post.excerpt`, `post.tags` (joined), and `post.regionAliases` (joined). This means if a post has regionAliases: ["Persia"] and user types "Iran", it matches because "Iran" should be in the tags array or regionAliases. Keep the same input styling as existing code (white bg, #d8d0c8 border, focus border #c2652a, 8px radius, 13px Manrope).

### Tag Filter Input (the core new feature)

Next to the search bar, add a tag filter input. It looks like a small input with placeholder "Add filter...". 

Behavior:
- As user types, filter the `MILITARY_HISTORY_TAGS` or `GEOPOLITICS_TAGS` array to find matches (case-insensitive, starts-with or includes)
- Show up to 6 suggestions in a dropdown below the input
- Dropdown: white background, border #d8d0c8, border-radius 8px, shadow (0 4px 16px rgba(58,48,42,0.08))
- Each suggestion: padding 8px 16px, 13px Manrope, color #3a302a, hover bg rgba(194,101,42,0.06), hover color #c2652a, cursor pointer
- When user clicks a suggestion OR presses Enter with one suggestion showing:
  - If tag is not already in `activeChips`, add it to `activeChips`
  - Clear `tagInputValue` and `tagSuggestions`
- If user presses Escape, clear `tagInputValue` and close dropdown
- Do NOT add duplicate chips

### Active Chips Strip

Below the search bar + filter input row, show a strip of active chips when `activeChips.length > 0`.

Each chip:
- Background: rgba(194,101,42,0.10)
- Border: 1px solid rgba(194,101,42,0.3)
- Border radius: 20px
- Padding: 6px 12px
- Font: Manrope 12px, color #c2652a, font-weight 500
- An × button on the right: clicking removes that chip from `activeChips`
- × button color: #c2652a, hover color: #8c3c3c

After all chips, show a "Clear all" text button (no border, no background, color #8a7a6e, hover color #c2652a, 12px Manrope) if `activeChips.length > 1`.

### Filtering Logic

```typescript
const filteredPosts = posts.filter(post => {
  // Search filter
  const searchLower = searchQuery.toLowerCase();
  const matchesSearch = !searchQuery || 
    post.title.toLowerCase().includes(searchLower) ||
    post.excerpt.toLowerCase().includes(searchLower) ||
    post.tags.some(t => t.toLowerCase().includes(searchLower)) ||
    (post.regionAliases || []).some(a => a.toLowerCase().includes(searchLower));

  // Tag chip filter — AND logic: post must match ALL active chips
  const matchesChips = activeChips.length === 0 || 
    activeChips.every(chip => 
      post.tags.some(t => t.toLowerCase() === chip.toLowerCase()) ||
      (post.regionAliases || []).some(a => a.toLowerCase() === chip.toLowerCase())
    );

  return matchesSearch && matchesChips;
});
```

### Layout

Keep the same layout structure as existing `BlogIndexClient.tsx`:
- Hero header section (same radial gradient, grain overlay, same GSAP entrance animations)
- Controls bar (search + tag filter input)
- Active chips strip (only visible when chips exist)
- Article grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Empty state message
- Newsletter CTA strip at bottom (same burnt sienna strip as existing)
- Footer

Use the same `BlogCard` component logic (copy it from `BlogIndexClient.tsx` — same card design, grayscale-to-color on hover, tilt effect, glow).

The `post.tag` display on the card should now show `post.tags[0]` (the first tag in the array).

### Related Posts

At the bottom of each individual blog post (in `src/app/blog/[slug]/page.tsx`), add a "Related Dispatches" section. 

Logic: find up to 3 posts that share at least one tag with the current post AND are in the same section. Exclude the current post. If fewer than 3 match, show whatever is available. If 0 match, show nothing (no section header either).

Display them as a horizontal row of simplified cards (image, tag, title, Read More link). Same card styling as BlogCard but without the tilt/glow effect — just a clean static version.

---

## Task 5 — Update Existing Blog Post Routes

In `src/app/blog/[slug]/page.tsx`, the `getPostBySlug` call already works. No URL change needed — individual posts remain at `/blog/[slug]`. Just add the Related Posts section at the bottom (before the Footer).

---

## What NOT to Change

- Do not touch `src/app/about/`, `src/app/shop/`, `src/app/newsletter/`, `src/app/admin/`
- Do not touch any API routes
- Do not touch `globals.css` except to add styles required by new components
- Do not change the color palette, fonts, or spacing of existing components
- Do not change the Newsletter CTA strip design
- Do not change `Footer.tsx`
- Do not change any Supabase, Resend, or Razorpay logic

---

## Summary of Files to Create/Modify

| File | Action |
|---|---|
| `src/lib/mdx.ts` | Modify — add tags[], section, regionAliases, getPostsBySection() |
| `src/components/Navigation.tsx` | Modify — add Blog dropdown |
| `src/app/blog/page.tsx` | Modify — replace with 2-card section landing |
| `src/app/blog/BlogIndexClient.tsx` | Keep but deprecate — new component replaces it |
| `src/app/blog/BlogSectionClient.tsx` | Create new |
| `src/app/blog/military-history/page.tsx` | Create new |
| `src/app/blog/geopolitics/page.tsx` | Create new |
| `src/app/blog/[slug]/page.tsx` | Modify — add Related Dispatches section |
