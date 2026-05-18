import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Dispatch — Newsletter",
  description: "Join 40,000 readers getting deep military history every week. Free newsletter. No spam. Unsubscribe anytime.",
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
