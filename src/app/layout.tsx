import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageLoader from "@/components/PageLoader/PageLoader";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import FacebookPixel from "@/components/FacebookPixel/FacebookPixel";

const BASE_URL = "https://petcare3s.shop";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Petcare3s | Premium Pet Products",
    template: "%s | Petcare3s",
  },
  description:
    "Discover a curated selection of high-quality accessories and toys designed to keep your furry friends happy and healthy. Free shipping on orders over $50.",
  keywords: ["pet products", "cat accessories", "dog toys", "pet shop", "cat toys", "dog accessories"],
  authors: [{ name: "Petcare3s" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Petcare3s",
    title: "Petcare3s | Premium Pet Products",
    description:
      "Discover a curated selection of high-quality accessories and toys designed to keep your furry friends happy and healthy.",
    images: [
      {
        url: "/images/hero/hero-cats-desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Petcare3s - Premium Pet Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petcare3s | Premium Pet Products",
    description:
      "Discover a curated selection of high-quality accessories and toys designed to keep your furry friends happy and healthy.",
    images: ["/images/hero/hero-cats-desktop.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <FacebookPixel />
        {/*
          CartProvider bọc toàn bộ app → mọi component con đều có thể gọi useCart()
          để thêm sản phẩm vào giỏ, xem số lượng, và redirect sang Shopify Checkout
        */}
        <CartProvider>
          <PageLoader />
          <ScrollProgress />
          <Header />
          <main id="MainContent" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
