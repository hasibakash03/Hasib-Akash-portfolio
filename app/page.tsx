import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LogoSlider from "@/components/LogoSlider";
import ContactForm from "@/components/ContactForm";
import HoverCard from "@/components/HoverCard";
import Link from "next/link";
import { fetchHero, fetchTestimonials, fetchAbout } from "@/lib/data";
import {
  Target, MessageSquareOff, Layout, Lightbulb, ArrowRight,
  CheckCircle2, Star, Zap, Globe, Users, TrendingUp,
} from "lucide-react";

const maxW: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" };
const acc = "hsl(275 70% 55%)";
const db1 = "linear-gradient(135deg,hsl(270 60% 10%) 0%,hsl(275 65% 20%) 60%,hsl(285 60% 28%) 100%)";
const db2 = "linear-gradient(135deg,hsl(270 60% 18%) 0%,hsl(275 55% 28%) 100%)";
const db3 = "linear-gradient(135deg,hsl(270 60% 25%) 0%,hsl(280 65% 40%) 50%,hsl(290 55% 50%) 100%)";
const cb: React.CSSProperties = { background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.25rem", padding: "2rem", height: "100%" };
const ch: React.CSSProperties = { background: "white", border: "1px solid hsl(275 70% 55%)", borderRadius: "1.25rem", padding: "2rem", height: "100%", transform: "translateY(-4px)", boxShadow: "0 20px 60px hsl(270 60% 40%/0.10)" };

export default async function Home() {
  // Fetch from DB (with static fallback)
  const [heroData, testimonialData, aboutData] = await Promise.all([
    fetchHero(),
    fetchTestimonials(),
    fetchAbout(),
  ]);

  return (<>
    <Navbar />
    <main>
      {/* HERO */}
      <section id="section-hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: db1 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "18%", right: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,hsl(275 70% 55%/0.22) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ ...maxW, paddingTop: "7rem", paddingBottom: "5rem", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 740 }}>
            <div className="hero-eyebrow" style={{ display: "inline-flex", alignItems: "center", padding: "0.4rem 1.1rem", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "hsl(275 70% 75%)", marginBottom: "1.75rem" }}>
              {heroData.eyebrow}
            </div>
            <h1 className="hero-h1" style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 1.5rem", color: "white", letterSpacing: "-0.02em" }}>
              {heroData.heading.includes("marketing problem") ? (
                <>Most businesses don&apos;t have a <span style={{ color: "hsl(275 70% 72%)" }}>marketing problem.</span><br />They have a strategy problem.</>
              ) : heroData.heading}
            </h1>
            <p className="hero-sub" style={{ fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 2.5rem", maxWidth: 580 }}>
              {heroData.subheading}
            </p>
            <div className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link href={heroData.ctaLink} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.25rem", background: acc, color: "white", borderRadius: 9999, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
                {heroData.ctaText} <ArrowRight size={18} />
              </Link>
              <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: "transparent", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 9999, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                View My Work
              </Link>
            </div>
            <div className="hero-cta" style={{ display: "flex", gap: "2.5rem", marginTop: "2.75rem", flexWrap: "wrap" }}>
              {[["15+","Businesses Consulted"],["3Ã","Avg. Growth Impact"],["100%","Strategy-First"]].map(([n,l]) => (
                <div key={l}><div style={{ fontSize: "1.6rem", fontWeight: 900, color: "white", lineHeight: 1 }}>{n}</div><div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem", fontWeight: 500 }}>{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section style={{ background: "white", padding: "3.5rem 0", borderBottom: "1px solid hsl(270 20% 90%)" }}>
        <div style={{ ...maxW, marginBottom: "1.75rem", textAlign: "center" }}><p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(270 15% 60%)", margin: 0 }}>Trusted By &amp; Worked With</p></div>
        <LogoSlider />
      </section>

      {/* PROBLEM */}
      <section style={{ background: "hsl(270 30% 98%)", padding: "6rem 1.5rem" }}>
        <div style={maxW}>
          <ScrollReveal><p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, marginBottom: "1rem" }}>The Real Problem</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 0 3rem", maxWidth: 560 }}>You&apos;re doing everything right. <span style={{ color: acc }}>And nothing is working.</span></h2>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: <Target size={24} style={{ color: acc }} />, title: "Running ads with no strategy", body: "You're spending money on Meta and Google, but your cost per lead keeps climbing and your closing rate keeps dropping. The problem isn't the ad. It's what the ad is selling." },
              { icon: <MessageSquareOff size={24} style={{ color: acc }} />, title: "Content without positioning", body: "You're posting every day. Reels, carousels, stories. But your audience isn't growing and your DMs are empty. The problem isn't consistency. It's clarity." },
              { icon: <Layout size={24} style={{ color: acc }} />, title: "A brand that looks good but says nothing", body: "You invested in a logo, colors, and a website. But your customers still can't explain why they should choose you over the competition. That's a positioning failure." },
            ].map(({ icon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 120}><HoverCard style={cb} hoverStyle={ch}>
                <div style={{ width: 48, height: 48, borderRadius: "0.75rem", background: "hsl(270 60% 95%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>{icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: 0 }}>{body}</p>
              </HoverCard></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF â DB-powered testimonials */}
      <section style={{ background: "hsl(270 25% 95%)", padding: "6rem 1.5rem" }}>
        <div style={maxW}>
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "4rem", textAlign: "center", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              {[["15+","Businesses Consulted"],["3Ã","Avg. Growth Impact"],["100%","Strategy-First Approach"]].map(([n,l]) => (
                <div key={l} style={{ padding: "1.5rem 1rem", background: "white", borderRadius: "1rem", border: "1px solid hsl(270 20% 88%)" }}>
                  <div style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(270 15% 50%)", marginTop: "0.4rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {testimonialData.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 120}>
                <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.25rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {Array.from({ length: t.stars }).map((_, si) => <Star key={si} size={16} fill={acc} style={{ color: acc }} />)}
                  </div>
                  <p style={{ fontSize: "0.925rem", color: "hsl(270 15% 35%)", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(270 20% 15%)" }}>{t.authorName}</div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(270 15% 55%)", marginTop: "0.1rem" }}>{t.authorRole}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHT */}
      <section style={{ background: "hsl(270 25% 95%)", padding: "6rem 1.5rem" }}>
        <div style={maxW}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "center" }}>
            <ScrollReveal>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, marginBottom: "1rem" }}>The Insight</p>
              <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 0 1.25rem" }}>Strategy isn&apos;t what happens after the logo. It&apos;s what makes the logo <em style={{ fontStyle: "normal", color: acc }}>mean something.</em></h2>
              <p style={{ fontSize: "1rem", color: "hsl(270 15% 42%)", lineHeight: 1.75, margin: 0 }}>Every brand decision â your name, your pricing, your content, your customer experience â flows from one strategic foundation: positioning. Get that right, and everything else compounds. Get it wrong, and every taka you spend on marketing is wasted.</p>
            </ScrollReveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: <Lightbulb size={20} style={{ color: acc }} />, title: "Positioning before execution", desc: "Before you run a single ad or post a single reel, define exactly who you serve, what you offer, and why your market should choose you." },
                { icon: <Zap size={20} style={{ color: acc }} />, title: "Systems before tactics", desc: "Tactics without systems produce unpredictable results. We build the strategic architecture first â so every tactic you deploy is connected to a clear growth logic." },
              ].map(({ icon, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 150}>
                  <div style={{ background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1rem", padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "0.625rem", background: "hsl(270 60% 95%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                    <div><div style={{ fontWeight: 800, fontSize: "0.95rem", color: "hsl(270 20% 12%)", marginBottom: "0.35rem" }}>{title}</div><div style={{ fontSize: "0.875rem", color: "hsl(270 15% 48%)", lineHeight: 1.65 }}>{desc}</div></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ background: "white", padding: "6rem 1.5rem" }}>
        <div style={maxW}>
          <ScrollReveal><div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, marginBottom: "0.75rem" }}>How I Help</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 auto", maxWidth: 500 }}>Strategic consulting for founders who want to stop guessing.</h2>
          </div></ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: <Target size={22} style={{ color: acc }} />, title: "Brand Strategy & Positioning", desc: "Define who you are, who you serve, and why they should choose you â before spending another taka on marketing." },
              { icon: <Users size={22} style={{ color: acc }} />, title: "Personal Brand Architecture", desc: "Build a personal brand that creates authority, attracts opportunities, and compounds over time. Strategy, not just aesthetics." },
              { icon: <TrendingUp size={22} style={{ color: acc }} />, title: "Business System Design", desc: "Build the operational and marketing systems that turn a good idea into a scalable business â from offer structure to customer journey." },
            ].map(({ icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 120}>
                <HoverCard style={{ ...cb, background: "hsl(270 30% 98%)", display: "flex", flexDirection: "column" }} hoverStyle={{ ...ch, background: "white", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "0.75rem", background: "hsl(270 60% 95%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>{icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(270 15% 45%)", lineHeight: 1.7, margin: "0 0 1.5rem", flex: 1 }}>{desc}</p>
                  <Link href="/consult" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 700, color: acc, textDecoration: "none" }}>Learn More <ArrowRight size={14} /></Link>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="section-process" style={{ background: db2, padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,hsl(275 70% 55%/0.15) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ ...maxW, position: "relative", zIndex: 1 }}>
          <ScrollReveal><div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 75%)", marginBottom: "0.75rem" }}>The Process</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "white", margin: 0 }}>How we work together.</h2>
          </div></ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
            {[
              { n: "01", title: "Diagnose", desc: "We start with a free strategy diagnostic. I analyze your current brand, positioning, and growth system to identify the real constraint." },
              { n: "02", title: "Strategize", desc: "Based on the diagnosis, we build a custom strategic blueprint â positioning, offer architecture, and growth roadmap." },
              { n: "03", title: "Execute", desc: "You implement with clarity. Or, if you need hands-on support, we discuss TradeFigur's agency services for full execution." },
              { n: "04", title: "Scale", desc: "With the strategy working, we optimize, expand, and build systems that compound growth over time." },
            ].map(({ n, title, desc }, i) => (
              <ScrollReveal key={n} delay={i * 120}>
                <HoverCard style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(10px)" }} hoverStyle={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(10px)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,hsl(275 70% 55%),hsl(290 60% 65%))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 900, color: "white", marginBottom: "1.25rem" }}>{n}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", margin: "0 0 0.75rem" }}>{title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section style={{ background: "white", padding: "6rem 1.5rem" }}>
        <div style={maxW}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "center" }}>
            <ScrollReveal>
              {aboutData.photoUrl ? (
                <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "1.5rem", overflow: "hidden" }}>
                  <img src={aboutData.photoUrl} alt={aboutData.heading} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ) : (
                <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "1.5rem", background: "linear-gradient(135deg,hsl(270 60% 90%) 0%,hsl(275 55% 80%) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "5rem", fontWeight: 900, color: "hsl(270 60% 40%)", opacity: 0.3, lineHeight: 1 }}>HA</div>
                    <p style={{ color: "hsl(270 40% 50%)", fontSize: "0.85rem", marginTop: "1rem" }}>Photo coming soon</p>
                  </div>
                </div>
              )}
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: acc, marginBottom: "0.75rem" }}>Who I Am</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "hsl(270 20% 12%)", margin: "0 0 1.25rem" }}>{aboutData.heading}</h2>
              <p style={{ fontSize: "1rem", color: "hsl(270 15% 42%)", lineHeight: 1.8, margin: "0 0 2rem" }}>{aboutData.bioText}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: <CheckCircle2 size={18} style={{ color: acc, flexShrink: 0 }} />, title: aboutData.badge1Title, desc: aboutData.badge1Desc },
                  { icon: <Globe size={18} style={{ color: acc, flexShrink: 0 }} />, title: aboutData.badge2Title, desc: aboutData.badge2Desc },
                  { icon: <Zap size={18} style={{ color: acc, flexShrink: 0 }} />, title: aboutData.badge3Title, desc: aboutData.badge3Desc },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "2px" }}>{icon}</div>
                    <div><div style={{ fontWeight: 700, fontSize: "0.95rem", color: "hsl(270 20% 15%)", marginBottom: "0.15rem" }}>{title}</div><div style={{ fontSize: "0.875rem", color: "hsl(270 15% 50%)", lineHeight: 1.6 }}>{desc}</div></div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="section-cta" style={{ background: db3, padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ ...maxW, position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <ScrollReveal><div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(275 70% 78%)", marginBottom: "1rem" }}>Work With Me</p>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "white", margin: "0 0 1rem" }}>Ready to stop guessing and start growing?</h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>Book a free 30-minute Strategy Diagnostic. I&apos;ll identify the single biggest strategic gap holding your business back â no pitch, no pressure, just clarity.</p>
            </div></ScrollReveal>
            <ScrollReveal delay={150}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "1.5rem", padding: "2.5rem", backdropFilter: "blur(10px)" }}>
                <ContactForm tier="diagnostic" />
              </div>
              <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
                <a href="https://wa.me/8801XXXXXXXXX" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", textDecoration: "none", fontWeight: 600 }}>Or message me directly on WhatsApp â</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>);
}
