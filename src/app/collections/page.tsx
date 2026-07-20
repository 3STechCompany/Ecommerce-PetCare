import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_ALL_COLLECTIONS } from "@/lib/shopify/queries";
import QuickInfoBar from "@/components/QuickInfoBar/QuickInfoBar";

export const metadata = {
  title: "All Collections | Paws Demo",
  description: "Browse all product collections — cat accessories, dog toys, food and more.",
};

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  products: { edges: { node: { id: string } }[] };
}

interface CollectionsData {
  collections: {
    edges: { node: CollectionNode }[];
  };
}

// Fallback images khi collection chưa có ảnh trên Shopify
const IMAGE_FALLBACK: Record<string, string> = {
  dogs:              "/images/hero/hero-dogs-collection.jpg",
  "dog-toys":        "/images/collections/dog-toys.webp",
  "dog-food":        "/images/collections/dog-food.webp",
  "dog-accessories": "/images/collections/dog-accessories.webp",
  cats:              "/images/hero/hero-cats-desktop.jpg",
  "cat-toys":        "/images/collections/cat-toys.webp",
  "cat-food":        "/images/collections/cat-food.webp",
  "cat-accessories": "/images/collections/cat-accessories.webp",
};

export default async function CollectionsPage() {
  const data = await shopifyFetch<CollectionsData>({
    query: GET_ALL_COLLECTIONS,
    variables: { first: 24 },
    cache: "no-store",
  }).catch(() => null);

  // Ẩn collection chưa có sản phẩm (vd: Cat Toys hiện đang rỗng) thay vì hiện ô trống/ảnh vỡ
  const collections = (data?.collections?.edges?.map((e) => e.node) ?? []).filter(
    (col) => col.products.edges.length > 0
  );

  return (
    <>
      {/* Hero */}
      <div className="collections-page__hero">
        <div className="page-width">
          <nav className="collections-page__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Collections</span>
          </nav>
          <h1 className="collections-page__title heading-bold">All Collections</h1>
          <p className="collections-page__subtitle">
            Everything your pet needs — from cozy beds to tasty treats.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="collections-page__section">
        <div className="page-width">
          {collections.length === 0 ? (
            <p className="collections-page__empty">
              No collections found. Add collections in Shopify Admin → Products → Collections.
            </p>
          ) : (
            <ul className="collections-page__grid">
              {collections.map((col) => {
                const img = col.image?.url ?? IMAGE_FALLBACK[col.handle] ?? "/images/hero/hero-desktop.jpg";
                const count = col.products.edges.length;

                return (
                  <li key={col.id} className="collections-page__item">
                    <Link href={`/collections/${col.handle}`} className="collections-page__card">
                      <div className="collections-page__card-media">
                        <img
                          src={img}
                          alt={col.image?.altText ?? col.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="collections-page__card-info">
                        <h2 className="collections-page__card-title heading-bold">
                          {col.title}
                        </h2>
                        {col.description && (
                          <p className="collections-page__card-desc">
                            {col.description.slice(0, 80)}{col.description.length > 80 ? "…" : ""}
                          </p>
                        )}
                        <span className="collections-page__card-cta">
                          Shop Now →
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <QuickInfoBar />

      <style>{`
        .collections-page__hero {
          background: rgb(var(--color-background));
          padding: 4rem 0 3rem;
          border-bottom: 1px solid rgba(var(--color-foreground), 0.07);
        }

        .collections-page__breadcrumb {
          font-size: 1.3rem;
          color: rgba(var(--color-foreground), 0.5);
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .collections-page__breadcrumb a {
          color: rgba(var(--color-foreground), 0.5);
          text-decoration: none;
        }

        .collections-page__breadcrumb a:hover {
          color: rgb(var(--color-foreground));
        }

        .collections-page__title {
          font-size: calc(var(--font-heading-scale) * 4rem);
          margin-bottom: 1rem;
        }

        .collections-page__subtitle {
          font-size: 1.6rem;
          color: rgba(var(--color-foreground), 0.6);
          max-width: 50rem;
        }

        .collections-page__section {
          padding: 5rem 0 8rem;
        }

        .collections-page__empty {
          text-align: center;
          padding: 6rem 2rem;
          color: rgba(var(--color-foreground), 0.5);
          font-size: 1.5rem;
        }

        .collections-page__grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.4rem;
        }

        @media (max-width: 989px) {
          .collections-page__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .collections-page__grid {
            grid-template-columns: 1fr;
          }
        }

        .collections-page__card {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: var(--radius-media, 1.2rem);
          overflow: hidden;
          background: rgb(var(--color-background));
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          border: 1px solid rgba(var(--color-foreground), 0.08);
        }

        .collections-page__card:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }

        .collections-page__card-media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f5f5f5;
        }

        .collections-page__card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .collections-page__card:hover .collections-page__card-media img {
          transform: scale(1.05);
        }

        .collections-page__card-info {
          padding: 1.8rem 2rem 2rem;
        }

        .collections-page__card-title {
          font-size: calc(var(--font-heading-scale) * 1.8rem);
          margin-bottom: 0.5rem;
        }

        .collections-page__card-desc {
          font-size: 1.3rem;
          color: rgba(var(--color-foreground), 0.6);
          line-height: 1.5;
          margin-bottom: 1.2rem;
        }

        .collections-page__card-cta {
          font-size: 1.3rem;
          font-weight: 700;
          color: rgb(var(--color-foreground));
          letter-spacing: 0.02em;
        }
      `}</style>
    </>
  );
}
