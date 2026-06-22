// ── Kiểu dữ liệu cho mega menu ──

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  heading: string;
  headingHref: string;
  links: NavLink[];
}

export interface NavImageItem {
  href: string;
  image: string;
  badge?: string;
  title: string;
}

export interface NavMegaImage {
  href: string;
  image: string;
  badge: string;
  linkText: string;
}

// type = "mega"       → full-width panel: columns + optional image card (Shop)
// type = "condensed"  → narrow dropdown: flat list of bold links (About)
// type = "image-grid" → image card grid (Specials, Big Savings)
// type = "link"       → no dropdown, direct link (Features)

export type NavItemType = "mega" | "condensed" | "image-grid" | "link";

export interface NavItem {
  label: string;
  href: string;
  type: NavItemType;
  // mega
  columns?: NavColumn[];
  megaImage?: NavMegaImage;
  // condensed
  flatLinks?: NavLink[];
  // image-grid
  imageItems?: NavImageItem[];
}

export const navigationMenu: NavItem[] = [
  // ── 1. Shop — mega menu ──
  {
    label: "Shop",
    href: "/collections/all",
    type: "mega",
    columns: [
      {
        heading: "Product Layouts",
        headingHref: "#",
        links: [
          { label: "3 Column Layout",   href: "/products/natural-dental-sticks" },
          { label: "2 Column Layout",   href: "/products/calm-sleep" },
          { label: "Quick Order Layout",href: "/products/herbal-harmony" },
          { label: "Gift Card",         href: "/products/gift-card" },
          { label: "Color Variants",    href: "/products/waterproof-dog-raincoat" },
        ],
      },
      {
        heading: "Featured",
        headingHref: "#",
        links: [
          { label: "All products",  href: "/collections/all" },
          { label: "Save Big",      href: "/collections/save-big" },
          { label: "New Arrivals",  href: "/collections/new-arrivals" },
          { label: "Best Sellers",  href: "/collections/best-sellers" },
        ],
      },
      {
        heading: "Collections",
        headingHref: "#",
        links: [
          { label: "All collections", href: "/collections" },
          { label: "Cats",            href: "/collections/cats" },
          { label: "Dogs",            href: "/collections/dogs" },
          { label: "Birds",           href: "/collections/bird-food" },
        ],
      },
      {
        heading: "Top 4",
        headingHref: "#",
        links: [
          { label: "Derma Care",             href: "/products/derma-care" },
          { label: "Optimal Comfort",        href: "/products/optimal-comfort" },
          { label: "Waterproof Dog Raincoat",href: "/products/waterproof-dog-raincoat" },
          { label: "Oasis Tunnel",           href: "/products/oasis-tunnel" },
        ],
      },
    ],
    megaImage: {
      href: "/collections/cats",
      image: "/images/hero/hero-cats-desktop.jpg",
      badge: "20% Sale",
      linkText: "Explore Now",
    },
  },

  // ── 2. About — condensed dropdown ──
  {
    label: "About",
    href: "/pages/about-us",
    type: "condensed",
    flatLinks: [
      { label: "About Us", href: "/pages/about-us" },
      { label: "Team",     href: "/pages/team" },
      { label: "Events",   href: "/pages/events" },
      { label: "FAQ",      href: "/pages/faq" },
      { label: "Journal",  href: "/blogs/news" },
      { label: "Contact",  href: "/pages/contact" },
    ],
  },

  // ── 3. Specials — image grid ──
  {
    label: "Specials",
    href: "/collections/save-big",
    type: "image-grid",
    imageItems: [
      { href: "/collections/save-big",       image: "/images/categories/cat-food.jpg",         badge: "10-30% Sale", title: "Big Savings" },
      { href: "/collections/cat-food",       image: "/images/categories/dog-food.jpg",          badge: "15% Sale",   title: "Instant Meals" },
      { href: "/collections/cat-accessories",image: "/images/categories/cat-accessorize.jpg",   badge: "30% Sale",   title: "Accessorize" },
      { href: "/collections/dog-accessories",image: "/images/categories/dog-accessorize.jpg",   badge: "30% Sale",   title: "Dog Accessories" },
    ],
  },

  // ── 4. Big Savings — image grid ──
  {
    label: "Big Savings",
    href: "/collections/save-big",
    type: "image-grid",
    imageItems: [
      { href: "/products/oasis-haven",             image: "/images/products/oasis-haven-a.webp",    badge: "20% Sale", title: "Oasis Haven" },
      { href: "/products/calm-sleep",              image: "/images/products/calm-sleep-a.webp",      badge: "20% Sale", title: "Calm & Sleep" },
      { href: "/products/waterproof-dog-raincoat", image: "/images/products/raincoat-a.webp",        badge: "20% Sale", title: "Waterproof Raincoat" },
      { href: "/products/natural-dental-sticks",   image: "/images/products/power-pack-a.webp",      badge: "20% Sale", title: "Natural Dental Sticks" },
      { href: "/products/energy-boost",            image: "/images/products/energy-boost-a.webp",    badge: "20% Sale", title: "Energy Boost" },
      { href: "/products/playful-tug-rope-toy",    image: "/images/products/tug-rope-a.webp",        badge: "20% Sale", title: "Tug Rope Toy" },
    ],
  },

  // ── 5. Features — simple link ──
  {
    label: "Features",
    href: "/pages/features",
    type: "link",
  },
];
