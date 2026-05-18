export interface Product {
  id: string;
  slug: string;
  tag: string;
  name: string;
  detail: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  gallery: string[];
  type: "digital" | "physical";
  features: string[];
  story: {
    headline: string;
    paragraphs: string[];
  };
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "the-logistic-nightmare",
    tag: "DIGITAL PRODUCT · EBOOK",
    name: "The Logistic Nightmare",
    detail: "Ancient Military Logistics — Alexander, Rome, Hannibal, the Mongols, Napoleon",
    description: "A deep dive into the brutal truth of ancient warfare. Six commanders and the logistical systems that either built their empires or destroyed their armies. This 87-page study cuts through the mythology to examine the raw numbers, supply lines, and operational realities of history's greatest campaigns.",
    price: "$15",
    originalPrice: "$25",
    image: "/images/merch_book_placeholder.png", // We will use CSS/styling or a placeholder if actual image is missing
    gallery: [
      "/images/merch_book_placeholder.png"
    ],
    type: "digital",
    features: [
      "6 deep chapters — one per commander, one per logistics system",
      "87 pages of original research — no Wikipedia, no mythology",
      "Written in Histobit's cinematic, authoritative style",
      "Instant PDF to your inbox the moment you pay"
    ],
    story: {
      headline: "War is not won on the battlefield. It is won on the supply line.",
      paragraphs: [
        "For centuries, historians have focused on the tactics of the battlefield—the flanking maneuvers, the cavalry charges, the clash of infantry. But the grim reality of ancient warfare is that most campaigns were decided before a single sword was drawn.",
        "From Alexander's march across the desert to Napoleon's catastrophic Russian campaign, 'The Logistic Nightmare' strips away the romanticism of war. We examine how armies fed themselves, how they moved, and what happened when the supply lines finally snapped."
      ]
    }
  },
  {
    id: "p2",
    slug: "the-campaign-tee",
    tag: "APPAREL",
    name: "The Campaign Tee",
    detail: "100% washed cotton · Olive · Unisex",
    description: "Crafted for endurance. The Campaign Tee is made from 100% heavyweight washed cotton, featuring a subtle, tonal Histobit insignia. Designed with a relaxed, vintage fit that drapes perfectly and softens over time.",
    price: "$35",
    image: "/images/merch_tee.png",
    gallery: [
      "/images/merch_tee.png"
    ],
    type: "physical",
    features: [
      "100% Heavyweight Washed Cotton (220 GSM)",
      "Garment-dyed for a vintage, lived-in feel",
      "Subtle tonal embroidered logo on the chest",
      "Relaxed, boxy fit (size down for a standard fit)"
    ],
    story: {
      headline: "Built for the long march.",
      paragraphs: [
        "We wanted a t-shirt that felt like it had already survived a campaign. The Campaign Tee is constructed from a dense, 220 GSM cotton that provides structure without stiffness. The garment-dyeing process ensures that each piece has a unique depth of color that will continue to fade beautifully over years of wear.",
        "It is a minimalist piece, defined by its materials and cut rather than loud branding. A quiet nod to the history enthusiast."
      ]
    }
  },
  {
    id: "p3",
    slug: "the-historian-hoodie",
    tag: "APPAREL",
    name: "The Historian Hoodie",
    detail: "Heavyweight fleece · Sand · Unisex",
    description: "The ultimate layering piece for deep research sessions. The Historian Hoodie features an ultra-dense 400 GSM brushed fleece interior, providing exceptional warmth and structure. Finished with a double-lined hood and drop shoulders.",
    price: "$65",
    image: "/images/merch_hoodie.png",
    gallery: [
      "/images/merch_hoodie.png"
    ],
    type: "physical",
    features: [
      "400 GSM Heavyweight Brushed Fleece",
      "Double-lined, structured hood that holds its shape",
      "Drop shoulder design for a relaxed silhouette",
      "Ribbed cuffs and hem"
    ],
    story: {
      headline: "Comfort in the archives.",
      paragraphs: [
        "Whether you are delving into primary sources at a drafty library or just reading late into the night, The Historian Hoodie is designed to be the ultimate comfort layer. The 400 GSM fleece is exceptionally thick, offering a structured look that doesn't collapse like standard hoodies.",
        "The sand colorway is a nod to the desert campaigns of antiquity—a neutral, versatile tone that fits seamlessly into any wardrobe."
      ]
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
