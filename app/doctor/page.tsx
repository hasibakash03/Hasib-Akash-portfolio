import type { Metadata } from "next";
import Image from "next/image";
import DoctorNavbar from "@/components/doctor/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Personal Brand Strategy for Doctors | Hasib Akash",
  description:
    "I help established doctors in Bangladesh build a personal brand that makes them the obvious choice — before a patient ever books an appointment. No paid ads. No content agency. Strategy first.",
  openGraph: {
    title: "Personal Brand Strategy for Doctors — Hasib Akash",
    description:
      "Stop being the best-kept secret. Build the brand that makes patients remember your name before they ever search for a doctor.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function DoctorPage() {
  return (
    <>
      <style>{`
        @keyframes doc-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50%       { transform: translateX(-50%) translateY(9px); opacity: 1; }
        }
        .doc-scroll-indicator { animation: doc-bounce 2s cubic-bezier(0.45,0.05,0.55,0.95) infinite; }

        .doc-cta-btn:hover  { background: hsl(275 70% 48%) !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px hsl(275 70% 55% / 0.45) !important; }
        .doc-cta-btn:active { transform: translateY(0) !important; }

        .doc-pain-card { background: white; border: 1.5px solid hsl(270 20% 88%); border-radius: 1rem; padding: 2rem 1.75rem; transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.22s ease; height: 100%; }
        .doc-pain-card:hover { border-color: hsl(275 70% 55%); box-shadow: 0 10px 36px hsl(275 70% 55% / 0.14); transform: translateY(-4px); }

        .doc-proof-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 1.25rem; padding: 2rem 1.75rem; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        .doc-proof-label { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 9999px; margin-bottom: 1.25rem; }

        /* Story section */
        .doc-story-grid { display: grid; grid-template-columns: 380px 1fr; gap: 5rem; align-items: start; }
        .doc-story-p { font-size: 0.975rem; color: hsl(270 15% 38%); line-height: 1.9; margin: 0 0 1.1rem; }
        .doc-story-p:last-child { margin: 0; }

        /* Offer section */
        .doc-offer-grid { display: grid; grid-template-columns: 1.15fr 1fr 0.9fr; gap: 1.25rem; align-items: start; }
        .doc-offer-card { border-radius: 1.25rem; padding: 2rem 1.75rem; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .doc-offer-card-primary { background: rgba(255,255,255,0.1); border: 1.5px solid hsl(275 70% 65% / 0.6); }
        .doc-offer-card-primary:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
        .doc-offer-card-secondary { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); }
        .doc-offer-card-secondary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.25); }
        .doc-offer-card-anchor { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); }
        .doc-offer-btn { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.8rem 1.5rem; background: hsl(275 70% 55%); color: white; border-radius: 9999px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease; width: 100%; justify-content: center; box-shadow: 0 4px 16px hsl(275 70% 55% / 0.35); }
        .doc-offer-btn:hover { background: hsl(275 70% 48%) !important; transform: translateY(-1px); box-shadow: 0 8px 24px hsl(275 70% 55% / 0.45); }
        .doc-offer-link { font-size: 0.875rem; font-weight: 700; color: hsl(275 70% 76%); text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem; transition: color 0.2s; }
        .doc-offer-link:hover { color: white; }

        /* Deliverables */
        .doc-deliv-card { background: white; border: 1.5px solid hsl(270 20% 88%); border-radius: 1rem; padding: 1.75rem; transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease; }
        .doc-deliv-card:hover { border-color: hsl(275 70% 55%); box-shadow: 0 8px 28px hsl(275 70% 55% / 0.12); transform: translateY(-3px); }

        @media (max-width: 900px) {
          .doc-story-grid     { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .doc-offer-grid     { grid-template-columns: 1fr !important; }
          .doc-pain-grid      { grid-template-columns: 1fr !important; }
          .doc-proof-grid     { grid-template-columns: 1fr !important; }
          .doc-deliv-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <DoctorNavbar />

      <main>

        {/* ====================================================
            SECTION 1 — HERO
        ==================================================== */}
        <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "hsl(270 60% 6%)", padding: "9rem 1.5rem 6rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 65% at 50% 42%, hsl(275 70% 28% / 0.42) 0%, transparent 68%)", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, hsl(275 70% 55% / 0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
            <p className="hero-eyebrow" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "hsl(275 70% 78%)", margin: "0 0 1.5rem" }}>For established doctors in Bangladesh</p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(2.1rem, 5.5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", color: "white", margin: "0 0 1.75rem" }}>
              Patients don&apos;t find the best doctor.{" "}
              <span style={{ color: "hsl(275 70% 76%)" }}>They remember a familiar name.</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", color: "rgba(255,255,255,0.62)", lineHeight: 1.85, margin: "0 0 2.75rem", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
              I help established doctors in Bangladesh build a personal brand that makes them the obvious choice — before a patient ever books an appointment.{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>No paid ads. No content agency. Strategy first.</span>
            </p>
            <div className="hero-cta" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <a href="#audit-form" className="doc-cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.9rem 2rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "1rem", textDecoration: "none", letterSpacing: "0.01em", boxShadow: "0 4px 18px hsl(275 70% 55% / 0.35)", transition: "background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease" }}>
                Book Your Free Audit &rarr;
              </a>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.32)", fontWeight: 500, margin: 0, letterSpacing: "0.03em" }}>Free 30-minute call. No pitch. No obligation.</p>
            </div>
          </div>
          <div className="doc-scroll-indicator" aria-hidden="true" style={{ position: "absolute", bottom: "2.25rem", left: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L10 10L19 1" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>

        {/* ====================================================
            SECTION 3 — PAIN
        ==================================================== */}
        <section id="pain" style={{ background: "hsl(270 30% 98%)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.025em", color: "hsl(270 20% 12%)", margin: "0 auto", maxWidth: 720 }}>
                  You are good at medicine.{" "}
                  <span style={{ color: "hsl(275 70% 45%)" }}>Your competitor is good at being known.</span>{" "}
                  Right now, he is winning.
                </h2>
              </div>
            </ScrollReveal>
            <div className="doc-pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              <ScrollReveal delay={0}>
                <div className="doc-pain-card">
                  <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "hsl(275 70% 55%)", margin: "0 0 1rem" }}>01</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.015em", color: "hsl(270 20% 12%)", margin: "0 0 0.875rem" }}>You depend on referrals you can&apos;t control</h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 42%)", lineHeight: 1.78, margin: 0 }}>Referrals plateau eventually. Every one of them relies on someone else remembering your name at the right moment — and deciding to pass it on. You have no system that works without someone else&apos;s goodwill.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="doc-pain-card">
                  <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "hsl(275 70% 55%)", margin: "0 0 1rem" }}>02</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.015em", color: "hsl(270 20% 12%)", margin: "0 0 0.875rem" }}>You&apos;ve tried posting. You got nothing.</h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 42%)", lineHeight: 1.78, margin: 0 }}>You posted for weeks, possibly months. No new patients. The problem was never the posting. There was no positioning strategy underneath it. Content without strategy is just noise — and noise doesn&apos;t convert.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="doc-pain-card">
                  <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "hsl(275 70% 55%)", margin: "0 0 1rem" }}>03</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.015em", color: "hsl(270 20% 12%)", margin: "0 0 0.875rem" }}>The doctor getting your patients is not better than you</h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 42%)", lineHeight: 1.78, margin: 0 }}>He is better known — not a better clinician. The gap between you is positioning, not ability. That gap is entirely closable. You already have what it takes. You just need to be seen.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ====================================================
            SECTION 4 — PROOF
        ==================================================== */}
        <section id="proof" style={{ background: "linear-gradient(135deg, hsl(270 60% 18%) 0%, hsl(275 55% 28%) 100%)", padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, hsl(275 70% 55% / 0.2) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 78%)", margin: "0 0 1rem" }}>Real result · Feni, Chittagong Division</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.75rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.025em", color: "white", margin: 0, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
                  From &ldquo;I don&apos;t know him&rdquo; to{" "}
                  <span style={{ color: "hsl(275 70% 76%)" }}>30 new patients a month.</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="doc-proof-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                <div className="doc-proof-card">
                  <div className="doc-proof-label" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block", flexShrink: 0 }} />Before
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "white", margin: "0 0 0.75rem", letterSpacing: "-0.01em" }}>Dr. Anisur Rahman Rasel — Pediatric Specialist, Feni</h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                    Skilled clinician. Respected by colleagues. But invisible to the patients who needed him most. A less capable competitor across town was consistently busier — not because of clinical ability, but because of familiarity. When referred patients were asked why they didn&apos;t visit Dr. Rasel, the answer was the same every time:{" "}
                    <em style={{ color: "rgba(255,255,255,0.38)" }}>&ldquo;I don&apos;t know him.&rdquo;</em>
                  </p>
                </div>
                <div className="doc-proof-card">
                  <div className="doc-proof-label" style={{ background: "hsl(275 70% 55% / 0.2)", color: "hsl(275 70% 82%)", border: "1px solid hsl(275 70% 55% / 0.35)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(275 70% 70%)", display: "inline-block", flexShrink: 0 }} />After
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "white", margin: "0 0 0.75rem", letterSpacing: "-0.01em" }}>5 months. Zero paid ads.</h3>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 1.25rem" }}>
                    No ad budget. No content agency. A positioning system built around what made Dr. Rasel distinctly credible — and a strategy for making that credibility visible. Within 5 months, 30 new patients per month were arriving. They referenced specific content. They already trusted him. When asked why they chose him, the answer had changed:{" "}
                    <em style={{ color: "hsl(275 70% 82%)" }}>&ldquo;I&apos;ve been watching him.&rdquo;</em>
                  </p>
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" as const }}>
                    {[{ value: "+30", label: "patients/month" }, { value: "5mo", label: "to result" }, { value: "\u09F30", label: "ad spend" }].map((s) => (
                      <div key={s.label}>
                        <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "hsl(275 70% 76%)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</p>
                        <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", margin: "0.25rem 0 0", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div style={{ background: "hsl(275 70% 55%)", borderRadius: "0.875rem", padding: "1.1rem 2rem", textAlign: "center", marginBottom: "3rem", boxShadow: "0 4px 24px hsl(275 70% 55% / 0.4)" }}>
                <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)", fontWeight: 800, color: "white", margin: 0, letterSpacing: "0.04em" }}>
                  +30 new patients / month &nbsp;&middot;&nbsp; 5 months &nbsp;&middot;&nbsp; 0 paid ads
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
                <p aria-hidden="true" style={{ fontSize: "4rem", lineHeight: 0.6, color: "hsl(275 70% 55%)", margin: "0 0 1.25rem", fontFamily: "Georgia, serif" }}>&ldquo;</p>
                <blockquote style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)", fontStyle: "italic", fontWeight: 600, color: "rgba(255,255,255,0.88)", lineHeight: 1.75, margin: "0 0 1.5rem", padding: 0, border: "none" }}>
                  Patients arrived already knowing what I stood for. They came in trusting me before I said a word.
                </blockquote>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Dr. Anisur Rahman Rasel &nbsp;&middot;&nbsp; Pediatric Specialist, Feni
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ====================================================
            SECTION 5 — STORY
        ==================================================== */}
        <section id="story" style={{ background: "hsl(270 30% 98%)", padding: "7rem 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{ marginBottom: "3.5rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 55%)", margin: "0 0 0.875rem" }}>Why I do this</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.025em", color: "hsl(270 20% 12%)", margin: 0, maxWidth: 680 }}>
                  I wanted to be a doctor. I failed. Twice.{" "}
                  <span style={{ color: "hsl(275 70% 45%)" }}>That failure became this.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="doc-story-grid">
              {/* Left — photo + byline */}
              <ScrollReveal delay={60}>
                <div style={{ position: "sticky", top: "6rem" }}>
                  <div style={{ borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 24px 64px rgba(80,20,140,0.18), 0 4px 16px rgba(0,0,0,0.1)", aspectRatio: "3/4", position: "relative", maxHeight: 520 }}>
                    <Image
                      src="/hasib-akash.webp"
                      alt="Hasib Akash — Brand Strategist, Chittagong"
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                      sizes="(max-width: 900px) 100vw, 380px"
                      priority
                    />
                  </div>
                  <div style={{ marginTop: "1.25rem", paddingLeft: "0.25rem" }}>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "hsl(270 20% 12%)", margin: 0, lineHeight: 1.6 }}>
                      Hasib Akash &nbsp;&middot;&nbsp; Brand Strategist
                    </p>
                    <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(270 15% 52%)", margin: "0.2rem 0 0" }}>
                      Founder, TradeFigur &nbsp;&middot;&nbsp; Chittagong
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right — story copy */}
              <ScrollReveal delay={120}>
                <div style={{ paddingTop: "0.5rem" }}>
                  <p className="doc-story-p">From childhood, I wanted to be a doctor. Not for status. Because I wanted to help people with something real.</p>
                  <p className="doc-story-p">I sat the admission exam twice. I failed both times.</p>
                  <p className="doc-story-p">The second time I failed, I sat with that result and tried to understand what happened. And I realised — I had been talked out of it. During my HSC years, everyone around me said the same things: &lsquo;There are doctors everywhere now. After MBBS, young doctors struggle to get patients. The old doctors made money, but new doctors can&apos;t build a practice anymore. Patients don&apos;t find the best doctor — they go to the familiar name.&rsquo;</p>
                  <p className="doc-story-p">Those words planted doubt in me at exactly the wrong moment. I lost focus. I failed.</p>
                  <p className="doc-story-p">But those words also stayed with me. Because they were true — and they described a problem nobody was solving.</p>
                  <p className="doc-story-p">There are doctors in Bangladesh who are excellent clinicians. They studied hard, they sacrificed years, they genuinely help people. And they are invisible. Not because they are bad doctors. Because patients cannot choose a doctor they have never heard of.</p>
                  <p className="doc-story-p" style={{ fontWeight: 700, color: "hsl(270 20% 18%)" }}>I could not become a doctor. But I could make sure that good doctors do not stay invisible.</p>
                  <p className="doc-story-p">The first doctor I worked with was Dr. Anisur Rahman Rasel — a skilled pediatric specialist in Feni who was losing patients to a less capable competitor simply because that competitor was better known.</p>
                  <p className="doc-story-p">After we built his positioning system, patients stopped saying &lsquo;I don&apos;t know him&apos; and started saying &lsquo;I&apos;ve been watching him.&rsquo;</p>
                  <p className="doc-story-p" style={{ fontStyle: "italic", color: "hsl(275 70% 40%)", fontWeight: 600, fontSize: "1.025rem", borderLeft: "3px solid hsl(275 70% 55%)", paddingLeft: "1.25rem", marginLeft: "0.25rem" }}>That result is why I do this. Not for marketing. For the doctors who deserve to be found.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ====================================================
            SECTION 6 — OFFER
        ==================================================== */}
        <section id="offer" style={{ background: "linear-gradient(135deg, hsl(270 60% 10%) 0%, hsl(275 65% 20%) 100%)", padding: "7rem 1.5rem", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, hsl(275 70% 55% / 0.15) 0%, transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.025em", color: "white", margin: "0 auto", maxWidth: 700 }}>
                  One offer. Built around your practice.{" "}
                  <span style={{ color: "hsl(275 70% 76%)" }}>Two weeks. Done with you.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="doc-offer-grid">

              {/* CARD 1 — Primary, largest */}
              <ScrollReveal delay={0}>
                <div className="doc-offer-card doc-offer-card-primary">
                  <p style={{ fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "hsl(275 70% 78%)", margin: "0 0 1.25rem" }}>Start here</p>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "white", margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>Cold Client Audit</h3>
                  <p style={{ fontSize: "2.2rem", fontWeight: 900, color: "white", margin: "0 0 1.25rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    Free
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: 0, marginLeft: "0.5rem" }}>/ 30 min call</span>
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: "0 0 2rem" }}>
                    I review your current position, identify the exact gap, and show you what&apos;s holding your practice back. No cost. No obligation. If it&apos;s not the right fit, I&apos;ll tell you directly.
                  </p>
                  <a href="#audit-form" className="doc-offer-btn">Book Your Free Audit &rarr;</a>
                </div>
              </ScrollReveal>

              {/* CARD 2 — Secondary, "Most chosen" */}
              <ScrollReveal delay={100}>
                <div className="doc-offer-card doc-offer-card-secondary">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <p style={{ fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", margin: 0 }}>The sprint</p>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "0.25rem 0.65rem", background: "hsl(275 70% 55%)", color: "white", borderRadius: 9999 }}>Most chosen</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "white", margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>Revenue Positioning Sprint</h3>
                  <p style={{ fontSize: "1.9rem", fontWeight: 900, color: "white", margin: "0 0 1.25rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    &#2547;19,900
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 2rem" }}>
                    2 weeks. Revenue Positioning Document, messaging hierarchy, 10 authority content angles, DM conversion script, 30-day content brief. Dr. Rasel&apos;s result came from this exact system.
                  </p>
                  <a href="#deliverables" className="doc-offer-link">See what&apos;s included &darr;</a>
                </div>
              </ScrollReveal>

              {/* CARD 3 — Anchor, smallest */}
              <ScrollReveal delay={200}>
                <div className="doc-offer-card doc-offer-card-anchor">
                  <p style={{ fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", margin: "0 0 1.25rem" }}>The full build</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "rgba(255,255,255,0.85)", margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>Sprint + AI Infrastructure</h3>
                  <p style={{ fontSize: "1.7rem", fontWeight: 900, color: "rgba(255,255,255,0.75)", margin: "0 0 1.25rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    &#2547;39,900
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, margin: "0 0 1.75rem" }}>
                    Everything in the sprint, plus five AI systems built around your practice — patient follow-up, appointment reminders, content scheduling, referral tracking.
                  </p>
                  <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", fontStyle: "italic", margin: 0 }}>Discussed after audit call.</p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ====================================================
            SECTION 7 — DELIVERABLES
        ==================================================== */}
        <section id="deliverables" style={{ background: "hsl(270 25% 95%)", padding: "7rem 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ScrollReveal>
              <div style={{ marginBottom: "3.5rem" }}>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.025em", color: "hsl(270 20% 12%)", margin: "0 0 0.5rem" }}>
                  What you receive in the sprint.
                </h2>
                <p style={{ fontSize: "1rem", color: "hsl(270 15% 48%)", margin: 0, lineHeight: 1.6 }}>
                  Six deliverables. Built around your practice. Delivered in two weeks.
                </p>
              </div>
            </ScrollReveal>

            <div className="doc-deliv-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {[
                { n: "01", title: "Revenue Positioning Document", body: "Your market position defined. Who you serve. What makes you the obvious choice." },
                { n: "02", title: "Bio + Headline Rewrite", body: "Every surface where a patient first finds you — rewritten to build trust before the first appointment." },
                { n: "03", title: "Messaging Hierarchy", body: "The exact language that makes your ideal patient say \u2018this doctor understands my situation.\u2019" },
                { n: "04", title: "10 Authority Content Angles", body: "10 specific post ideas rooted in your specialty — designed to build awareness and drive appointments." },
                { n: "05", title: "DM Conversion Script", body: "A framework for turning enquiries and referrals into confirmed appointments." },
                { n: "06", title: "30-Day Content Brief", body: "A complete month of content direction — structured, specific, ready to hand to anyone who executes for you." },
              ].map((d, i) => (
                <ScrollReveal key={d.n} delay={i * 60}>
                  <div className="doc-deliv-card">
                    <p style={{ fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "hsl(275 70% 55%)", margin: "0 0 0.75rem" }}>{d.n}</p>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.01em", color: "hsl(270 20% 12%)", margin: "0 0 0.625rem" }}>{d.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 44%)", lineHeight: 1.75, margin: 0 }}>{d.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Future sections below — id="audit-form" goes on the contact section */}
      </main>
    </>
  );
}
