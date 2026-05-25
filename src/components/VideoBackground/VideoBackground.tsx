"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./VideoBackground.css";

export default function VideoBackground() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="video-bg-section" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="video-bg-wrapper">
          <video
            className="video-bg__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/video-poster.jpg"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
