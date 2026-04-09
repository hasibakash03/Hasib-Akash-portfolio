import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Urbanist, sans-serif", background: "hsl(270 30% 98%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "6rem", fontWeight: 900, color: "hsl(270 20% 88%)", lineHeight: 1, marginBottom: "1rem" }}>404</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>Page not found.</h1>
          <p style={{ fontSize: "1rem", color: "hsl(270 15% 50%)", margin: "0 0 2rem" }}>This page doesn&apos;t exist — or was moved.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, textDecoration: "none" }}>
              Back to Home
            </Link>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "white", color: "hsl(270 20% 30%)", border: "1px solid hsl(270 20% 85%)", borderRadius: 9999, fontWeight: 600, textDecoration: "none" }}>
              Read the Blog
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
