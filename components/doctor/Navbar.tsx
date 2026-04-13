"use client";
import { useState, useEffect } from "react";

export default function DoctorNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAudit = () => {
    document.getElementById("audit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1rem 1.5rem",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.55rem 0.6rem 0.55rem 1.5rem",
          borderRadius: 9999,
          background: scrolled
            ? "rgba(14, 5, 28, 0.88)"
            : "rgba(14, 5, 28, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset"
            : "0 2px 12px rgba(0,0,0,0.2)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          pointerEvents: "auto",
        }}
      >
        {/* Left: brand name */}
        <span
          style={{
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "white",
            userSelect: "none",
          }}
        >
          Hasib Akash
        </span>

        {/* Right: single CTA */}
        <button
          onClick={handleAudit}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "hsl(275 70% 48%)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "hsl(275 70% 55%)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.6rem 1.3rem",
            background: "hsl(275 70% 55%)",
            color: "white",
            border: "none",
            borderRadius: 9999,
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.15s ease",
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          Book Free Audit →
        </button>
      </nav>
    </header>
  );
}
