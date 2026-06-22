import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageLoader from "@/components/PageLoader/PageLoader";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer/CartDrawer";

export const metadata: Metadata = {
  title: "Paws Demo | Premium Pet Products",
  description:
    "Discover a curated selection of high-quality food, accessories, and toys designed to keep your furry friends happy and healthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
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
