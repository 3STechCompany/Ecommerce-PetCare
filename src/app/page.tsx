import HeroBanner from "@/components/HeroBanner/HeroBanner";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import RichText from "@/components/RichText/RichText";
import WaveSeparator from "@/components/WaveSeparator/WaveSeparator";
import CollectionTabs from "@/components/CollectionTabs/CollectionTabs";
import ScrollingTextHome from "@/components/ScrollingTextHome/ScrollingTextHome";
import ImageGalleryScroll from "@/components/ImageGalleryScroll/ImageGalleryScroll";
import FeaturedCollection from "@/components/FeaturedCollection/FeaturedCollection";
import RichText2 from "@/components/RichText2/RichText2";
import InfoCards from "@/components/InfoCards/InfoCards";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import SlickSlider from "@/components/SlickSlider/SlickSlider";
import QuickInfoBar from "@/components/QuickInfoBar/QuickInfoBar";
import Testimonials from "@/components/Testimonials/Testimonials";
import ImageBannerCollection from "@/components/ImageBannerCollection/ImageBannerCollection";
import PromotionCards from "@/components/PromotionCards/PromotionCards";
import BrandsMarquee from "@/components/BrandsMarquee/BrandsMarquee";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import FeaturedBlog from "@/components/FeaturedBlog/FeaturedBlog";
import Newsletter from "@/components/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Category Slider */}
      <CategorySlider />

      {/* 3. Rich Text - "Tiny Paws, Big Adventures" */}
      <RichText />

      {/* 4. Wave Separator */}
      <WaveSeparator />

      {/* 5. Collection Tabs (Cat Accessories / Dog Toys / Cat Food) */}
      <CollectionTabs />

      {/* 6. Scrolling Text - "Crafting Timeless Furniture for Pets" */}
      <ScrollingTextHome
        texts={[
          "Crafting Timeless Furniture for Pets",
          "Sustainable, Stylish, and Safe",
          "Designs That Inspire Imagination",
        ]}
        separator="hexagon"
      />

      {/* 7. Image Gallery Scroll */}
      <ImageGalleryScroll />

      {/* 8. Featured Collection - "Best Sellers" */}
      <FeaturedCollection />

      {/* 9. Rich Text 2 - "Soft Comfort for Little Explorers" */}
      <RichText2 />

      {/* 10. Info Cards (4 expandable cards) */}
      <InfoCards />

      {/* 11. Wave Separator */}
      <WaveSeparator />

      {/* 12. Featured Product - Oasis Haven */}
      <FeaturedProduct />

      {/* 13. Slick Slider - "Cozy Nest / Fun Toys / Chic Gear" */}
      <SlickSlider />

      {/* 14. Quick Info Bar (Free Shipping, etc.) */}
      <QuickInfoBar />

      {/* 15. Testimonials */}
      <Testimonials />

      {/* 16. Image Banner + Collection - "Kitty Comforts" */}
      <ImageBannerCollection />

      {/* 17. Promotion Cards - "Top Offers of the Week" */}
      <PromotionCards />

      {/* 18. Brands - "Our Top Brands" + Logo Marquee */}
      <BrandsMarquee />

      {/* 19. Video Background */}
      <VideoBackground />

      {/* 20. Featured Blog - "Latest News" */}
      <FeaturedBlog />

      {/* 21. Scrolling Text 3 - final marquee */}
      <ScrollingTextHome
        texts={[
          "All your furry friend's needs — treats to toys.",
          "Care and joy for every paw.",
          "Quality essentials for happy, healthy pets.",
        ]}
        separator="diamond"
      />

      {/* 22. Wave Separator */}
      <WaveSeparator />

      {/* 23. Newsletter */}
      <Newsletter />
    </>
  );
}
