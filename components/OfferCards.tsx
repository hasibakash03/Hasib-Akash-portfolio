"use client";
import { CheckCircle2, Star } from "lucide-react";

const acc = "hsl(275 70% 55%)";

export default function OfferCards() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem", alignItems: "start" }}>
        {/* Tier 1 */}
        <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", padding: "2.25rem", position: "relative" }}>
          <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: acc, color: "white", padding: "0.3rem 1.1rem", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>MOST POPULAR</div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1, marginBottom: "0.3rem" }}>FREE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "hsl(270 20% 12%)", marginBottom: "0.75rem" }}>Strategy Diagnostic</div>
            <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: 0 }}>A 30-minute call where I analyze your brand, positioning, and growth system to identify the single biggest gap holding you back.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
            {["30-minute strategy call", "Verbal strategic diagnosis", "1-page written summary (emailed after)", "No-pitch, no-pressure guarantee", "Works for any business stage"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: acc, flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "hsl(270 15% 40%)" }}>{item}</span>
              </div>
            ))}
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(270 60% 96%)", color: "hsl(275 70% 45%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", border: "1px solid hsl(270 30% 85%)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = acc; el.style.color = "white"; el.style.borderColor = acc; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(270 60% 96%)"; el.style.color = "hsl(275 70% 45%)"; el.style.borderColor = "hsl(270 30% 85%)"; }}
          >Apply Now →</a>
        </div>

        {/* Tier 2 */}
        <div style={{ background: "linear-gradient(135deg,hsl(270 60% 18%) 0%,hsl(275 55% 30%) 100%)", borderRadius: "1.5rem", padding: "2.25rem", position: "relative", boxShadow: "0 24px 80px hsl(270 60% 40%/0.35)" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: "0.3rem" }}>9,900৳</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "rgba(255,255,255,0.92)", marginBottom: "0.75rem" }}>Brand Blueprint Session</div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>A 90-minute deep-dive strategy session with a complete Brand Blueprint Document delivered after.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {["90-minute live strategy session", "Brand positioning analysis", "Target audience mapping", "Competitive differentiation framework", "30-day action plan", "Recorded session for your reference", "Written Brand Blueprint PDF"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: "hsl(275 70% 75%)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.72)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0.875rem 1rem", background: "rgba(255,255,255,0.07)", borderRadius: "0.75rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            ✦ Guarantee: 3+ actionable insights you haven't considered — or full refund.
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(275 75% 62%)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(275 70% 55%)"; }}
          >Book Blueprint →</a>
        </div>

        {/* Tier 3 */}
        <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", padding: "2.25rem", position: "relative" }}>
          <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "hsl(270 60% 40%)", color: "white", padding: "0.3rem 1.1rem", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>BEST VALUE</div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1, marginBottom: "0.3rem" }}>29,900৳</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "hsl(270 20% 12%)", marginBottom: "0.75rem" }}>Growth Strategy Intensive</div>
            <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: 0 }}>3 strategic sessions over 2 weeks. Walk away with a complete growth strategy you can execute with confidence.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {["3 sessions × 90 minutes over 2 weeks", "Full business audit (Session 1)", "Strategy build: positioning + offer (Session 2)", "90-day execution roadmap (Session 3)", "15–20 page Growth Strategy Document", "30 days WhatsApp follow-up support", "All session recordings"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: acc, flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "hsl(270 15% 40%)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0.875rem 1rem", background: "hsl(270 60% 97%)", borderRadius: "0.75rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "hsl(270 40% 45%)", lineHeight: 1.6 }}>
            ✦ Guarantee: Free revisions until you believe in the strategy.
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(270 60% 96%)", color: "hsl(275 70% 45%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", border: "1px solid hsl(270 30% 85%)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = acc; el.style.color = "white"; el.style.borderColor = acc; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(270 60% 96%)"; el.style.color = "hsl(275 70% 45%)"; el.style.borderColor = "hsl(270 30% 85%)"; }}
          >Apply for Intensive →</a>
        </div>
      </div>

      {/* Testimonial strip */}
      <div style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
        {[
          { quote: "The Diagnostic alone gave me more clarity than 6 months of trying to figure it out myself.", name: "R.A.", role: "E-commerce Founder" },
          { quote: "I booked the Blueprint expecting tactics. I got a complete rethink of my positioning. Worth every taka.", name: "N.I.", role: "Service Business CEO" },
        ].map(({ quote, name, role }) => (
          <div key={name} style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1rem", padding: "1.5rem" }}>
            <div style={{ display: "flex", gap: "0.2rem", marginBottom: "0.75rem" }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill={acc} style={{ color: acc }} />)}
            </div>
            <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 35%)", lineHeight: 1.7, margin: "0 0 0.75rem", fontStyle: "italic" }}>&ldquo;{quote}&rdquo;</p>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "hsl(270 20% 20%)" }}>{name} · <span style={{ fontWeight: 500, color: "hsl(270 15% 50%)" }}>{role}</span></div>
          </div>
        ))}
      </div>
    </>
  );
}
