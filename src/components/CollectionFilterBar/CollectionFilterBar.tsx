"use client";
import { useState, useRef, useEffect } from "react";
import "./CollectionFilterBar.css";

interface FilterBarProps {
  productCount: number;
  filters: {
    availability: { label: string; value: string; count: number }[];
    sizes: string[];
    colors: { label: string; value: string; swatch?: string }[];
    priceRange: { min: number; max: number };
  };
  sortOptions: { label: string; value: string }[];
  onSortChange: (value: string) => void;
  onFilterChange: (filters: ActiveFilters) => void;
  activeSort: string;
}

export interface ActiveFilters {
  availability: string[];
  sizes: string[];
  colors: string[];
  priceMin: number | null;
  priceMax: number | null;
}

export default function CollectionFilterBar({
  productCount,
  filters,
  sortOptions,
  onSortChange,
  onFilterChange,
  activeSort,
}: FilterBarProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    availability: [],
    sizes: [],
    colors: [],
    priceMin: null,
    priceMax: null,
  });
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (name: string) => {
    setOpenFilter(openFilter === name ? null : name);
  };

  const toggleArrayFilter = (
    key: "availability" | "sizes" | "colors",
    value: string
  ) => {
    const updated = { ...activeFilters };
    if (updated[key].includes(value)) {
      updated[key] = updated[key].filter((v) => v !== value);
    } else {
      updated[key] = [...updated[key], value];
    }
    setActiveFilters(updated);
    onFilterChange(updated);
  };

  const activeCount =
    activeFilters.availability.length +
    activeFilters.sizes.length +
    activeFilters.colors.length +
    (activeFilters.priceMin !== null ? 1 : 0) +
    (activeFilters.priceMax !== null ? 1 : 0);

  const clearAll = () => {
    const cleared: ActiveFilters = {
      availability: [],
      sizes: [],
      colors: [],
      priceMin: null,
      priceMax: null,
    };
    setActiveFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="collection-filter-bar" ref={filterRef}>
      <div className="page-width">
        <div className="filter-bar__inner">
          {/* Filters */}
          <div className="filter-bar__filters">
            <span className="filter-bar__label">Filter:</span>

            {/* Availability */}
            <div className="filter-dropdown">
              <button
                className={`filter-dropdown__trigger ${openFilter === "availability" ? "open" : ""}`}
                onClick={() => toggleFilter("availability")}
              >
                Availability
                <svg viewBox="0 0 10 6" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" /></svg>
              </button>
              {openFilter === "availability" && (
                <div className="filter-dropdown__panel">
                  {filters.availability.map((opt) => (
                    <label key={opt.value} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={activeFilters.availability.includes(opt.value)}
                        onChange={() => toggleArrayFilter("availability", opt.value)}
                      />
                      <span className="filter-checkbox__circle" />
                      <span>{opt.label} ({opt.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="filter-dropdown">
              <button
                className={`filter-dropdown__trigger ${openFilter === "price" ? "open" : ""}`}
                onClick={() => toggleFilter("price")}
              >
                Price
                <svg viewBox="0 0 10 6" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" /></svg>
              </button>
              {openFilter === "price" && (
                <div className="filter-dropdown__panel">
                  <div className="filter-price">
                    <span className="filter-price__currency">€</span>
                    <input
                      type="number"
                      placeholder="0"
                      min={filters.priceRange.min}
                      max={filters.priceRange.max}
                      value={activeFilters.priceMin ?? ""}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : null;
                        const updated = { ...activeFilters, priceMin: val };
                        setActiveFilters(updated);
                        onFilterChange(updated);
                      }}
                    />
                    <span className="filter-price__currency">€</span>
                    <input
                      type="number"
                      placeholder={String(filters.priceRange.max)}
                      min={filters.priceRange.min}
                      max={filters.priceRange.max}
                      value={activeFilters.priceMax ?? ""}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : null;
                        const updated = { ...activeFilters, priceMax: val };
                        setActiveFilters(updated);
                        onFilterChange(updated);
                      }}
                    />
                  </div>
                  <p className="filter-price__hint">The highest price is €{filters.priceRange.max},00</p>
                </div>
              )}
            </div>

            {/* Size */}
            <div className="filter-dropdown">
              <button
                className={`filter-dropdown__trigger ${openFilter === "size" ? "open" : ""}`}
                onClick={() => toggleFilter("size")}
              >
                Size
                <svg viewBox="0 0 10 6" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" /></svg>
              </button>
              {openFilter === "size" && (
                <div className="filter-dropdown__panel">
                  {filters.sizes.map((size) => (
                    <label key={size} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={activeFilters.sizes.includes(size)}
                        onChange={() => toggleArrayFilter("sizes", size)}
                      />
                      <span className="filter-checkbox__circle" />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Color */}
            <div className="filter-dropdown">
              <button
                className={`filter-dropdown__trigger ${openFilter === "color" ? "open" : ""}`}
                onClick={() => toggleFilter("color")}
              >
                Color
                <svg viewBox="0 0 10 6" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" /></svg>
              </button>
              {openFilter === "color" && (
                <div className="filter-dropdown__panel">
                  {filters.colors.map((color) => (
                    <label key={color.value} className="filter-checkbox filter-checkbox--color">
                      <input
                        type="checkbox"
                        checked={activeFilters.colors.includes(color.value)}
                        onChange={() => toggleArrayFilter("colors", color.value)}
                      />
                      <span
                        className="filter-color-swatch"
                        style={{ backgroundColor: color.swatch }}
                      />
                      <span>{color.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {activeCount > 0 && (
              <button className="filter-bar__clear" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>

          {/* Right side: Sort + Count */}
          <div className="filter-bar__right">
            <div className="filter-bar__sort">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={activeSort}
                onChange={(e) => onSortChange(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <span className="filter-bar__count">
              {productCount} product{productCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
