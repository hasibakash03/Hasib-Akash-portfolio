import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowRight, Layers, User, BarChart2, FileText } from "lucide-react";

export const metadata = { title: "Projects — Hasib Akash", description: "Case studies from brands I've helped position, build, and grow." };

const acc = "hsl(275 70% 55%)";
const categories = ["All", "Brand Strategy", "Personal Branding", "Business Systems", "Content Strategy"];
const projects = [
  { slug: "motoVessel-brand-identity", title: "MotoVessel", category: "Brand Strategy", client: "MotoVessel Automotive", year: "2025", thumbnail: "hsl(270 55% 88%)", letter: "M", oneLiner: "Repositioned an automotive parts brand from generic retailer to trusted authority in Chittagong.", result: "40% increase in walk-in conversions after positioning overhaul.", tags: ["Brand Identity", "Positioning", "Automotive"] },
  { slug: "des-iiuc-funnel", title: "DES — IIUC", category: "Content Strategy", client: "IIUC Developer & Entrepreneurs Society", year: "2026", thumbnail: "hsl(275 50% 88%)", letter: "D", oneLiner: "Built a complete website funnel strategy and content system for a university entrepreneurship society.", result: "Full funnel strategy designed and delivered.", tags: ["Content Strategy", "Funnel Design", "Education"] },
  { slug: "tradefigur-brand", title: "TradeFigur", category: "Brand Strategy", client: "TradeFigur Agency", year: "2024", thumbnail: "hsl(280 45% 88%)", letter: "T", oneLiner: "Designed the complete brand identity and positioning for a strategy-first creative agency.", result: "Clear uncontested position in Chittagong consulting market.", tags: ["Brand Identity", "Agency", "Positioning"] },
  { slug: "doctor-personal-brand", title: "Medical Authority Brand", category: "Personal Branding", client: "Healthcare Professional", year: "2025", thumbnail: "hsl(265 55% 90%)", letter: "M", oneLiner: "Grew a doctor's social presence to a significant local following through positioning-first content.", result: "Location-based follower growth and increased patient inquiries.", tags: ["Personal Brand", "Healthcare", "Social Media"] },
];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5.5rem", minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,hsl(270 60% 10%) 0%,hsl(275 65% 20%) 100%)", padding: "5rem 1.5rem 4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,hsl(275 70% 55%/0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 75%)", marginBottom: "1rem" }}>Work</p>
            <h1 style={{ fontSize: "clamp(2.5rem,5vw,4.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 1rem", color: "white", lineHeight: 1.08 }}>Work That Speaks.</h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: 480 }}>Case studies from brands I&apos;ve helped position, build, and grow. Strategy-first, every time.</p>
          </div>
        </section>

        {/* Category filter */}
        <section style={{ background: "white", borderBottom: "1px solid hsl(270 20% 90%)", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "0.5rem", overflowX: "auto", padding: "1rem 0" }}>
            {categories.map((cat, i) => (
              <div key={cat} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 1rem", borderRadius: 9999, whiteSpace: "nowrap", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", background: i === 0 ? acc : "hsl(270 30% 96%)", color: i === 0 ? "white" : "hsl(270 15% 45%)", border: i === 0 ? "none" : "1px solid hsl(270 20% 88%)", flexShrink: 0 }}>{cat}</div>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section style={{ background: "hsl(270 30% 98%)", padding: "4rem 1.5rem 6rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.75rem" }}>
              {projects.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 100}><ProjectCard p={p} /></ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={200}>
              <div style={{ marginTop: "4rem", padding: "3rem", background: "linear-gradient(135deg,hsl(270 60% 18%) 0%,hsl(275 55% 28%) 100%)", borderRadius: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "white", margin: "0 0 0.4rem" }}>Want results like these for your brand?</h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>Book a free Strategy Diagnostic. No pitch, no pressure.</p>
                </div>
                <Link href="/consult" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: acc, color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                  Book Free Diagnostic <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
