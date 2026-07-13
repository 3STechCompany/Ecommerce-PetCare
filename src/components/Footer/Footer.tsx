import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer color-scheme-3">
      <div className="page-width">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <img
              src="/images/logo/logo.webp"
              alt="Petcare3s"
              className="footer__logo"
              width={110}
              height={39}
            />
            <p className="footer__brand-text">
              Premium pet products crafted with love. Keeping your furry friends
              happy, healthy, and stylish.
            </p>
            <div className="footer__social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Twitter / X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="footer__column-title">Shop</h3>
            <Link href="/collections/all"          className="footer__link">All Products</Link>
            <Link href="/collections/cat-accessories" className="footer__link">Cat Accessories</Link>
            <Link href="/collections/cat-toys"     className="footer__link">Cat Toys</Link>
            <Link href="/collections/dog-accessories" className="footer__link">Dog Accessories</Link>
            <Link href="/collections/dog-toys"     className="footer__link">Dog Toys</Link>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="footer__column-title">Company</h3>
            <Link href="/pages/about-us" className="footer__link">About Us</Link>
            <Link href="/pages/contact"  className="footer__link">Contact</Link>
            <Link href="/pages/faq"      className="footer__link">FAQ</Link>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="footer__column-title">Help</h3>
            <Link href="/pages/faq"             className="footer__link">FAQ</Link>
            <Link href="/pages/shipping-policy" className="footer__link">Shipping</Link>
            <Link href="/pages/refund-policy"   className="footer__link">Returns</Link>
            <Link href="/pages/privacy-policy"  className="footer__link">Privacy Policy</Link>
            <Link href="/pages/terms"           className="footer__link">Terms of Service</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} Petcare3s. All rights reserved.
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
