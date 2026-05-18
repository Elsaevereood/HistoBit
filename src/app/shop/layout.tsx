import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — The Logistic Nightmare Ebook",
  description: "The Logistic Nightmare — 87 pages on ancient military logistics. Alexander, Rome, Hannibal, the Mongols, Napoleon. $15. Instant PDF delivery.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
