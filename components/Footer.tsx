import Link from "next/link";
export default function Footer() {
  return (
    <footer style={{ background: "white", borderTop: "1px solid hsl(270 20% 90%)", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(270 60% 40%)" }}>Hasib Akash</div>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "hsl(270 15% 50%)", maxWidth: 260 }}>Brand strategist from Chattogram. Strategy-first consulting for founders.</p>
          </div>
          <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[{href:"/projects",l:"Projects"},{href:"/blog",l:"Blog"},{href:"/consult",l:"Work With Me"}].map(({href,l}) => (
              <Link key={href} href={href} style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(270 15% 40%)", textDecoration: "none" }}>{l}</Link>
            ))}
          </nav>
        </div>
        <div style={{ borderTop: "1px solid hsl(270 20% 90%)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.8rem", color: "hsl(270 15% 55%)", margin: 0 }}>© {new Date().getFullYear()} Hasib Akash. All rights reserved.</p>
          <p style={{ fontSize: "0.8rem", color: "hsl(270 15% 55%)", margin: 0 }}>Founder · <a href="https://tradefigur.com" style={{ color: "hsl(275 70% 55%)", textDecoration: "none" }}>TradeFigur</a></p>
        </div>
      </div>
    </footer>
  );
}
