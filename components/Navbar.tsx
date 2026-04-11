"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      // Non-home pages: always dark text (white backdrop shown regardless of scroll)
      if (isHome === false) { setDark(false); return; }
      // Home page at very top: transparent navbar, white text (hero is always dark)
      if (isScrolled === false) { setDark(true); return; }
      // Home page scrolled: detect which section the navbar is overlapping
      const midY = window.scrollY + 80;
      const ids = ["section-hero", "section-process", "section-cta"];
      let inDark = false;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el === null) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (midY >= top && midY <= top + el.offsetHeight) { inDark = true; break; }
      }
      setDark(inDark);
    };
    handleScroll(); // run on mount so initial state is correct
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Show backdrop on any page when scrolled, or always on non-home pages
  const showBackdrop = scrolled || isHome === false;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
      ...(showBackdrop ? {
        background: dark ? "rgba(20,8,40,0.88)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}`,
      } : {}),
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "white" : "hsl(270 60% 40%)", transition: "color 0.3s" }}>
            Hasib Akash
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div className="hidden md:flex" style={{ gap: "1.75rem" }}>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", color: dark ? "rgba(255,255,255,0.85)" : "hsl(270 15% 40%)", transition: "color 0.2s" }}>{l.label}</Link>
              ))}
            </div>
            <Link href="/consult" className="hidden md:inline-flex" style={{ alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.35rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
              Book Consultation →
            </Link>
            <button onClick={() => setMenuOpen(menuOpen === false)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "white" : "hsl(270 20% 12%)", padding: "0.25rem" }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div style={{ background: dark ? "rgba(20,8,40,0.97)" : "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: dark ? "rgba(255,255,255,0.85)" : "hsl(270 15% 30%)", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>{l.label}</Link>
            ))}
            <Link href="/consult" onClick={() => setMenuOpen(false)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 1.5rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, textDecoration: "none" }}>
              Book Consultation →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
