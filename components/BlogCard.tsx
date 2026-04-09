"use client";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const acc = "hsl(275 70% 55%)";

interface Post {
  slug: string; title: string; category: string;
  date: string; readTime: string; thumbnail: string;
  excerpt: string; tags: string[];
}

export function FeaturedBlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "3rem" }}>
      <article style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", transition: "all 0.3s ease" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = acc; el.style.boxShadow = "0 24px 70px hsl(270 60% 40%/0.10)"; el.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "hsl(270 20% 88%)"; el.style.boxShadow = ""; el.style.transform = ""; }}
      >
        <div style={{ background: post.thumbnail, minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", padding: "0.3rem 0.85rem", background: "rgba(255,255,255,0.88)", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 700, color: "hsl(275 70% 45%)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Featured</div>
          <span style={{ fontSize: "4rem", fontWeight: 900, color: "hsl(270 40% 45%)", opacity: 0.2 }}>✦</span>
        </div>
        <div style={{ padding: "2.5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ padding: "0.25rem 0.7rem", background: "hsl(270 60% 95%)", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 700, color: acc, textTransform: "uppercase", letterSpacing: "0.05em" }}>{post.category}</span>
            <span style={{ fontSize: "0.8rem", color: "hsl(270 15% 55%)" }}>{post.date}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", color: "hsl(270 15% 55%)" }}><Clock size={12} />{post.readTime}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 0 1rem", lineHeight: 1.25 }}>{post.title}</h2>
          <p style={{ fontSize: "0.95rem", color: "hsl(270 15% 42%)", lineHeight: 1.75, margin: "0 0 1.5rem" }}>{post.excerpt}</p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {post.tags.map(t => <span key={t} style={{ padding: "0.2rem 0.6rem", background: "hsl(270 20% 94%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 600, color: "hsl(270 15% 48%)" }}>{t}</span>)}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 700, color: acc }}>
            Read Article <ArrowRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  );
}

export function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.25rem", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = acc; el.style.boxShadow = "0 16px 50px hsl(270 60% 40%/0.10)"; el.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "hsl(270 20% 88%)"; el.style.boxShadow = ""; el.style.transform = ""; }}
      >
        <div style={{ height: 160, background: post.thumbnail, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "hsl(270 40% 45%)", opacity: 0.2 }}>✦</span>
        </div>
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.875rem", flexWrap: "wrap" }}>
            <span style={{ padding: "0.2rem 0.65rem", background: "hsl(270 60% 95%)", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 700, color: acc, textTransform: "uppercase", letterSpacing: "0.05em" }}>{post.category}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontSize: "0.75rem", color: "hsl(270 15% 58%)" }}><Clock size={11} />{post.readTime}</span>
          </div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 0.625rem", lineHeight: 1.35 }}>{post.title}</h3>
          <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: "0 0 1rem", flex: 1 }}>{post.excerpt}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
            <span style={{ fontSize: "0.78rem", color: "hsl(270 15% 58%)" }}>{post.date}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", fontWeight: 700, color: acc }}>Read <ArrowRight size={13} /></span>
          </div>
        </div>
      </article>
    </Link>
  );
}
