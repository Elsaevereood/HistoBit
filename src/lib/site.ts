/**
 * Single source of truth for site-wide SEO identity.
 * Change values here, not inside page files.
 */
export const SITE_URL = "https://histobit.com";
export const SITE_NAME = "Histobit";

export const AUTHOR = {
  name: "Aniket Jha",
  url: `${SITE_URL}/about`,
  jobTitle: "Founder and Writer, Histobit",
  description:
    "Aniket Jha researches and writes military history for Histobit, focusing on logistics, command decisions, and the primary-source record behind the myths.",
  // Add every profile that proves the same person is behind this work.
  // Google uses sameAs to merge these into one entity.
  sameAs: [
    "https://www.youtube.com/@HistoBit_official",
  ],
};

export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Deep research military history and geopolitics. No mythology.",
  sameAs: [
    "https://www.youtube.com/@HistoBit_official",
  ],
};

export const SECTION_LABELS: Record<string, string> = {
  "military-history": "Military History",
  geopolitics: "Geopolitics",
};

/**
 * Newsletter launch state.
 * Flip `live` to true when The Dispatch actually starts sending.
 * Everything else on the site reads from here.
 */
export const NEWSLETTER = {
  live: false,
  overline: "THE DISPATCH · COMING SOON",
  heading: "The Dispatch Launches Soon",
  promise:
    "The Dispatch has not started sending yet. Join the waitlist and you will get the first issue before anyone else, free.",
  shortPromise: "Not sending yet. Join the waitlist and get the first issue before anyone else.",
  cta: "Join the Waitlist",
  ctaShort: "Join",
  ctaLoading: "Joining...",
  success: "You are on the waitlist. We will email you before the first dispatch goes out.",
  successShort: "You are on the waitlist.",
  micro: ["No spam", "Free forever", "Unsubscribe anytime"],
};
