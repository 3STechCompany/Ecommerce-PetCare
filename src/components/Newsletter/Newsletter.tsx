"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Newsletter() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      className="section color-scheme-2"
      ref={ref}
      style={{ padding: "6rem 0" }}
    >
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div style={{ textAlign: "center", maxWidth: "60rem", margin: "0 auto" }}>
          <h2
            className="heading-bold"
            style={{ marginBottom: "1.5rem", fontSize: "calc(var(--font-heading-scale) * 3rem)" }}
          >
            Stay in the Loop
          </h2>
          <p style={{ marginBottom: "3rem", lineHeight: 1.7 }}>
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals for your beloved pets.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              gap: "1rem",
              maxWidth: "48rem",
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
              style={{
                flex: "1 1 28rem",
                minHeight: "5rem",
                padding: "0 2rem",
                border: "none",
                borderRadius: "var(--radius-input)",
                background: "rgb(var(--color-background))",
                fontSize: "1.5rem",
                fontFamily: "var(--font-body)",
                color: "rgb(var(--color-foreground))",
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="button button--primary"
              style={{ flex: "0 0 auto", minWidth: "14rem" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
