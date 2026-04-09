import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { FeaturedBlogCard, BlogPostCard } from "@/components/BlogCard";

export const metadata = { title: "Blog — Hasib Akash", description: "Brand strategy, positioning, and growth frameworks applied to the Bangladeshi market." };

const acc = "hsl(275 70% 55%)";
const categories = ["All", "Brand Strategy", "Positioning", "Personal Branding", "Business Growth", "Bangladesh Market"];

const posts = [
  { slug: "why-positioning-beats-ads", title: "Why Your Ads Aren't Working (And It's Not the Ad)", category: "Brand Strategy", date: "April 5, 2026", readTime: "6 min", featured: true, thumbnail: "hsl(270 55% 88%)", excerpt: "Before you optimize your creative, change your targeting, or hire a new media buyer — read this. The problem is almost never the ad itself. It's what the ad is selling, to whom, and why they should believe you.", tags: ["Positioning", "Ads", "Strategy"] },
  { slug: "bangladesh-market-sophistication", title: "The State of Brand Strategy in Bangladesh (And Why There's an Opening)", category: "Bangladesh Market", date: "March 28, 2026", readTime: "8 min", featured: false, thumbnail: "hsl(275 50% 88%)", excerpt: "Most Bangladeshi businesses are fighting in a red ocean of execution. Here's what the market looks like, where the sophistication gaps are, and where the real opportunity sits.", tags: ["Bangladesh", "Market Analysis", "Opportunity"] },
  { slug: "hormozi-offer-design-bangladesh", title: "Applying Hormozi's Offer Framework to Bangladeshi Businesses", category: "Business Growth", date: "March 20, 2026", readTime: "7 min", featured: false, thumbnail: "hsl(280 45% 88%)", excerpt: "The value equation isn't just for American SaaS companies. Here's how to apply dream outcome, perceived likelihood, time delay, and effort to local market conditions.", tags: ["Hormozi", "Offer Design", "Framework"] },
  { slug: "personal-brand-vs-company-brand", title: "Should Founders Build a Personal Brand or a Company Brand?", category: "Personal Branding", date: "March 12, 2026", readTime: "5 min", featured: false, thumbnail: "hsl(265 50% 90%)", excerpt: "The answer isn't obvious — and getting it wrong means building equity in the wrong asset. Here's the framework I use to help founders decide.", tags: ["Personal Brand", "Founders", "Strategy"] },
  { slug: "why-logos-dont-fix-brands", title: "Why a New Logo Won't Fix Your Brand Problem", category: "Brand Strategy", date: "March 5, 2026", readTime: "5 min", featured: false, thumbnail: "hsl(272 55% 90%)", excerpt: "I've watched dozens of businesses invest 20,000–50,000 taka in a new logo and website redesign, only to see the same flat results. The problem was never visual.", tags: ["Brand Strategy", "Logo", "Positioning"] },
  { slug: "ries-trout-positioning-bangladesh", title: "Ries & Trout's Positioning Applied to the Bangladesh Market", category: "Positioning", date: "February 25, 2026", readTime: "9 min", featured: false, thumbnail: "hsl(268 50% 88%)", excerpt: "What translates directly from a 1981 classic — and what you need to adapt for local conditions in 2026.", tags: ["Positioning", "Bangladesh", "Frameworks"] },
];

export default function BlogPage() {
  const featured = posts.find(p => p.featured)!;
  const rest = posts.filter(p => !p.featured);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5.5rem", minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,hsl(270 60% 10%) 0%,hsl(275 65% 20%) 100%)", padding: "5rem 1.5rem 4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "absolute", left: "60%", top: "50%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,hsl(275 70% 55%/0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 75%)", marginBottom: "1rem" }}>Insights</p>
            <h1 style={{ fontSize: "clamp(2.5rem,5vw,4.2rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 1rem", color: "white", lineHeight: 1.08, maxWidth: 700 }}>Strategic Thinking<br />for Bangladeshi Founders.</h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: 500 }}>Brand strategy, positioning frameworks, and growth insights — applied to the local market. No generic Western templates.</p>
          </div>
        </section>

        {/* Category filter */}
        <section style={{ background: "white", borderBottom: "1px solid hsl(270 20% 90%)", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "0.5rem", overflowX: "auto", padding: "1rem 0" }}>
            {categories.map((cat, i) => (
              <div key={cat} style={{ display: "inline-flex", padding: "0.45rem 1rem", borderRadius: 9999, whiteSpace: "nowrap", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", background: i === 0 ? acc : "hsl(270 30% 96%)", color: i === 0 ? "white" : "hsl(270 15% 45%)", border: i === 0 ? "none" : "1px solid hsl(270 20% 88%)", flexShrink: 0 }}>{cat}</div>
            ))}
          </div>
        </section>

        <section style={{ background: "hsl(270 30% 98%)", padding: "4rem 1.5rem 6rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <ScrollReveal><FeaturedBlogCard post={featured} /></ScrollReveal>

            {/* Newsletter */}
            <ScrollReveal delay={100}>
              <div style={{ background: "hsl(270 25% 95%)", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.25rem", padding: "1.75rem 2rem", marginBottom: "3rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "hsl(270 20% 12%)", marginBottom: "0.25rem" }}>Get weekly brand strategy insights.</div>
                  <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 50%)", margin: 0 }}>No generic marketing tips. Strategy-first thinking for Bangladeshi founders.</p>
                </div>
                <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                  <input placeholder="your@email.com" style={{ padding: "0.7rem 1rem", border: "1px solid hsl(270 20% 85%)", borderRadius: "0.625rem", fontSize: "0.9rem", fontFamily: "Urbanist,sans-serif", outline: "none", minWidth: 220 }} />
                  <button style={{ padding: "0.7rem 1.4rem", background: acc, color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif", whiteSpace: "nowrap" }}>Subscribe →</button>
                </div>
              </div>
            </ScrollReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
              {rest.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80}><BlogPostCard post={p} /></ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
