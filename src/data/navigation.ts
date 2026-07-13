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
// type = "link"       → no dropdown, direct link

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
        heading: "Collections",
        headingHref: "/collections",
        links: [
          { label: "All Products",      href: "/collections/all" },
          { label: "Cat Accessories",   href: "/collections/cat-accessories" },
          { label: "Cat Toys",          href: "/collections/cat-toys" },
          { label: "Dog Accessories",   href: "/collections/dog-accessories" },
          { label: "Dog Toys",          href: "/collections/dog-toys" },
        ],
      },
      {
        heading: "Cat Products",
        headingHref: "/collections/cat-accessories",
        links: [
          { label: "Oasis Tunnel",    href: "/products/oasis-tunnel" },
          { label: "Perfect Pair",    href: "/products/perfect-pair" },
          { label: "Optimal Comfort", href: "/products/optimal-comfort" },
          { label: "Oasis Haven",     href: "/products/oasis-haven" },
        ],
      },
      {
        heading: "Dog Products",
        headingHref: "/collections/dog-toys",
        links: [
          { label: "Paw-Friendly Rope Ring", href: "/products/paw-friendly-rope-ring" },
          { label: "Plush Toy",              href: "/products/plush-toy" },
          { label: "Robust Chew Bone",       href: "/products/robust-chew-bone-toy" },
          { label: "Playful Tug Rope",       href: "/products/playful-tug-rope-toy" },
        ],
      },
    ],
    megaImage: {
      href: "/collections/cat-accessories",
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
      { label: "FAQ",      href: "/pages/faq" },
      { label: "Contact",  href: "/pages/contact" },
    ],
  },

  // ── 3. Specials — image grid ──
  {
    label: "Specials",
    href: "/collections/all",
    type: "image-grid",
    imageItems: [
      { href: "/collections/cat-accessories", image: "/images/categories/cat-accessorize.jpg", badge: "30% Sale", title: "Cat Accessories" },
      { href: "/collections/cat-toys",        image: "/images/categories/cat-toys.jpg",         badge: "20% Sale", title: "Cat Toys"        },
      { href: "/collections/dog-accessories", image: "/images/categories/dog-accessorize.jpg",  badge: "30% Sale", title: "Dog Accessories" },
      { href: "/collections/dog-toys",        image: "/images/categories/dog-toys.jpg",          badge: "20% Sale", title: "Dog Toys"        },
    ],
  },

  // ── 4. Big Savings — image grid ──
  {
    label: "Big Savings",
    href: "/collections/all",
    type: "image-grid",
    imageItems: [
      { href: "/products/oasis-haven",           image: "/images/products/oasis-haven-a.webp",   badge: "20% Sale", title: "Oasis Haven"        },
      { href: "/products/optimal-comfort",       image: "/images/products/optimal-comfort-a.webp",badge: "20% Sale", title: "Optimal Comfort"    },
      { href: "/products/oasis-tunnel",          image: "/images/products/oasis-tunnel-a.webp",  badge: "20% Sale", title: "Oasis Tunnel"        },
      { href: "/products/playful-tug-rope-toy",  image: "/images/products/tug-rope-a.webp",      badge: "20% Sale", title: "Tug Rope Toy"        },
      { href: "/products/robust-chew-bone-toy",  image: "/images/products/chew-bone-a.webp",     badge: "20% Sale", title: "Chew Bone Toy"       },
      { href: "/products/paw-friendly-rope-ring",image: "/images/products/paw-rope-a.webp",      badge: "20% Sale", title: "Rope Ring"           },
    ],
  },
];
