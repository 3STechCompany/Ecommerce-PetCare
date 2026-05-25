"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./FeaturedBlog.css";

const blogPosts = [
  {
    title: "Creating a Bird-Friendly Garden: Welcoming Feathered Friends to Your Outdoor Space",
    image: "/images/blog/blog-6.jpg",
    date: "July 13, 2025",
    href: "/blogs/news/creating-a-bird-friendly-garden",
  },
  {
    title: "Comfort and Care: Creating a Cozy Home for Your Puppy",
    image: "/images/blog/blog-4.jpg",
    date: "July 12, 2025",
    href: "/blogs/news/comfort-and-care",
  },
  {
    title: "The Charming World of Hedgehogs: Welcoming These Prickly Guests to Your Garden",
    image: "/images/blog/blog-5.jpg",
    date: "July 11, 2025",
    href: "/blogs/news/charming-world-of-hedgehogs",
  },
];

export default function FeaturedBlog() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="featured-blog" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="featured-blog__header">
          <h2 className="featured-blog__title heading-bold">Latest News</h2>
          <a href="/blogs/news" className="featured-blog__view-all">
            View all
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </a>
        </div>

        <div className="featured-blog__grid">
          {blogPosts.map((post) => (
            <a key={post.title} href={post.href} className="blog-card">
              <div className="blog-card__media">
                <img src={post.image} alt={post.title} width={720} height={700} loading="lazy" />
              </div>
              <div className="blog-card__info color-scheme-2">
                <div className="blog-card__date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                  </svg>
                  <span>{post.date}</span>
                </div>
                <h3 className="blog-card__title heading-bold">{post.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
