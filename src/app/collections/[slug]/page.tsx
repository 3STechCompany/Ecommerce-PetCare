"use client";
import { useState, useMemo } from "react";
import { collections } from "@/data/dogCollection";
import CollectionHero from "@/components/CollectionHero/CollectionHero";
import SubcollectionSlider from "@/components/SubcollectionSlider/SubcollectionSlider";
import CollectionFilterBar, { ActiveFilters } from "@/components/CollectionFilterBar/CollectionFilterBar";
import CollectionProductGrid from "@/components/CollectionProductGrid/CollectionProductGrid";
import { notFound } from "next/navigation";
import { use } from "react";

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const collection = collections[slug];

  if (!collection) {
    notFound();
  }

  return <CollectionPageContent collection={collection} />;
}

function CollectionPageContent({ collection }: { collection: (typeof collections)[string] }) {
  const [activeSort, setActiveSort] = useState("featured");
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    availability: [],
    sizes: [],
    colors: [],
    priceMin: null,
    priceMax: null,
  });

  const filteredProducts = useMemo(() => {
    let result = [...collection.products];

    // Price filter
    if (activeFilters.priceMin !== null || activeFilters.priceMax !== null) {
      result = result.filter((p) => {
        const price = parseFloat(p.price.replace(/[^0-9.,]/g, "").replace(",", "."));
        if (activeFilters.priceMin !== null && price < activeFilters.priceMin) return false;
        if (activeFilters.priceMax !== null && price > activeFilters.priceMax) return false;
        return true;
      });
    }

    // Sort
    switch (activeSort) {
      case "price-asc":
        result.sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[^0-9.,]/g, "").replace(",", "."));
          const pb = parseFloat(b.price.replace(/[^0-9.,]/g, "").replace(",", "."));
          return pa - pb;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[^0-9.,]/g, "").replace(",", "."));
          const pb = parseFloat(b.price.replace(/[^0-9.,]/g, "").replace(",", "."));
          return pb - pa;
        });
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [collection.products, activeSort, activeFilters]);

  return (
    <>
      <CollectionHero
        title={collection.title}
        heroImage={collection.heroImage}
        breadcrumbs={collection.breadcrumbs}
      />
      <SubcollectionSlider subcollections={collection.subcollections} />
      <CollectionFilterBar
        productCount={filteredProducts.length}
        filters={collection.filters}
        sortOptions={collection.sortOptions}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        onFilterChange={setActiveFilters}
      />
      <CollectionProductGrid products={filteredProducts} />
    </>
  );
}
