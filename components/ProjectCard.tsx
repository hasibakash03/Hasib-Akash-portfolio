"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const acc = "hsl(275 70% 55%)";

interface Project {
  slug: string; title: string; category: string; client: string;
  year: string; thumbnail: string; letter: string;
  oneLiner: string; result: string; tags: string[];
}

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", overflow: "hidden", transition: "all 0.3s ease", cursor: "pointer" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px)"; el.style.borderColor = acc; el.style.boxShadow = "0 24px 70px hsl(270 60% 40%/0.12)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.borderColor = "hsl(270 20% 88%)"; el.style.boxShadow = ""; }}
      >
        <div style={{ height: 220, background: p.thumbnail, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <span style={{ fontSize: "3.5rem", fontWeight: 900, color: "hsl(270 40% 45%)", opacity: 0.25 }}>{p.letter}</span>
          <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
            <span style={{ padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.85)", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 700, color: "hsl(275 70% 45%)", letterSpacing: "0.05em", textTransform: "uppercase", backdropFilter: "blur(6px)" }}>{p.category}</span>
          </div>
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <span style={{ padding: "0.3rem 0.75rem", background: "rgba(255,255,255,0.7)", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 600, color: "hsl(270 15% 45%)", backdropFilter: "blur(6px)" }}>{p.year}</span>
          </div>
        </div>
        <div style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "0 0 0.5rem", lineHeight: 1.25 }}>{p.title}</h3>
          <p style={{ fontSize: "0.85rem", color: "hsl(270 15% 55%)", margin: "0 0 0.875rem", fontWeight: 500 }}>{p.client}</p>
          <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 40%)", lineHeight: 1.65, margin: "0 0 1.25rem" }}>{p.oneLiner}</p>
          <div style={{ padding: "0.6rem 0.875rem", background: "hsl(270 60% 96%)", borderRadius: "0.625rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "hsl(275 70% 45%)", letterSpacing: "0.03em" }}>↑ {p.result}</span>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {p.tags.map(t => <span key={t} style={{ padding: "0.2rem 0.6rem", background: "hsl(270 20% 94%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 600, color: "hsl(270 15% 50%)" }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "1.25rem", fontSize: "0.85rem", fontWeight: 700, color: acc }}>
            View Case Study <ArrowRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  );
}
