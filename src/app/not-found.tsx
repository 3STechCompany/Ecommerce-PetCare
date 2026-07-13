import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "4rem 2rem",
    }}>
      <p style={{ fontSize: "8rem", margin: 0, lineHeight: 1 }}>🐾</p>
      <h1 style={{
        fontSize: "clamp(3rem, 6vw, 6rem)",
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        margin: "1.5rem 0 1rem",
        color: "rgb(var(--color-foreground))",
      }}>
        404 — Lost Paw
      </h1>
      <p style={{
        fontSize: "1.6rem",
        color: "rgba(var(--color-foreground), 0.6)",
        maxWidth: "46rem",
        lineHeight: 1.7,
        marginBottom: "3rem",
      }}>
        Oops! Looks like this page wandered off. Let&apos;s get you back on track.
      </p>
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          className="button button--primary"
        >
          Back to Home
        </Link>
        <Link
          href="/collections/all"
          className="button button--secondary"
          style={{
            padding: "1.2rem 2.8rem",
            borderRadius: "4rem",
            border: "1px solid rgba(var(--color-foreground), 0.2)",
            fontSize: "1.4rem",
            fontWeight: 600,
            textDecoration: "none",
            color: "rgb(var(--color-foreground))",
            transition: "all 0.2s",
          }}
        >
          Shop All Products
        </Link>
      </div>
    </div>
  );
}
