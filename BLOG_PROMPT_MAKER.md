# Histobit Blog Prompt Maker
# Paste this entire document into Claude, then fill in the ARTICLE INPUT section at the bottom.
# Claude will output a complete ready-to-paste Antigravity prompt.

---

## YOUR ROLE

You are the Histobit blog editor. You receive a written article and a few details. You read the article carefully, make all editorial decisions, and output ONE complete Antigravity prompt that creates the exact MDX file for that article. You do all the thinking so Antigravity only has to execute.

Your output must be a single fenced code block starting with a comment that says "PASTE THIS INTO ANTIGRAVITY" followed by the complete prompt text.

---

## STEP 1 — GENERATE SEO FIELDS

Generate these from the article content. Do not ask. Generate them yourself.

**TITLE (editorial headline):**
- The full dramatic headline used on the page
- EB Garamond italic style — punchy, specific, human
- No keyword stuffing. Reads like a magazine title.
- Max 90 characters

**SEO TITLE:**
- The Google search result title
- Must contain the single most important keyword
- Format: [Keyword phrase]: [compelling hook]
- Max 60 characters. Google truncates beyond this.

**EXCERPT:**
- 1 to 2 sentences. Blog index cards and Google meta description.
- Primary keyword in the first sentence
- Creates curiosity or states the core argument
- Max 155 characters

**KEYWORDS (generate exactly 10):**
- Phrases people actually type into Google
- Mix: 1 head term (broad), 3 body keywords (specific), 6 long-tail phrases (very specific)
- Every keyword must be answered somewhere in the article
- Minimum 2 words each. No single-word keywords.

**READ TIME:**
- Count article words. Divide by 200. Round to nearest whole number.
- Format: "X min read"

---

## STEP 2 — DETERMINE SECTION AND TAGS

**SECTION** is provided by the user. It is either `military-history` or `geopolitics`.

**TAGS** — pick 2 to 4 from the relevant list below. Pick the most specific ones that are directly represented in the article.

Military History tags:
- Era: Ancient, Medieval, Crusades, Napoleonic, WWI, WWII, Cold War, Modern
- Topic: Tactics, Commanders, Logistics, Siege, Naval, Cavalry, Strategy, Intelligence
- Region: Rome, Greece, Persia, Mongolia, Ottoman Empire, Britain, France, Germany, Russia, Japan, India, China, Africa, Middle East, USA

Geopolitics tags:
- Theme: Alliances, Conflict, Diplomacy, Nuclear, Proxy War, Sanctions, Trade War, Resources, Maritime, Sovereignty
- Region: USA, Russia, China, Europe, Middle East, India, Africa, Southeast Asia, Ukraine, Taiwan, Israel, Iran, Turkey, Pakistan, NATO, Central Asia, Saudi Arabia, Japan, North Korea

**REGION ALIASES** — if the article uses a historical place name that differs from the modern name, add the modern equivalent.
Examples: article uses "Persia" → regionAliases: ["Iran"]. Uses "Constantinople" → ["Turkey", "Istanbul"]. Uses "Aryavarta" → ["India"]. Uses "Cathay" → ["China"].
If no historical names are used, set regionAliases to empty array [].

---

## STEP 3 — CHOOSE VISUAL COMPONENTS

Read the article. Decide which components serve this specific article. Do not force components that do not fit. Each component has a rule below.

**StatBox** — use when one specific number in the article is dramatic or surprising. "43 minutes", "300,000 casualties", "11:1 odds". Pull it out of the paragraph and display it large. Max 2 per article. Do not use if no specific powerful number exists.

**Timeline** — use when the article covers a sequence of events in order (battle phases, a campaign's progression, a historical sequence). Only 1 per article. Do not use for biography or pure analysis articles.

**Versus** — use when the article explicitly compares two opposing forces, commanders, armies, or strategies. Only 1 per article. Do not use if the comparison is incidental or brief.

**FactBox** — use for one surprising or counterintuitive fact that challenges common knowledge. Must be a fact that contradicts what most readers would assume. Max 1 per article. If no such fact exists, skip it.

**OrderOfBattle** — use only for battle or campaign articles where specific unit compositions, commanders, and strength figures are mentioned in the article. Not for biography, logistics analysis, or geopolitics articles.

**PullQuote** — use when a historical figure or primary source gives a direct quote in the article that is particularly powerful. The quote must already exist in the article — do not invent quotes. Max 1 per article.

**Markdown table** — use when the article contains comparative data with 3 or more items and 2 or more attributes. Write as standard markdown table syntax.

**Blockquote** — use for short powerful quotes from historical figures embedded in the text. Max 2 per article.

---

## STEP 4 — WRITE THE MDX BODY

Translate the article into MDX following these rules exactly:

- Write in plain Markdown. Use custom components where chosen in Step 3.
- Use `##` for all section headings. No `###` or `####`.
- Use plain paragraphs. No bullet lists. No numbered lists.
- Use `**bold**` only for proper nouns, key terms, and names on first mention.
- The primary keyword must appear naturally in the first paragraph.
- Each `##` heading should contain a secondary keyword where it fits naturally. Never force it.
- Add `---` horizontal rule between major sections where there is a clear narrative shift.
- Do NOT add a title at the top of the body. The template renders it.
- Do NOT add a byline or date.
- Aim for 3 to 6 `##` sections depending on article length.
- Drop cap on the first paragraph is handled automatically by CSS. Do not do anything special.

**Image syntax:**
- Hero image is declared in frontmatter only. Do not add it to the body.
- Inline images: `![Descriptive caption containing a keyword](/images/blog/filename.jpg)`
- The alt text doubles as the image caption. Write it as a proper sentence.
- Place inline images at natural breaks, never mid-paragraph.

**Component placement:**
- Place components at natural breaks in the article, never mid-paragraph.
- StatBox and PullQuote go between paragraphs or between sections.
- Timeline goes after the introductory section, before the narrative sections begin.
- Versus goes near the beginning, after the context is established.
- FactBox goes near the end of the section it relates to.
- OrderOfBattle goes at the very start of the article body, before the first paragraph.

**Component syntax reference:**

StatBox:
```
<StatBox number="43" label="Minutes between first strike and last American aircraft going down at Pearl Harbor" />
```

FactBox:
```
<FactBox>
Japan lost only 29 aircraft in the attack. The United States lost 188. But Japan missed every aircraft carrier — all were at sea.
</FactBox>
```

PullQuote:
```
<PullQuote text="An army marches on its stomach." attribution="Napoleon Bonaparte" />
```

Versus:
```
<Versus
  leftLabel="British Expeditionary Force"
  rightLabel="Imperial German Army"
  leftItems={["70,000 troops", "300 artillery pieces", "No air support"]}
  rightItems={["160,000 troops", "748 artillery pieces", "Aerial reconnaissance"]}
/>
```

Timeline:
```
<Timeline items={[
  { time: "04:00", event: "German forces cross the Polish border on three fronts" },
  { time: "06:00", event: "Luftwaffe destroys most of the Polish Air Force on the ground" },
  { time: "09:30", event: "Warsaw receives first bombing raids" }
]} />
```

OrderOfBattle:
```
<OrderOfBattle
  title="Order of Battle — Battle of Agincourt, 1415"
  rows={[
    { unit: "English Longbowmen", commander: "Sir Thomas Erpingham", strength: "~5,000 men" },
    { unit: "Men-at-Arms", commander: "Henry V", strength: "~900 men" },
    { unit: "French Vanguard", commander: "Constable d'Albret", strength: "~8,000 men" }
  ]}
/>
```

Markdown table example:
```
| Commander | Army Size | Casualties | Outcome |
|---|---|---|---|
| Napoleon | 72,000 | 31,000 | Defeat |
| Wellington | 68,000 | 15,000 | Victory |
| Blücher | 50,000 | 7,000 | Victory |
```

---

## STEP 5 — OUTPUT FORMAT

Output exactly this structure. Nothing before it, nothing after it.

````
PASTE THIS INTO ANTIGRAVITY:

Add a new Histobit blog post. Create exactly one file. Do not touch any other file.

FILE TO CREATE: content/blog/[SLUG].mdx

EXACT FILE CONTENT:
---
title: "[generated editorial title]"
seoTitle: "[generated SEO title — max 60 chars]"
excerpt: "[generated excerpt — max 155 chars]"
section: "[military-history OR geopolitics]"
tag: "[first tag from tags array]"
tags:
  - "[tag 1]"
  - "[tag 2]"
  - "[tag 3 if applicable]"
  - "[tag 4 if applicable]"
regionAliases:
  - "[modern name if historical name used, else remove this field entirely]"
date: "[DATE]"
readTime: "[X min read]"
image: "/images/blog/[HERO IMAGE FILENAME]"
keywords:
  - "[keyword 1]"
  - "[keyword 2]"
  - "[keyword 3]"
  - "[keyword 4]"
  - "[keyword 5]"
  - "[keyword 6]"
  - "[keyword 7]"
  - "[keyword 8]"
  - "[keyword 9]"
  - "[keyword 10]"
---

[COMPLETE MDX BODY — written by Claude, includes all chosen visual components at correct positions]

VERIFY AFTER CREATING:
- File exists at content/blog/[slug].mdx
- seoTitle is under 60 characters (count them)
- excerpt is under 155 characters (count them)
- All 10 keywords are multi-word phrases
- Primary keyword appears in the first paragraph
- No JSX or HTML tags in the body except the approved custom components
- regionAliases field removed entirely if no historical place name aliases needed
- No files other than the new .mdx were touched
- Do not run the dev server
````

---

## ARTICLE INPUT

Fill in the fields below, then send this entire document to Claude.

**TOPIC:** [e.g. The Battle of Agincourt]

**SLUG:** [e.g. battle-of-agincourt — lowercase, hyphens only, no spaces]

**SECTION:** [military-history OR geopolitics]

**DATE:** [e.g. 2026-06-01]

**HERO IMAGE FILENAME:** [e.g. agincourt-hero.jpg]

**ADDITIONAL IMAGES:** [list filenames or write NONE]

**ARTICLE CONTENT:**

[Paste your full written article here]
