export interface ProductVariant {
  id: string;
  label: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  available: boolean;
}

export interface NutritionalRow {
  label: string;
  value: string;
  indented?: boolean;
}

export interface AccordionTab {
  id: string;
  title: string;
  icon?: string;
  content: string;
}

export interface ComplementaryProduct {
  id: string;
  title: string;
  href: string;
  price: string;
  compareAtPrice?: string;
  image: string;
}

export interface ProductDetail {
  slug: string;
  title: string;
  vendor: string;
  description: string;
  tags: string[];
  images: string[];
  price: string;
  compareAtPrice?: string;
  badge?: string;
  taxNote: string;
  inventory: number;
  variants: ProductVariant[];
  nutritionalInfo: NutritionalRow[];
  accordionTabs: AccordionTab[];
  complementaryProducts: ComplementaryProduct[];
  deliveryDays: { earliest: number; latest: number };
  breadcrumbs: { label: string; href: string }[];
}

export const energyBoostProduct: ProductDetail = {
  slug: "energy-boost",
  title: "Energy Boost",
  vendor: "Flux-Paws",
  description:
    "Energy Boost Natural Dog Treats are crafted with wholesome ingredients to fuel your dog's active lifestyle. These tasty treats provide a nutritious reward that supports vitality and overall health. Packaged in a resealable bag to keep freshness locked in, they're the perfect way to keep your furry friend energized and happy.",
  tags: ["No GMO", "Dairy Free", "Gluten Free", "Peanut Free"],
  images: [
    "/images/products/energy-boost-a.webp",
    "/images/products/energy-boost-c.webp",
    "/images/products/energy-boost-b.webp",
  ],
  price: "€9,99 EUR",
  compareAtPrice: "€13,99 EUR",
  badge: "Sale",
  taxNote: "Tax included.",
  inventory: 20,
  variants: [
    {
      id: "100g",
      label: "100g",
      price: "€9,99 EUR",
      compareAtPrice: "€13,99 EUR",
      image: "/images/products/energy-boost-a.webp",
      available: true,
    },
    {
      id: "200g",
      label: "200g",
      price: "€19,99 EUR",
      image: "/images/products/energy-boost-c.webp",
      available: true,
    },
    {
      id: "500g",
      label: "500g",
      price: "€29,99 EUR",
      image: "/images/products/energy-boost-b.webp",
      available: true,
    },
  ],
  nutritionalInfo: [
    { label: "Energy", value: "210 kJ / 50 kcal" },
    { label: "Fat", value: "2g" },
    { label: "of which: Saturates", value: "0.3g", indented: true },
    { label: "Carbohydrate", value: "15g" },
    { label: "of which: Sugars", value: "6g", indented: true },
    { label: "Fiber", value: "5g" },
    { label: "Protein", value: "3g" },
    { label: "Salt", value: "0.02g" },
  ],
  accordionTabs: [
    {
      id: "nutritional",
      title: "Nutritional information",
      content: "",
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      icon: "truck",
      content:
        "If you're looking to return or exchange your order for whatever reason, we're here to help! We offer <strong>free returns</strong> within <strong>30 days</strong> of purchase. You can return your product for <strong>store credit</strong>, <strong>a different product</strong>, or a <strong>refund</strong> to the original payment method.",
    },
    {
      id: "support",
      title: "24/7 Support",
      icon: "headset",
      content:
        "You can reach out to us through our contact channels with any feedback or questions you may have. We'll respond as soon as possible during our regular business hours.",
    },
    {
      id: "benefits",
      title: "Main Benefits",
      icon: "heart",
      content:
        "Our Flux Protein-Rich, Plant-Based Food offers a variety of benefits. It's packed with high-quality plant-based protein to support muscle growth and recovery, and it's enriched with essential vitamins and minerals to boost your overall health. Plus, it's made from all-natural ingredients, free from artificial additives, and is easy to digest, making it a perfect addition to any balanced diet.",
    },
  ],
  complementaryProducts: [
    {
      id: "calm-sleep",
      title: "Calm & Sleep",
      href: "/products/calm-sleep",
      price: "€39,00 EUR",
      image: "/images/products/calm-sleep-a.webp",
    },
    {
      id: "derma-care",
      title: "Derma Care",
      href: "/products/derma-care",
      price: "€29,00 EUR",
      compareAtPrice: "€32,00 EUR",
      image: "/images/products/derma-care-a.webp",
    },
    {
      id: "harness-leash",
      title: "OneFit Dog Harness & Leash",
      href: "/products/harness-leash-set",
      price: "€59,00 EUR",
      image: "/images/products/harness-a.webp",
    },
    {
      id: "plush-bed",
      title: "Plush Dog Bed",
      href: "/products/cozy-plush-dog-bed",
      price: "€69,00 EUR",
      image: "/images/products/plush-bed-a.webp",
    },
    {
      id: "power-pack",
      title: "Natural Power Pack",
      href: "/products/natural-power-pack",
      price: "€12,99 EUR",
      image: "/images/products/power-pack-a.webp",
    },
  ],
  deliveryDays: { earliest: 2, latest: 4 },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Best Sellers", href: "/collections/best-sellers" },
    { label: "Energy Boost", href: "/products/energy-boost" },
  ],
};

export const productDetails: Record<string, ProductDetail> = {
  "energy-boost": energyBoostProduct,
};
