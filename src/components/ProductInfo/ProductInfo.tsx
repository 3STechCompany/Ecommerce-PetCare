"use client";
import { useState, useMemo } from "react";
import type { ProductDetail } from "@/data/productDetails";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import VariantPicker from "@/components/VariantPicker/VariantPicker";
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";
import ProductAccordion from "@/components/ProductAccordion/ProductAccordion";
import ComplementaryProducts from "@/components/ComplementaryProducts/ComplementaryProducts";
import "./ProductInfo.css";

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);

  const currentVariant = useMemo(
    () => product.variants.find((v) => v.id === selectedVariant) ?? product.variants[0],
    [selectedVariant, product.variants]
  );

  const deliveryDates = useMemo(() => {
    const now = new Date();
    const earliest = new Date(now);
    earliest.setDate(earliest.getDate() + product.deliveryDays.earliest);
    const latest = new Date(now);
    latest.setDate(latest.getDate() + product.deliveryDays.latest);
    const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    return { earliest: fmt(earliest), latest: fmt(latest) };
  }, [product.deliveryDays]);

  return (
    <div className="product-info-section">
      {/* Breadcrumbs */}
      <nav className="product-breadcrumbs" aria-label="Breadcrumbs">
        <ol>
          {product.breadcrumbs.map((crumb, i) => (
            <li key={crumb.href}>
              {i < product.breadcrumbs.length - 1 ? (
                <a href={crumb.href}>{crumb.label}</a>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="product-layout page-width">
        {/* Gallery */}
        <div className="product-layout__gallery">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Info */}
        <div className="product-layout__info">
          <div className="product-two-col">
            {/* Left column */}
            <div className="product-col-left">
              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="product-tags color-scheme-2">
                  <p>{product.tags.join(". ")}</p>
                </div>
              )}

              {/* Title */}
              <h1 className="product-title heading-bold">{product.title}</h1>

              {/* Price */}
              <div className="product-price-block">
                <span className={`product-price ${currentVariant.compareAtPrice ? "on-sale" : ""}`}>
                  {currentVariant.price}
                </span>
                {currentVariant.compareAtPrice && (
                  <s className="product-compare-price">{currentVariant.compareAtPrice}</s>
                )}
                {product.badge && (
                  <span className="product-sale-badge">{product.badge}</span>
                )}
              </div>

              <p className="product-tax-note">{product.taxNote}</p>

              {/* Inventory */}
              <p className="product-inventory">
                <svg width="20" height="20" aria-hidden="true">
                  <rect x="2" y="2" width="16" height="16" rx="8" fill="#b0dbc7" />
                  <rect x="6" y="6" width="8" height="8" rx="4" fill="#3FA366" fillOpacity="0.8" />
                </svg>
                {product.inventory} in stock
              </p>

              {/* Description */}
              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Complementary */}
              <ComplementaryProducts products={product.complementaryProducts} />
            </div>

            {/* Right column */}
            <div className="product-col-right">
              {/* Accordion tabs */}
              <ProductAccordion tabs={product.accordionTabs} nutritionalInfo={product.nutritionalInfo} />

              {/* Delivery estimator */}
              <div className="product-delivery">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="currentColor" />
                </svg>
                Delivery between: <strong>{deliveryDates.earliest}</strong> — <strong>{deliveryDates.latest}</strong>
              </div>

              {/* Variant Picker */}
              <VariantPicker
                label="Size"
                variants={product.variants.map((v) => ({ id: v.id, label: v.label, available: v.available }))}
                selected={selectedVariant}
                onSelect={setSelectedVariant}
              />

              {/* Quantity */}
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                productTitle={product.title}
              />

              {/* Add to Cart */}
              <div className="product-buy-buttons">
                <button className="btn-add-to-cart">
                  Add to cart
                </button>
                <button className="btn-buy-now">
                  Buy it now
                </button>
              </div>

              {/* Payment icons */}
              <div className="product-payment-icons">
                {["Visa", "Mastercard", "Amex", "PayPal", "Diners", "Discover"].map((name) => (
                  <span key={name} className="payment-icon" title={name}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
