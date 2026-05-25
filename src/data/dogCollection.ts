import { Product } from "./products";

export interface CollectionData {
  slug: string;
  title: string;
  heroImage: string;
  breadcrumbs: { label: string; href: string }[];
  subcollections: {
    id: string;
    title: string;
    href: string;
    image: string;
  }[];
  products: Product[];
  filters: {
    availability: { label: string; value: string; count: number }[];
    sizes: string[];
    colors: { label: string; value: string; swatch?: string }[];
    priceRange: { min: number; max: number };
  };
  sortOptions: { label: string; value: string }[];
}

export const dogCollection: CollectionData = {
  slug: "dogs",
  title: "Dogs",
  heroImage: "/images/hero/hero-dogs-collection.jpg",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Dogs", href: "/collections/dogs" },
  ],
  subcollections: [
    {
      id: "dog-toys",
      title: "Dog Toys",
      href: "/collections/dog-toys",
      image: "/images/collections/dog-toys.webp",
    },
    {
      id: "dog-food",
      title: "Dog Food",
      href: "/collections/dog-food",
      image: "/images/collections/dog-food.webp",
    },
    {
      id: "dog-accessories",
      title: "Dog Accessorize",
      href: "/collections/dog-accessorize",
      image: "/images/collections/dog-accessories.webp",
    },
  ],
  products: [
    {
      id: "natural-power-pack",
      title: "Natural Power Pack",
      href: "/products/natural-power-pack",
      price: "€12,99 EUR",
      image: "/images/products/power-pack-a.webp",
      hoverImage: "/images/products/power-pack-b.webp",
      collection: "dogs",
    },
    {
      id: "energy-boost",
      title: "Energy Boost",
      href: "/products/energy-boost",
      price: "€9,99 EUR",
      compareAtPrice: "€13,99 EUR",
      image: "/images/products/energy-boost-a.webp",
      hoverImage: "/images/products/energy-boost-c.webp",
      badge: "new",
      collection: "dogs",
    },
    {
      id: "paw-rope-ring",
      title: "Paw-Friendly Rope Ring",
      href: "/products/paw-friendly-rope-ring",
      price: "€9,99 EUR",
      image: "/images/products/paw-rope-a.webp",
      hoverImage: "/images/products/paw-rope-b.webp",
      collection: "dogs",
    },
    {
      id: "plush-toy-dog",
      title: "Plush Toy",
      href: "/products/noble-fox-plush-toy",
      price: "€49,00 EUR",
      image: "/images/products/plush-toy-a.webp",
      hoverImage: "/images/products/plush-toy-b.webp",
      collection: "dogs",
    },
    {
      id: "chew-bone",
      title: "Robust Chew Bone Toy",
      href: "/products/robust-chew-bone-toy",
      price: "€9,99 EUR",
      image: "/images/products/chew-bone-a.webp",
      hoverImage: "/images/products/chew-bone-b.webp",
      collection: "dogs",
    },
    {
      id: "tug-rope",
      title: "Playful Tug Rope Toy",
      href: "/products/playful-tug-rope-toy",
      price: "€39,00 EUR",
      image: "/images/products/tug-rope-a.webp",
      hoverImage: "/images/products/tug-rope-b.webp",
      collection: "dogs",
    },
    {
      id: "zen-bed-dog",
      title: "Zen Dog Bed",
      href: "/products/zen-dog-bed",
      price: "€99,00 EUR",
      image: "/images/products/zen-bed-a.webp",
      hoverImage: "/images/products/zen-bed-b.webp",
      collection: "dogs",
    },
    {
      id: "raincoat-dog",
      title: "Waterproof Dog Raincoat",
      href: "/products/waterproof-dog-raincoat",
      price: "€49,00 EUR",
      image: "/images/products/raincoat-a.webp",
      hoverImage: "/images/products/raincoat-b.webp",
      collection: "dogs",
    },
    {
      id: "plush-bed-dog",
      title: "Plush Dog Bed",
      href: "/products/cozy-plush-dog-bed",
      price: "€69,00 EUR",
      image: "/images/products/plush-bed-a.webp",
      hoverImage: "/images/products/plush-bed-b.webp",
      collection: "dogs",
    },
    {
      id: "harness-dog",
      title: "OneFit Dog Harness & Leash",
      href: "/products/harness-leash-set",
      price: "€59,00 EUR",
      compareAtPrice: "€69,00 EUR",
      image: "/images/products/harness-a.webp",
      hoverImage: "/images/products/harness-b.webp",
      badge: "sale",
      collection: "dogs",
    },
    {
      id: "calm-sleep",
      title: "Calm & Sleep",
      href: "/products/calm-sleep",
      price: "€39,00 EUR",
      image: "/images/products/calm-sleep-a.webp",
      collection: "dogs",
    },
    {
      id: "derma-care",
      title: "Derma Care",
      href: "/products/derma-care",
      price: "€29,00 EUR",
      image: "/images/products/derma-care-a.webp",
      collection: "dogs",
    },
  ],
  filters: {
    availability: [
      { label: "In stock", value: "1", count: 14 },
      { label: "Out of stock", value: "0", count: 2 },
    ],
    sizes: ["100g", "200g", "300g"],
    colors: [
      { label: "Beige", value: "beige", swatch: "#f5f5dc" },
      { label: "Blue", value: "blue", swatch: "#4a90d9" },
      { label: "Brown", value: "brown", swatch: "#8b4513" },
      { label: "Green", value: "green", swatch: "#4caf50" },
      { label: "Grey", value: "grey", swatch: "#9e9e9e" },
      { label: "Orange", value: "orange", swatch: "#ff9800" },
      { label: "Pink", value: "pink", swatch: "#e91e63" },
      { label: "Red", value: "red", swatch: "#f44336" },
      { label: "White", value: "white", swatch: "#ffffff" },
    ],
    priceRange: { min: 0, max: 99 },
  },
  sortOptions: [
    { label: "Featured", value: "featured" },
    { label: "Best selling", value: "best-selling" },
    { label: "Alphabetically, A-Z", value: "title-asc" },
    { label: "Alphabetically, Z-A", value: "title-desc" },
    { label: "Price, low to high", value: "price-asc" },
    { label: "Price, high to low", value: "price-desc" },
    { label: "Date, old to new", value: "date-asc" },
    { label: "Date, new to old", value: "date-desc" },
  ],
};

// Map of collection slugs to data
export const collections: Record<string, CollectionData> = {
  dogs: dogCollection,
};
