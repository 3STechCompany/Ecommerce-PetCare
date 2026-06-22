// ============================================================
// TRANG COLLECTION - /collections/[slug]
//
// Server Component: fetch metadata từ Shopify cho SEO + Hero
// ShopifyCollectionGrid (Client) tự fetch products + handle errors
// ============================================================

import { shopifyFetch } from "@/lib/shopify/client";
import CollectionHero from "@/components/CollectionHero/CollectionHero";
import SubcollectionSlider from "@/components/SubcollectionSlider/SubcollectionSlider";
import ShopifyCollectionGrid from "@/components/ShopifyCollectionGrid/ShopifyCollectionGrid";
import QuickInfoBar from "@/components/QuickInfoBar/QuickInfoBar";

// ── QUAN TRỌNG: Map slug cũ/sai → handle đúng trên Shopify ──
// Nếu bạn đổi tên collection trên Shopify Admin, thêm alias vào đây
const SLUG_ALIASES: Record<string, string> = {
  // Slug cũ (sai)         → Handle Shopify (đúng)
  "cats-accessorize":      "cat-accessories",
  "dog-accessorize":       "dog-accessories",
  "cats-food":             "cat-food",
  "cats-toys":             "cat-toys",
};

// ── Subcollection navigation sidebar ──
const SUBCOLLECTION_MAP: Record<
  string,
  { id: string; title: string; href: string; image: string }[]
> = {
  dogs: [
    { id: "dog-toys",        title: "Dog Toys",        href: "/collections/dog-toys",        image: "/images/collections/dog-toys.webp" },
    { id: "dog-food",        title: "Dog Food",        href: "/collections/dog-food",        image: "/images/collections/dog-food.webp" },
    { id: "dog-accessories", title: "Dog Accessories", href: "/collections/dog-accessories", image: "/images/collections/dog-accessories.webp" },
  ],
  "dog-toys": [
    { id: "dogs",            title: "All Dogs",        href: "/collections/dogs",            image: "/images/collections/dog-toys.webp" },
    { id: "dog-accessories", title: "Dog Accessories", href: "/collections/dog-accessories", image: "/images/collections/dog-accessories.webp" },
    { id: "dog-food",        title: "Dog Food",        href: "/collections/dog-food",        image: "/images/collections/dog-food.webp" },
  ],
  "dog-accessories": [
    { id: "dogs",     title: "All Dogs",  href: "/collections/dogs",     image: "/images/collections/dog-accessories.webp" },
    { id: "dog-toys", title: "Dog Toys",  href: "/collections/dog-toys", image: "/images/collections/dog-toys.webp" },
    { id: "dog-food", title: "Dog Food",  href: "/collections/dog-food", image: "/images/collections/dog-food.webp" },
  ],
  "dog-food": [
    { id: "dogs",            title: "All Dogs",        href: "/collections/dogs",            image: "/images/collections/dog-food.webp" },
    { id: "dog-toys",        title: "Dog Toys",        href: "/collections/dog-toys",        image: "/images/collections/dog-toys.webp" },
    { id: "dog-accessories", title: "Dog Accessories", href: "/collections/dog-accessories", image: "/images/collections/dog-accessories.webp" },
  ],
  cats: [
    { id: "cat-toys",        title: "Cat Toys",        href: "/collections/cat-toys",        image: "/images/collections/cat-food.webp" },
    { id: "cat-food",        title: "Cat Food",        href: "/collections/cat-food",        image: "/images/collections/cat-food.webp" },
    { id: "cat-accessories", title: "Cat Accessories", href: "/collections/cat-accessories", image: "/images/collections/cat-accessories.webp" },
  ],
  "cat-toys": [
    { id: "cats",            title: "All Cats",        href: "/collections/cats",            image: "/images/collections/cat-food.webp" },
    { id: "cat-accessories", title: "Cat Accessories", href: "/collections/cat-accessories", image: "/images/collections/cat-accessories.webp" },
    { id: "cat-food",        title: "Cat Food",        href: "/collections/cat-food",        image: "/images/collections/cat-food.webp" },
  ],
  "cat-accessories": [
    { id: "cats",     title: "All Cats", href: "/collections/cats",     image: "/images/collections/cat-accessories.webp" },
    { id: "cat-toys", title: "Cat Toys", href: "/collections/cat-toys", image: "/images/collections/cat-food.webp" },
    { id: "cat-food", title: "Cat Food", href: "/collections/cat-food", image: "/images/collections/cat-food.webp" },
  ],
  "cat-food": [
    { id: "cats",            title: "All Cats",        href: "/collections/cats",            image: "/images/collections/cat-food.webp" },
    { id: "cat-toys",        title: "Cat Toys",        href: "/collections/cat-toys",        image: "/images/collections/cat-food.webp" },
    { id: "cat-accessories", title: "Cat Accessories", href: "/collections/cat-accessories", image: "/images/collections/cat-accessories.webp" },
  ],
};

// ── Fallback hero images theo slug ──
const HERO_FALLBACK: Record<string, string> = {
  dogs:              "/images/hero/hero-dogs-collection.jpg",
  "dog-toys":        "/images/hero/hero-dogs-collection.jpg",
  "dog-accessories": "/images/hero/hero-dogs-collection.jpg",
  "dog-food":        "/images/hero/hero-dogs-collection.jpg",
  cats:              "/images/hero/hero-cats-desktop.jpg",
  "cat-toys":        "/images/hero/hero-cats-desktop.jpg",
  "cat-accessories": "/images/hero/hero-cats-desktop.jpg",
  "cat-food":        "/images/hero/hero-cats-desktop.jpg",
};

// ── Tag fallback: dùng khi collection chưa được tạo trên Shopify ──
// Key = handle đã resolve, Value = tag Shopify để query products(query: "tag:X")
const TAG_FALLBACK: Record<string, string> = {
  cats:              "cat",
  dogs:              "dog",
  "cat-accessories": "cat-accessories",
  "cat-toys":        "cat-toys",
  "cat-food":        "cat-food",
  "dog-accessories": "dog-accessories",
  "dog-toys":        "dog-toys",
  "dog-food":        "dog-food",
};

// ── Fallback title khi Shopify không trả về ──
const TITLE_FALLBACK: Record<string, string> = {
  "dog-accessories": "Dog Accessories",
  "dog-toys":        "Dog Toys",
  "dog-food":        "Dog Food",
  "cat-accessories": "Cat Accessories",
  "cat-toys":        "Cat Toys",
  "cat-food":        "Cat Food",
  dogs:              "Dogs",
  cats:              "Cats",
  all:               "All Products",
  "best-sellers":    "Best Sellers",
  "new-arrivals":    "New Arrivals",
  "save-big":        "Save Big",
};

// ── GraphQL query metadata nhẹ ──
const GET_COLLECTION_META = `
  query GetCollectionMeta($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      image { url altText }
    }
  }
`;

interface CollectionMeta {
  collection: {
    id: string;
    title: string;
    description: string;
    image: { url: string; altText: string | null } | null;
  } | null;
}

// ── generateMetadata (SEO) ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const handle = SLUG_ALIASES[slug] ?? slug;

  const data = await shopifyFetch<CollectionMeta>({
    query: GET_COLLECTION_META,
    variables: { handle },
    cache: "no-store",
  }).catch(() => null);

  const title = data?.collection?.title ?? TITLE_FALLBACK[handle] ?? handle;
  const description = data?.collection?.description?.slice(0, 160) ?? `Shop ${title} at Paws Demo.`;

  return {
    title: `${title} | Paws Demo`,
    description,
  };
}

// ── Page ──
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Resolve alias: "cats-accessorize" → "cat-accessories"
  const handle = SLUG_ALIASES[slug] ?? slug;

  // Fetch metadata từ Shopify (server-side)
  // Nếu lỗi (token sai, collection chưa tạo) → dùng fallback, KHÔNG crash
  const data = await shopifyFetch<CollectionMeta>({
    query: GET_COLLECTION_META,
    variables: { handle },
    cache: "no-store",
  }).catch(() => null);

  const collection = data?.collection;

  // Title: ưu tiên Shopify → fallback hardcoded → format slug
  const title =
    collection?.title ??
    TITLE_FALLBACK[handle] ??
    handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Hero image: ưu tiên Shopify CDN → fallback local image
  const heroImage =
    collection?.image?.url ??
    HERO_FALLBACK[handle] ??
    HERO_FALLBACK[slug] ??
    "/images/hero/hero-desktop.jpg";

  const subcollections = SUBCOLLECTION_MAP[handle] ?? SUBCOLLECTION_MAP[slug] ?? [];

  const breadcrumbs = [
    { label: "Home",  href: "/" },
    { label: title,   href: `/collections/${slug}` },
  ];

  return (
    <>
      {/* Hero: title từ Shopify Admin (hoặc fallback) */}
      <CollectionHero
        title={title}
        heroImage={heroImage}
        breadcrumbs={breadcrumbs}
      />

      {/* Subcollection navigation */}
      {subcollections.length > 0 && (
        <SubcollectionSlider subcollections={subcollections} />
      )}

      {/*
        ShopifyCollectionGrid tự fetch products theo `handle` (đã resolve alias).
        Nếu collection chưa có sản phẩm hoặc token chưa đúng,
        component tự hiển thị error/empty state — không crash toàn trang.
      */}
      <ShopifyCollectionGrid
        collectionHandle={handle}
        fallbackTag={TAG_FALLBACK[handle]}
        limit={handle === "all" ? 250 : 48}
        skeletonCount={12}
      />

      <QuickInfoBar />
    </>
  );
}
