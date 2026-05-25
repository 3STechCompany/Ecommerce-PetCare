"use client";
import Link from "next/link";
import { useState } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { navigationMenu } from "@/data/navigation";
import "./Header.css";

export default function Header() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleMobileItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((i) => i !== label)
        : [...prev, label]
    );
  };

  const headerClass = [
    "header-wrapper",
    !isAtTop ? "scrolled" : "",
    scrollDirection === "down" && !isAtTop ? "hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={headerClass}>
        <header className="header page-width">
          {/* Left: Nav + Mobile Toggle */}
          <nav className="header__nav">
            <button
              className="header__menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                <path d="M0 26.667h32M0 16h26.98M0 5.333h32" />
              </svg>
            </button>

            <ul className="nav-menu">
              {navigationMenu.map((item) => (
                <li key={item.label} className="nav-menu__item">
                  <a href={item.href} className="nav-menu__link">
                    <span>{item.label}</span>
                    {item.children && (
                      <svg className="icon-caret" viewBox="0 0 10 6">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </a>
                  {item.children && (
                    <ul className="nav-dropdown">
                      {item.children.map((child) => (
                        <li key={child.label} className="nav-dropdown__item">
                          {child.children ? (
                            <>
                              <span className="nav-dropdown__title">
                                {child.label}
                              </span>
                              {child.children.map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  className="nav-dropdown__link"
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </>
                          ) : (
                            <a
                              href={child.href}
                              className="nav-dropdown__link"
                            >
                              {child.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Center: Logo */}
          <Link href="/" className="header__logo">
            <img
              src="/images/logo/logo.webp"
              alt="Paws Demo"
              width={110}
              height={39}
            />
          </Link>

          {/* Right: Icons */}
          <div className="header__icons">
            <button className="header__icon" aria-label="Search">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <a href="/account" className="header__icon small-hide" aria-label="Account">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <circle cx="12" cy="7.25" r="5.73" />
                <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05" />
              </svg>
            </a>
            <a href="/cart" className="header__icon" aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path d="M3.41,7.23H20.59a0,0,0,0,1,0,0V19.64a2.86,2.86,0,0,1-2.86,2.86H6.27a2.86,2.86,0,0,1-2.86-2.86V7.23A0,0,0,0,1,3.41,7.23Z" />
                <path d="M7.23,10.09V6.27A4.77,4.77,0,0,1,12,1.5h0a4.77,4.77,0,0,1,4.77,4.77v3.82" />
              </svg>
            </a>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-menu__close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>

        <nav>
          <ul>
            {navigationMenu.map((item) => (
              <li key={item.label} className="mobile-nav__item">
                {item.children ? (
                  <>
                    <button
                      className={`mobile-nav__link ${
                        expandedItems.includes(item.label) ? "expanded" : ""
                      }`}
                      onClick={() => toggleMobileItem(item.label)}
                    >
                      {item.label}
                      <svg viewBox="0 0 10 6" fill="currentColor">
                        <path d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" />
                      </svg>
                    </button>
                    <div
                      className={`mobile-nav__sub ${
                        expandedItems.includes(item.label) ? "open" : ""
                      }`}
                    >
                      {item.children.map((child) =>
                        child.children ? (
                          <div key={child.label}>
                            <span
                              style={{
                                display: "block",
                                padding: "0.6rem 0",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08rem",
                                color: "rgb(var(--color-foreground))",
                                marginTop: "0.5rem",
                              }}
                            >
                              {child.label}
                            </span>
                            {child.children.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="mobile-nav__sub-link"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a
                            key={child.label}
                            href={child.href}
                            className="mobile-nav__sub-link"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </a>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="mobile-nav__link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="header-spacer" />
    </>
  );
}
