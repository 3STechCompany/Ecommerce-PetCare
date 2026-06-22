"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { navigationMenu, type NavItem } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import SearchDrawer from "@/components/SearchDrawer/SearchDrawer";
import "./Header.css";

const CaretIcon = () => (
  <svg aria-hidden="true" focusable="false" className="icon-caret" viewBox="0 0 10 6">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
      fill="currentColor" />
  </svg>
);

function DesktopNavItem({ item }: { item: NavItem }) {
  const hasDropdown = item.type !== "link";

  return (
    <li className={`nav-menu__item nav-menu__item--${item.type}`}>
      {/* Trigger */}
      {item.type === "link" ? (
        <Link href={item.href} className="nav-menu__link">
          <span>{item.label}</span>
        </Link>
      ) : (
        <div className="nav-menu__link nav-menu__trigger" tabIndex={0}>
          <span>{item.label}</span>
          {hasDropdown && <CaretIcon />}
        </div>
      )}

      {/* ── MEGA MENU (Shop) ── */}
      {item.type === "mega" && item.columns && (
        <div className="mega-menu">
          <div className="mega-menu__inner page-width">
            {item.columns.map((col) => (
              <div key={col.heading} className="mega-menu__column">
                <Link href={col.headingHref} className="mega-menu__col-heading heading-bold">
                  {col.heading}
                </Link>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="mega-menu__col-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Image card */}
            {item.megaImage && (
              <div className="mega-menu__image-card">
                <Link href={item.megaImage.href} className="mega-menu__image-card-link">
                  <img src={item.megaImage.image} alt="" loading="lazy" />
                </Link>
                <p className="mega-menu__image-badge">{item.megaImage.badge}</p>
                <Link href={item.megaImage.href} className="mega-menu__image-cta animate-arrow">
                  {item.megaImage.linkText}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CONDENSED DROPDOWN (About) ── */}
      {item.type === "condensed" && item.flatLinks && (
        <div className="mega-menu mega-menu--condensed">
          <div className="mega-menu__condensed-inner">
            <ul>
              {item.flatLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="mega-menu__col-heading heading-bold mega-menu__condensed-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── IMAGE GRID (Specials / Big Savings) ── */}
      {item.type === "image-grid" && item.imageItems && (
        <div className="mega-menu mega-menu--image-grid">
          <div className="mega-menu__image-grid-inner page-width">
            {item.imageItems.map((img) => (
              <div key={img.title} className="mega-menu__grid-item">
                <Link href={img.href} className="mega-menu__grid-image">
                  <img src={img.image} alt={img.title} loading="lazy" />
                </Link>
                {img.badge && (
                  <p className="mega-menu__image-badge">{img.badge}</p>
                )}
                <p className="mega-menu__grid-title heading-bold">{img.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const openSearch  = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const toggleMobileItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const headerClass = [
    "header-wrapper",
    !isAtTop ? "scrolled" : "",
    scrollDirection === "down" && !isAtTop ? "hidden" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <div className={headerClass}>
        <header className="header page-width">
          {/* Left: Nav + Mobile Toggle */}
          <nav className="header__nav" aria-label="Main navigation">
            <button
              className="header__menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                <path d="M0 26.667h32M0 16h26.98M0 5.333h32" />
              </svg>
            </button>

            <ul className="nav-menu" role="list">
              {navigationMenu.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </ul>
          </nav>

          {/* Center: Logo */}
          <Link href="/" className="header__logo">
            <img src="/images/logo/logo.webp" alt="Paws Demo" width={110} height={39} />
          </Link>

          {/* Right: Icons */}
          <div className="header__icons">
            <button className="header__icon" aria-label="Search" onClick={openSearch}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <Link href="/account" className="header__icon small-hide" aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <circle cx="12" cy="7.25" r="5.73" />
                <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05" />
              </svg>
            </Link>
            <button onClick={openCart} className="header__icon header__cart-icon" aria-label={`Cart (${cartCount} items)`} style={{ position: "relative", background: "none", border: "none", cursor: "pointer" }}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M3.41,7.23H20.59a0,0,0,0,1,0,0V19.64a2.86,2.86,0,0,1-2.86,2.86H6.27a2.86,2.86,0,0,1-2.86-2.86V7.23A0,0,0,0,1,3.41,7.23Z" />
                <path d="M7.23,10.09V6.27A4.77,4.77,0,0,1,12,1.5h0a4.77,4.77,0,0,1,4.77,4.77v3.82" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: "-6px", right: "-6px",
                  background: "rgb(var(--color-button, 18 18 18))",
                  color: "rgb(var(--color-button-text, 255 255 255))",
                  borderRadius: "50%", width: "18px", height: "18px",
                  fontSize: "10px", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }} aria-hidden="true">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ── Mobile Overlay ── */}
      <div className={`mobile-menu-overlay ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} />

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button className="mobile-menu__close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>

        <nav>
          <ul>
            {navigationMenu.map((item) => {
              const allLinks = [
                ...(item.columns?.flatMap((c) => c.links) ?? []),
                ...(item.flatLinks ?? []),
                ...(item.imageItems?.map((i) => ({ label: i.title, href: i.href })) ?? []),
              ];
              const hasChildren = allLinks.length > 0;

              return (
                <li key={item.label} className="mobile-nav__item">
                  {hasChildren ? (
                    <>
                      <button
                        className={`mobile-nav__link ${expandedItems.includes(item.label) ? "expanded" : ""}`}
                        onClick={() => toggleMobileItem(item.label)}
                      >
                        {item.label}
                        <svg viewBox="0 0 10 6" fill="currentColor">
                          <path d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" />
                        </svg>
                      </button>
                      <div className={`mobile-nav__sub ${expandedItems.includes(item.label) ? "open" : ""}`}>
                        {/* Column headings for mega */}
                        {item.columns?.map((col) => (
                          <div key={col.heading}>
                            <span className="mobile-nav__col-heading">{col.heading}</span>
                            {col.links.map((link) => (
                              <Link key={link.label} href={link.href} className="mobile-nav__sub-link" onClick={() => setMobileOpen(false)}>
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        {/* Condensed flat links */}
                        {item.flatLinks?.map((link) => (
                          <Link key={link.label} href={link.href} className="mobile-nav__sub-link" onClick={() => setMobileOpen(false)}>
                            {link.label}
                          </Link>
                        ))}
                        {/* Image grid links */}
                        {item.imageItems?.map((img) => (
                          <Link key={img.title} href={img.href} className="mobile-nav__sub-link" onClick={() => setMobileOpen(false)}>
                            {img.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="mobile-nav__link" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="header-spacer" />

      {/* ── Search Drawer ── */}
      <SearchDrawer isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}
