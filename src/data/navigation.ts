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
          { label: "Cat Toys",        href: "/collections/cat-toys" },
          { label: "Dog Accessories", href: "/collections/dog-accessories" },
          { label: "Dog Toys",        href: "/collections/dog-toys" },
        ],
      },
      {
        heading: "Cat Products",
        headingHref: "/collections/cat-accessories",
        links: [
          { label: "GPS Tracker Collar",  href: "/products/tracker-gps-protective-case-pet-dog-anti-lost-collar" },
          { label: "GPS Tracker A29",     href: "/products/personal-gps-tracker-children-a29-elders-medicine-reminder-top-quality-pet-gps-tracker-collar-for-dogs-waterproof" },
          { label: "G12 Cat GPS Tracker", href: "/products/g12-locator-smart-wireless-tracking-anti-lost-gps-cat-waterproof-wearable-collar-pet-tracker-wholesale" },
          { label: "Cat Water Fountain",  href: "/products/cat-water-fountain-wireless-induction-drink-fountain" },
        ],
      },
      {
        heading: "Dog Products",
        headingHref: "/collections/dog-accessories",
        links: [
          { label: "No Pull Dog Harness",      href: "/products/no-pull-dog-harness-reflective-adjustable-soft-padded-pet-vest-harness" },
          { label: "Auto Ball Launcher",       href: "/products/dog-pet-automatic-interactive-ball-launcher" },
          { label: "Puppy Teething Toy",       href: "/products/pet-teething-stick-puppy-teething-toy-puppy-puzzle-toys-chew-toys-for-dogs-cat-teasing-toy-dog-teething-chew-toy-puppy-dental-care-puppy-toy-dog-molar-toy-nylon-missing-food-snack" },
          { label: "Dog Molar Toy",            href: "/products/dog-molar-toothbrush-toys-chew-cleaning-teeth-elasticity-soft-puppy-dental-care-extra-tough-pet-cleaning-toy-supplies-dog-toys" },
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
      { href: "/collections/cat-toys",        image: "/images/categories/cat-toys.jpg",         badge: "20% Sale", title: "Cat Toys"        },
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
          { label: "GPS Tracker Collar",  href: "/products/tracker-gps-protective-case-pet-dog-anti-lost-collar" },
          { label: "GPS Tracker A29",     href: "/products/personal-gps-tracker-children-a29-elders-medicine-reminder-top-quality-pet-gps-tracker-collar-for-dogs-waterproof" },
          { label: "G12 Cat GPS Tracker", href: "/products/g12-locator-smart-wireless-tracking-anti-lost-gps-cat-waterproof-wearable-collar-pet-tracker-wholesale" },
          { label: "Cat Water Fountain",  href: "/products/cat-water-fountain-wireless-induction-drink-fountain" },
        ],
      },
      {
        heading: "Cat Toys",
        headingHref: "/collections/cat-toys",
        links: [
          { label: "Silvervine Sticks",    href: "/products/3-pack-silvervine-sticks-for-cats-cat-chew-toy-for-dental-care-edible-cat-chew-sticks-for-teeth-cleaning-kitty-toys-for-indoor-cats" },
          { label: "Interactive Ball",     href: "/products/interactive-cat-toys-rolling-ball-dog-ball-smart-automatic-rotating-rolling-ball-with-string-interactive-self-moving-balls-toys-for-large-small-dogs" },
          { label: "Smart Toy Ball",       href: "/products/smart-dog-toy-ball-electronic-interactive-pet-toy-moving-ball-usb-automatic-moving-bouncing-for-puppy-birthday-gift-cat-product" },
        ],
      },
      {
        heading: "Dog Accessories",
        headingHref: "/collections/dog-accessories",
        links: [
          { label: "No Pull Dog Harness", href: "/products/no-pull-dog-harness-reflective-adjustable-soft-padded-pet-vest-harness" },
          { label: "GPS Tracker Collar",  href: "/products/tracker-gps-protective-case-pet-dog-anti-lost-collar" },
          { label: "G12 GPS Tracker",     href: "/products/g12-locator-smart-wireless-tracking-anti-lost-gps-cat-waterproof-wearable-collar-pet-tracker-wholesale" },
        ],
      },
      {
        heading: "Dog Toys",
        headingHref: "/collections/dog-toys",
        links: [
          { label: "Auto Ball Launcher",  href: "/products/dog-pet-automatic-interactive-ball-launcher" },
          { label: "Puppy Teething Toy",  href: "/products/pet-teething-stick-puppy-teething-toy-puppy-puzzle-toys-chew-toys-for-dogs-cat-teasing-toy-dog-teething-chew-toy-puppy-dental-care-puppy-toy-dog-molar-toy-nylon-missing-food-snack" },
          { label: "Dog Molar Toy",       href: "/products/dog-molar-toothbrush-toys-chew-cleaning-teeth-elasticity-soft-puppy-dental-care-extra-tough-pet-cleaning-toy-supplies-dog-toys" },
        ],
      },
    ],
  },
];
