export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigationMenu: NavItem[] = [
  {
    label: "Shop",
    href: "/collections/all",
    children: [
      {
        label: "Product Layouts",
        href: "#",
        children: [
          { label: "3 Column Layout", href: "/products/natural-dental-sticks" },
          { label: "2 Column Layout", href: "/products/calm-sleep" },
          { label: "Quick Order Layout", href: "/products/herbal-harmony" },
          { label: "Gift Card", href: "/products/gift-card" },
          { label: "Color Variants", href: "/products/waterproof-dog-raincoat" },
        ],
      },
      {
        label: "Featured",
        href: "#",
        children: [
          { label: "All products", href: "/collections/all" },
          { label: "Save Big", href: "/collections/save-big" },
          { label: "New Arrivals", href: "/collections/new-arrivals" },
          { label: "Best Sellers", href: "/collections/best-sellers" },
        ],
      },
      {
        label: "Collections",
        href: "#",
        children: [
          { label: "All collections", href: "/collections" },
          { label: "Cats", href: "/collections/cats" },
          { label: "Dogs", href: "/collections/dogs" },
          { label: "Birds", href: "/collections/bird-food" },
        ],
      },
      {
        label: "Top 4",
        href: "#",
        children: [
          { label: "Derma Care", href: "/products/derma-care" },
          { label: "Optimal Comfort", href: "/products/optimal-comfort" },
          { label: "Waterproof Dog Raincoat", href: "/products/waterproof-dog-raincoat" },
          { label: "Oasis Tunnel", href: "/products/oasis-tunnel" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/pages/about-us",
    children: [
      { label: "About Us", href: "/pages/about-us" },
      { label: "Team", href: "/pages/team" },
      { label: "Events", href: "/pages/events" },
      { label: "FAQ", href: "/pages/faq" },
      { label: "Journal", href: "/blogs/news" },
      { label: "Contact", href: "/pages/contact" },
    ],
  },
  {
    label: "Specials",
    href: "/collections/save-big",
  },
  {
    label: "Big Savings",
    href: "/collections/save-big",
  },
  {
    label: "Features",
    href: "/pages/features",
  },
];
