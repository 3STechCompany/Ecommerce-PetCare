"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function RichText2() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="section" ref={ref} style={{ padding: "1.2rem 0 0.3rem" }}>
      <div className="page-width">
        <div
          className={`animate-fade-up ${isVisible ? "is-visible" : ""}`}
          style={{ textAlign: "center", maxWidth: "78rem", margin: "0 auto" }}
        >
          <h2
            className="heading-bold"
            style={{ marginBottom: "1.5rem", fontSize: "calc(var(--font-heading-scale) * 3.2rem)" }}
          >
            Soft Comfort for Little{" "}
            <em
              style={{
                fontStyle: "italic",
                position: "relative",
                display: "inline-block",
              }}
            >
              Explorers
              <span
                style={{
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
            Discover thoughtfully crafted essentials that combine style and
            comfort. Every piece is designed to nurture your furry friends while
            fitting perfectly into your home.
          </p>
        </div>
      </div>
    </section>
  );
}
