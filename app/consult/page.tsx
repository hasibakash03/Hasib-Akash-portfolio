import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import OfferCards from "@/components/OfferCards";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Four ways to work with Hasib Akash — from a free Cold Client Audit to a Full Stack AI-powered positioning system. Strategy-first consulting for Bangladeshi founders.",
  openGraph: {
    title: "Work With Me — Hasib Akash",
    description: "Book a free Cold Client Audit. No pitch, no pressure — just clarity on exactly why cold clients aren't choosing you.",
    images: [{ url: "/og?title=Strategic+consulting+for+founders+who+are+done+guessing&type=home", width: 1200, height: 630 }],
  },
};

const consultSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand Strategy Consulting",
  provider: { "@type": "Person", name: "Hasib Akash" },
  serviceType: "Brand Strategy & Growth Consulting",
  areaServed: { "@type": "Country", name: "Bangladesh" },
  offers: [
    { "@type": "Offer", name: "Cold Client Audit", price: "0", priceCurrency: "BDT", description: "Free 30-minute cold client gap diagnosis call" },
    { "@type": "Offer", name: "Brand Blueprint Session", price: "9900", priceCurrency: "BDT", description: "90-minute deep-dive with Brand Blueprint document delivered after" },
    { "@type": "Offer", name: "Cold Client Sprint", price: "19900", priceCurrency: "BDT", description: "2-week done-with-you positioning system to attract cold clients" },
    { "@type": "Offer", name: "Full Stack — Sprint + AI Employee System", price: "39900", priceCurrency: "BDT", description: "Cold Client Sprint plus custom AI system built for your business" },
  ],
};

const acc = "hsl(275 70% 55%)";

const faqs = [
  { q: "What happens on the free diagnostic call?", a: "We spend 30 minutes going through your current brand, marketing, and growth situation. I ask the right questions, identify the single biggest constraint holding your business back, and give you a verbal diagnosis plus a 1-page written summary after the call. No pitch, no upsell pressure. You leave with clarity — whether you continue working with me or not." },
  { q: "How is this different from hiring a marketing agency?", a: "Agencies execute. I strategize. Most businesses hire agencies before they have a clear strategy, then wonder why the execution isn't producing results. We fix the foundation first — clear positioning, offer design, and growth architecture — so any agency you hire after this will actually produce results." },
  { q: "What if I'm just starting out and don't have much revenue yet?", a: "The Strategy Diagnostic is designed for exactly this — founders who are just starting out and want to build on a solid foundation from day one. It's far better to get positioning and offer design right at the beginning than to spend 12 months executing a flawed strategy and then rebuild." },
  { q: "Do you help with execution too, or just strategy?", a: "Strategy is my primary focus in the consulting practice. For execution — brand identity design, content strategy, social media management, campaigns — that's what TradeFigur handles. The consulting naturally identifies what execution is needed, and we can discuss TradeFigur's agency services as a follow-on." },
  { q: "How do I know this will work for my specific business?", a: "I back both paid tiers with a guarantee. For the Blueprint Session: if you don't walk away with at least 3 actionable insights you haven't considered before, I'll refund you in full. For the Growth Intensive: if the strategy document doesn't give you a clear, executable growth path you believe in, I'll revise it at no extra cost until it does." },
  { q: "How long does it take to see results from the strategy work?", a: "Strategic clarity shows up immediately — from the first session, most clients report seeing their business situation differently. Measurable business results depend on how quickly you execute. Clients who implement consistently typically see meaningful changes in conversion rates, lead quality, and positioning clarity within 60-90 days." },
];

export default function ConsultPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(consultSchema) }} />
      <Navbar />
      <main style={{ paddingTop: "5.5rem", minHeight: "100vh" }}>
        <section style={{ background: "linear-gradient(135deg,hsl(270 60% 10%) 0%,hsl(275 65% 20%) 100%)", padding: "5rem 1.5rem 4.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "absolute", right: "5%", bottom: "-30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,hsl(275 70% 55%/0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 78%)", marginBottom: "1rem" }}>Work With Me</p>
            <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.025em", color: "white", margin: "0 0 1.25rem" }}>
              Strategic consulting for founders who are done guessing.
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 2.5rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              Four ways to work together — from a free audit to a full AI-powered growth system. Pick the level that matches where you are.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              {["No long-term contracts", "Guaranteed results", "Strategy-first always"].map(t => (
                <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                  <CheckCircle2 size={13} style={{ color: "hsl(275 70% 75%)" }} /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "hsl(270 30% 98%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ScrollReveal><OfferCards /></ScrollReveal>
          </div>
        </section>

        <section style={{ background: "hsl(270 25% 95%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, marginBottom: "0.75rem" }}>FAQ</p>
                <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: 0 }}>Common Questions</h2>
              </div>
            </ScrollReveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {faqs.map(({ q, a }, i) => (
                <ScrollReveal key={q} delay={i * 60}>
                  <details style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "0.875rem", padding: "1.25rem 1.5rem", cursor: "pointer" }}>
                    <summary style={{ fontWeight: 700, fontSize: "0.95rem", color: "hsl(270 20% 12%)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                      <span>{q}</span>
                      <span style={{ color: acc, fontSize: "1.3rem", lineHeight: 1, flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 42%)", lineHeight: 1.78, margin: "1rem 0 0" }}>{a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="apply" style={{ background: "linear-gradient(135deg,hsl(270 60% 25%) 0%,hsl(280 65% 40%) 50%,hsl(290 55% 50%) 100%)", padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ maxWidth: 660, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 78%)", marginBottom: "0.75rem" }}>Apply</p>
                <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 900, letterSpacing: "-0.025em", color: "white", margin: "0 0 0.75rem" }}>Ready to get started?</h2>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.7 }}>I review every application personally. You&apos;ll hear back within 24 hours — usually faster.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: "1.5rem", padding: "2.5rem", backdropFilter: "blur(12px)" }}>
                <ContactForm />
              </div>
              <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
                <a href="https://wa.me/8801XXXXXXXXX" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", textDecoration: "none", fontWeight: 600 }}>
                  Or message directly on WhatsApp → <ArrowRight size={14} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
