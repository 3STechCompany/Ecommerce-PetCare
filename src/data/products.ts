export interface Product {
  id: string;
  title: string;
  href: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  collection: string;
}

export const products: Product[] = [
  // Cat Accessories
  {
    id: "oasis-tunnel",
    title: "Oasis Tunnel",
    href: "/products/oasis-tunnel",
    price: "€59,00 EUR",
    image: "/images/products/oasis-tunnel-a.webp",
    hoverImage: "/images/products/oasis-tunnel-b.webp",
    badge: "new",
    collection: "cat-accessories",
  },
  {
    id: "perfect-pair",
    title: "Perfect Pair",
    href: "/products/perfect-pair",
    price: "€25,00 EUR",
    image: "/images/products/perfect-pair-a.webp",
    hoverImage: "/images/products/perfect-pair-b.webp",
    collection: "cat-accessories",
  },
  {
    id: "optimal-comfort",
    title: "Optimal Comfort",
    href: "/products/optimal-comfort",
    price: "€79,00 EUR",
    image: "/images/products/optimal-comfort-a.webp",
    hoverImage: "/images/products/optimal-comfort-b.webp",
    collection: "cat-accessories",
  },
  {
    id: "oasis-haven",
    title: "Oasis Haven",
    href: "/products/oasis-haven",
    price: "€89,00 EUR",
    image: "/images/products/oasis-haven-a.webp",
    hoverImage: "/images/products/oasis-haven-c.webp",
    badge: "sale",
    collection: "cat-accessories",
  },
  // Dog Toys
  {
    id: "paw-friendly-rope",
    title: "Paw-Friendly Rope Ring",
    href: "/products/paw-friendly-rope-ring",
    price: "€15,00 EUR",
    image: "/images/products/paw-rope-a.webp",
    hoverImage: "/images/products/paw-rope-b.webp",
    collection: "dog-toys",
  },
  {
    id: "plush-toy",
    title: "Plush Toy",
    href: "/products/plush-toy",
    price: "€12,00 EUR",
    image: "/images/products/plush-toy-a.webp",
    hoverImage: "/images/products/plush-toy-b.webp",
    collection: "dog-toys",
  },
  {
    id: "robust-chew-bone",
    title: "Robust Chew Bone Toy",
    href: "/products/robust-chew-bone-toy",
    price: "€18,00 EUR",
    image: "/images/products/chew-bone-a.webp",
    hoverImage: "/images/products/chew-bone-b.webp",
    badge: "new",
    collection: "dog-toys",
  },
  {
    id: "playful-tug-rope",
    title: "Playful Tug Rope Toy",
    href: "/products/playful-tug-rope-toy",
    price: "€14,00 EUR",
    image: "/images/products/tug-rope-a.webp",
    hoverImage: "/images/products/tug-rope-b.webp",
    collection: "dog-toys",
  },
  // Cat Food
  {
    id: "mellow-dream",
    title: "Mellow Dream",
    href: "/products/mellow-dream",
    price: "€35,00 EUR",
    image: "/images/products/mellow-dream-a.webp",
    hoverImage: "/images/products/mellow-dream-b.webp",
    collection: "cat-food",
  },
  {
    id: "complete-care",
    title: "Complete Care",
    href: "/products/complete-care",
    price: "€42,00 EUR",
    image: "/images/products/complete-care-a.webp",
    hoverImage: "/images/products/complete-care-b.webp",
    collection: "cat-food",
  },
  {
    id: "energizing-health",
    title: "Energizing & Health-Enhancing",
    href: "/products/energizing-health-enhancing",
    price: "€38,00 EUR",
    image: "/images/products/energizing-a.webp",
    hoverImage: "/images/products/energizing-b.webp",
    badge: "sale",
    collection: "cat-food",
  },
  {
    id: "herbal-harmony",
    title: "Herbal Harmony",
    href: "/products/herbal-harmony",
    price: "€45,00 EUR",
    image: "/images/products/herbal-harmony-a.webp",
    hoverImage: "/images/products/mellow-dream-b.webp",
    collection: "cat-food",
  },
];

export const featuredProduct = {
  id: "oasis-haven-featured",
  title: "Oasis Haven",
  href: "/products/oasis-haven",
  price: "€89,00 EUR",
  description: "A premium cat haven designed for ultimate comfort. Made with eco-friendly materials, this cozy retreat features a soft, plush interior that your cat will love. The modern design fits seamlessly into any home decor.",
  images: [
    "/images/products/oasis-haven-large-a.webp",
    "/images/products/oasis-haven-large-c.webp",
    "/images/products/oasis-haven-large-b.webp",
  ],
  features: [
    "Eco-friendly materials",
    "Machine washable cover",
    "Non-slip bottom",
    "Available in 3 sizes",
  ],
};
