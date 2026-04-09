import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(270 30% 98%)" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "6rem", fontWeight: 900, color: "hsl(270 20% 88%)", lineHeight: 1, marginBottom: "1rem" }}>404</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "0 0 0.75rem" }}>Page not found.</h1>
          <p style={{ fontSize: "1rem", color: "hsl(270 15% 50%)", margin: "0 0 2rem" }}>This page doesn't exist — or was moved.</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
