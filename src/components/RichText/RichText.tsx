"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function RichText() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section
      className="section section--padded color-scheme-1"
      ref={ref}
    >
      <div className="page-width">
        <div
          className={`animate-fade-up ${isVisible ? "is-visible" : ""}`}
          style={{ textAlign: "center", maxWidth: "78rem", margin: "0 auto" }}
        >
          <h2
            className="heading-bold"
            style={{ marginBottom: "1.5rem", fontSize: "calc(var(--font-heading-scale) * 3.2rem)" }}
          >
            Tiny Paws, Big{" "}
            <em
              style={{
                fontStyle: "italic",
                position: "relative",
                display: "inline-block",
              }}
            >
              Adventures
              <span
                style={{
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%) scaleX(-1)",
                  bottom: "-10px",
                  width: "100%",
                  height: "0.6em",
                  background:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='167' height='10' viewBox='0 0 167 10'%3E%3Cpath d='M5 8C40 4 130 -1 162 6' stroke='%23c8273d' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E\") no-repeat center",
                  backgroundSize: "contain",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.5s ease 0.6s",
                  zIndex: -1,
                  display: "block",
                }}
              />
            </em>
          </h2>
          <p style={{ maxWidth: "60rem", margin: "0 auto", lineHeight: 1.8 }}>
            Soft, safe, and thoughtfully designed—every piece nurtures your furry
            friends while caring for the world around them. Discover timeless
            essentials crafted with love.
          </p>
        </div>
      </div>
    </section>
  );
}
