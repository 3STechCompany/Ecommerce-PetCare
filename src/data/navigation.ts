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
  columns?: NavColumn[];
  megaImage?: NavMegaImage;
  flatLinks?: NavLink[];
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
          { label: "All Products",    href: "/collections/all" },
          { label: "Cat Accessories", href: "/collections/cat-accessories" },
          { label: "Dog Accessories", href: "/collections/dog-accessories" },
          { label: "Dog Toys",        href: "/collections/dog-toys" },
        ],
      },
      {
        heading: "Cat Products",
        headingHref: "/collections/cat-accessories",
        links: [
          { label: "Electric Grooming Brush", href: "/products/3-in-1-electric-pet-grooming-brush" },
          { label: "Calming Donut Bed",        href: "/products/anti-anxiety-calming-pet-bed-washable-plush-donut-dog-bed" },
          { label: "Cat Carrier Backpack",     href: "/products/large-cat-carrier-backpacks-dog-carriers-for-small-dogs-carrier-cat-bag-pet-carrier-for-cat-backpack-carrier-cat-supplies-cat-travel-carrier-small-pet-carrier-airline-approved-dog-carrier" },
          { label: "Bubble Window Backpack", href: "/products/henkelion-cat-backpack-carrier-bubble-carrying-bag-small-dog-backpack-carrier-for-small-medium-dogs-cats-space-capsule-pet-carrier-dog-hiking-backpack-airline-approved-travel-carrier-navy-blue" },
        ],
      },
      {
        heading: "Dog Products",
        headingHref: "/collections/dog-accessories",
        links: [
          { label: "No-Pull Harness",          href: "/products/dog-harness-no-pull-breathable-reflective-pet-harness-vest" },
          { label: "Auto Ball Launcher",       href: "/products/automatic-interactive-dog-ball-launcher" },
          { label: "Rechargeable Nail Grinder", href: "/products/rechargeable-electric-pet-nail-grinder" },
          { label: "All-in-One Grooming Kit",  href: "/products/all-in-one-pet-grooming-kit" },
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

  // ── 3. Specials — image grid (dùng ảnh collection có sẵn) ──
  {
    label: "Specials",
    href: "/collections/all",
    type: "image-grid",
    imageItems: [
      { href: "/collections/cat-accessories", image: "/images/categories/cat-accessorize.jpg", badge: "30% Sale", title: "Cat Accessories" },
      { href: "/collections/dog-accessories", image: "/images/categories/dog-accessorize.jpg",  badge: "30% Sale", title: "Dog Accessories" },
      { href: "/collections/dog-toys",        image: "/images/categories/dog-toys.jpg",          badge: "20% Sale", title: "Dog Toys"        },
    ],
  },

  // ── 4. Big Savings — mega menu với sản phẩm thực ──
  {
    label: "Big Savings",
    href: "/collections/all",
    type: "mega",
    columns: [
      {
        heading: "Cat Accessories",
        headingHref: "/collections/cat-accessories",
        links: [
          { label: "Electric Grooming Brush",    href: "/products/3-in-1-electric-pet-grooming-brush" },
          { label: "Fluffy Donut Pet Bed",        href: "/products/fluffy-donut-pet-bed" },
          { label: "Yinole Grooming Vacuum Kit",  href: "/products/yinole-dog-grooming-kit-2-5l-large-capacity-dog-grooming-vacuum-with-clippers-deshedding-grooming-brush-cleaning-tools-ultra-quiet-pet-grooming-vacuum-for-dogs-p50" },
          { label: "Henkelion Backpack Carrier",  href: "/products/henkelion-cat-backpack-carrier-bubble-carrying-bag-small-dog-backpack-carrier-for-small-medium-dogs-cats-space-capsule-pet-carrier-dog-hiking-backpack-airline-approved-travel-carrier-navy-blue" },
        ],
      },
      {
        heading: "Dog Accessories",
        headingHref: "/collections/dog-accessories",
        links: [
          { label: "Tactical No-Pull Harness", href: "/products/tactical-dog-harness-for-large-dogs-no-pull-dog-vest-harness-with-handle-adjustable-no-choke-easy-control-pet-walking-harness-blackxl" },
          { label: "All-in-One Grooming Kit",  href: "/products/all-in-one-pet-grooming-kit" },
        ],
      },
      {
        heading: "Dog Toys",
        headingHref: "/collections/dog-toys",
        links: [
          { label: "Auto Ball Launcher",     href: "/products/automatic-interactive-dog-ball-launcher" },
          { label: "Automatic Ball Thrower", href: "/products/automatic-dog-ball-thrower" },
        ],
      },
    ],
  },
];
