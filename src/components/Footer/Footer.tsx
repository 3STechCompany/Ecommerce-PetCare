import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer color-scheme-3">
      <div className="page-width">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <img
              src="https://flux-paws.myshopify.com/cdn/shop/files/logo_23323409-7fab-4acb-9d7c-c228ff88c674.webp?v=1752404367&width=300"
              alt="Paws Demo"
              className="footer__logo"
              width={110}
              height={39}
              style={{ filter: "brightness(10)" }}
            />
            <p className="footer__brand-text">
              Premium pet products crafted with love. Keeping your furry friends
              happy, healthy, and stylish since 2020.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="footer__column-title">Shop</h3>
            <Link href="/collections/all" className="footer__link">All Products</Link>
            <Link href="/collections/cats" className="footer__link">Cats</Link>
            <Link href="/collections/dogs" className="footer__link">Dogs</Link>
            <Link href="/collections/new-arrivals" className="footer__link">New Arrivals</Link>
            <Link href="/collections/best-sellers" className="footer__link">Best Sellers</Link>
            <Link href="/collections/save-big" className="footer__link">Save Big</Link>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="footer__column-title">Company</h3>
            <a href="/pages/about-us" className="footer__link">About Us</a>
            <a href="/pages/team" className="footer__link">Team</a>
            <a href="/pages/events" className="footer__link">Events</a>
            <a href="/blogs/news" className="footer__link">Journal</a>
            <a href="/pages/contact" className="footer__link">Contact</a>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="footer__column-title">Help</h3>
            <a href="/pages/faq" className="footer__link">FAQ</a>
            <a href="/policies/shipping-policy" className="footer__link">Shipping</a>
            <a href="/policies/refund-policy" className="footer__link">Returns</a>
            <a href="/policies/privacy-policy" className="footer__link">Privacy Policy</a>
            <a href="/policies/terms-of-service" className="footer__link">Terms of Service</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 Paws Demo. All rights reserved.
          </p>
          <div className="footer__payments">
            <span className="footer__payment-icon">Visa</span>
            <span className="footer__payment-icon">MC</span>
            <span className="footer__payment-icon">Amex</span>
            <span className="footer__payment-icon">PayPal</span>
            <span className="footer__payment-icon">GPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
