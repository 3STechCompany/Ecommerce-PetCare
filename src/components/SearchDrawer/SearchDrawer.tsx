"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { formatShopifyPrice } from "@/lib/shopify";
import "./SearchDrawer.css";

interface SearchResult {
  id: string;
  title: string;
  handle: string;
  image: { url: string; altText: string | null } | null;
  price: string;
  available: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TAGS = ["Dog food", "Cat toys", "Accessories", "Best sellers"];

export default function SearchDrawer({ isOpen, onClose }: Props) {
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const inputRef    = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-focus + reset on open/close
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      setQuery("");
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Debounced Shopify search
  const runSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      type ProductNode = {
        id: string;
        title: string;
        handle: string;
        images: { edges: { node: { url: string; altText: string | null } }[] };
        variants: {
          edges: {
            node: {
              availableForSale: boolean;
              price: { amount: string; currencyCode: string };
            };
          }[];
        };
      };

      const data = await shopifyFetch<{
        products: { edges: { node: ProductNode }[] };
      }>({
        query: GET_PRODUCTS,
        variables: { first: 8, query: term },
      });

      setResults(
        data.products.edges.map(({ node }) => ({
          id: node.id,
          title: node.title,
          handle: node.handle,
          image: node.images.edges[0]?.node ?? null,
          price: formatShopifyPrice(
            node.variants.edges[0]?.node.price.amount ?? "0",
            node.variants.edges[0]?.node.price.currencyCode ?? "USD"
          ),
          available: node.variants.edges[0]?.node.availableForSale ?? false,
        }))
      );
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 350);
  }, [runSearch]);

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    runSearch(tag);
  }, [runSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  }, []);

  const handleResultClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`search-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`search-drawer ${isOpen ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* ── Input row ── */}
        <div className="search-drawer__bar page-width">
          <div className="search-drawer__field">
            <svg className="search-drawer__field-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>

            <input
              ref={inputRef}
              type="search"
              className="search-drawer__input"
              placeholder="Search products…"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />

            {query && (
              <button
                className="search-drawer__clear-btn"
                onClick={handleClear}
                aria-label="Clear search"
                tabIndex={0}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>
            )}
          </div>

          <button className="search-drawer__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>

        {/* ── Body ── */}
        <div className="search-drawer__body page-width">

          {/* Spinner */}
          {isLoading && (
            <div className="search-drawer__spinner-wrap">
              <span className="search-drawer__spinner" aria-label="Searching…" />
            </div>
          )}

          {/* No results */}
          {!isLoading && hasSearched && results.length === 0 && (
            <p className="search-drawer__empty">
              No results for &ldquo;<strong>{query}</strong>&rdquo;
            </p>
          )}

          {/* Results list */}
          {!isLoading && results.length > 0 && (
            <div className="search-drawer__results-wrap">
              <p className="search-drawer__results-count">
                {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
              <ul className="search-drawer__results">
                {results.map((product) => (
                  <li key={product.id} className="search-drawer__result">
                    <Link
                      href={`/products/${product.handle}`}
                      className="search-drawer__result-link"
                      onClick={handleResultClick}
                    >
                      <div className="search-drawer__result-img">
                        {product.image ? (
                          <img
                            src={product.image.url}
                            alt={product.image.altText ?? product.title}
                            width={72}
                            height={72}
                          />
                        ) : (
                          <div className="search-drawer__result-img-placeholder" aria-hidden="true" />
                        )}
                      </div>

                      <div className="search-drawer__result-info">
                        <span className="search-drawer__result-title">{product.title}</span>
                        <span className="search-drawer__result-price">{product.price}</span>
                        {!product.available && (
                          <span className="search-drawer__result-soldout">Sold out</span>
                        )}
                      </div>

                      <svg className="search-drawer__result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Popular tags (shown when input is empty) */}
          {!query && !isLoading && (
            <div className="search-drawer__suggestions">
              <p className="search-drawer__suggestions-label">Popular searches</p>
              <div className="search-drawer__tags">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    className="search-drawer__tag"
                    onClick={() => handleTagClick(tag)}
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
