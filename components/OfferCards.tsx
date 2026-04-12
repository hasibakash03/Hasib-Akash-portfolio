"use client";
import { CheckCircle2, Star } from "lucide-react";

const acc = "hsl(275 70% 55%)";

export default function OfferCards() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem", alignItems: "start" }}>

        {/* Card 1 — FREE / Cold Client Audit (no badge) */}
        <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", padding: "2.25rem", position: "relative" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1, marginBottom: "0.3rem" }}>FREE</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "hsl(270 20% 12%)", marginBottom: "0.75rem" }}>Cold Client Audit</div>
            <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: 0 }}>A free 30-minute call where I diagnose exactly why cold clients aren&apos;t choosing you — and hand you a written summary of what to fix first.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
            {[
              "30-minute 1-on-1 strategy call",
              "Cold client gap diagnosis — specific to your business",
              "1-page written summary delivered within 24 hours",
              "No pitch, no pressure, no obligation",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: acc, flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "hsl(270 15% 40%)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0.875rem 1rem", background: "hsl(270 60% 97%)", borderRadius: "0.75rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "hsl(270 40% 45%)", lineHeight: 1.6 }}>
            ✦ If I don&apos;t find at least one clear gap in your positioning, I&apos;ll tell you honestly — and still send the summary.
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(270 60% 96%)", color: "hsl(275 70% 45%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", border: "1px solid hsl(270 30% 85%)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = acc; el.style.color = "white"; el.style.borderColor = acc; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(270 60% 96%)"; el.style.color = "hsl(275 70% 45%)"; el.style.borderColor = "hsl(270 30% 85%)"; }}
          >Apply for Free Audit →</a>
        </div>

        {/* Card 2 — 9,900৳ / Brand Blueprint Session (no badge) */}
        <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", padding: "2.25rem", position: "relative" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1, marginBottom: "0.3rem" }}>9,900৳</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "hsl(270 20% 12%)", marginBottom: "0.75rem" }}>Brand Blueprint Session</div>
            <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: 0 }}>A single 90-minute deep-dive session with a written Brand Blueprint document delivered after. Best for founders who want clarity before committing to full implementation.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {[
              "90-minute live strategy session",
              "Cold client positioning analysis",
              "Target audience mapping",
              "Competitive differentiation framework",
              "Written Brand Blueprint PDF delivered after",
              "Session recording for your reference",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: acc, flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "hsl(270 15% 40%)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0.875rem 1rem", background: "hsl(270 60% 97%)", borderRadius: "0.75rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "hsl(270 40% 45%)", lineHeight: 1.6 }}>
            ✦ Guarantee: 3+ actionable insights you haven&apos;t considered — or full refund.
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(270 60% 96%)", color: "hsl(275 70% 45%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", border: "1px solid hsl(270 30% 85%)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = acc; el.style.color = "white"; el.style.borderColor = acc; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(270 60% 96%)"; el.style.color = "hsl(275 70% 45%)"; el.style.borderColor = "hsl(270 30% 85%)"; }}
          >Book Blueprint →</a>
        </div>

        {/* Card 3 — 19,900৳ / Cold Client Sprint (MOST POPULAR — elevated dark card) */}
        <div style={{ background: "linear-gradient(135deg,hsl(270 60% 14%) 0%,hsl(275 55% 28%) 100%)", borderRadius: "1.5rem", padding: "2.5rem 2.25rem", position: "relative", boxShadow: "0 32px 80px hsl(270 60% 30%/0.5)", transform: "translateY(-6px)", zIndex: 1 }}>
          <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: acc, color: "white", padding: "0.3rem 1.1rem", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>MOST POPULAR</div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: "0.3rem" }}>19,900৳</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "rgba(255,255,255,0.92)", marginBottom: "0.75rem" }}>Cold Client Sprint</div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>A complete 2-week done-with-you positioning system that turns your brand into a cold client magnet — not just another referral-dependent business.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {[
              "Full Cold Client Audit (Session 1) — diagnose exactly what's blocking cold trust",
              "Revenue Positioning Document — your one-page strategic foundation",
              "Cold bio + headline rewrite — done for you, same week",
              "Messaging hierarchy — what to say, where, and in what order",
              "10 authority content angles derived from your positioning",
              "DM conversion script — turn followers into booked calls",
              "30-day content brief — your team knows exactly what to post for a month",
              "AI-assisted delivery — Fortune 500 strategy in 2 weeks, not 3 months",
              "Session 2: review, lock, and execute together",
              "Both sessions recorded",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: "hsl(275 70% 75%)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0.875rem 1rem", background: "rgba(255,255,255,0.07)", borderRadius: "0.75rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            ✦ Guarantee: Complete both sessions and implement the positioning. If you don&apos;t receive at least one cold inquiry within 30 days — I keep working with you every week, free, until you do.
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(275 75% 62%)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(275 70% 55%)"; }}
          >Book Your Sprint →</a>
        </div>

        {/* Card 4 — 39,900৳ / Full Stack (BEST VALUE) */}
        <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.5rem", padding: "2.25rem", position: "relative" }}>
          <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "hsl(270 60% 40%)", color: "white", padding: "0.3rem 1.1rem", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>BEST VALUE</div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1, marginBottom: "0.3rem" }}>39,900৳</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "hsl(270 20% 12%)", marginBottom: "0.75rem" }}>Full Stack — Sprint + AI Employee System</div>
            <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: 0 }}>Everything in the Cold Client Sprint — plus a custom AI system built specifically around your business, so it grows without you doing everything manually.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {[
              "Everything in the Cold Client Sprint",
              "AI Content Engine — custom prompts that generate on-brand content daily",
              "AI Inbox Manager — trained DM and WhatsApp responses for every objection",
              "AI Research Assistant — know your market better than competitors who pay agencies",
              "AI Daily Operating System — 2 hours of thinking compressed into 20 minutes",
              "AI Proposal Builder — generate client pitches and follow-ups in minutes",
              "90-day execution roadmap",
              "30 days WhatsApp follow-up support",
              "All sessions recorded",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <CheckCircle2 size={15} style={{ color: acc, flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: "0.875rem", color: "hsl(270 15% 40%)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0.875rem 1rem", background: "hsl(270 60% 97%)", borderRadius: "0.75rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "hsl(270 40% 45%)", lineHeight: 1.6 }}>
            ✦ Guarantee: Free revisions on every deliverable until you&apos;re confident executing. If you don&apos;t believe in the strategy after Session 3 — you don&apos;t pay for it.
          </div>
          <a href="#apply" style={{ display: "block", textAlign: "center", padding: "0.875rem", background: "hsl(270 60% 96%)", color: "hsl(275 70% 45%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", border: "1px solid hsl(270 30% 85%)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = acc; el.style.color = "white"; el.style.borderColor = acc; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "hsl(270 60% 96%)"; el.style.color = "hsl(275 70% 45%)"; el.style.borderColor = "hsl(270 30% 85%)"; }}
          >Apply for Full Stack →</a>
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
