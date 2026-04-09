"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Urbanist, sans-serif", background: "hsl(270 30% 98%)" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "0 0 0.75rem" }}>Something went wrong.</h2>
        <p style={{ fontSize: "0.95rem", color: "hsl(270 15% 50%)", margin: "0 0 2rem" }}>An unexpected error occurred. Please try again.</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button onClick={reset} style={{ padding: "0.875rem 2rem", background: "hsl(275 70% 55%)", color: "white", border: "none", borderRadius: 9999, fontWeight: 700, cursor: "pointer", fontFamily: "Urbanist, sans-serif" }}>Try Again</button>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", padding: "0.875rem 2rem", background: "white", color: "hsl(270 20% 30%)", border: "1px solid hsl(270 20% 85%)", borderRadius: 9999, fontWeight: 600, textDecoration: "none" }}>Go Home</Link>
        </div>
      </div>
    </div>
  );
}
