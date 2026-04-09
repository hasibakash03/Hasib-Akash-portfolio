import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";

const acc = "hsl(275 70% 55%)";

const projects: Record<string, {
  title: string; client: string; category: string; year: string;
  thumbnail: string; challenge: string; approach: string; result: string;
  metrics: { n: string; l: string }[];
  testimonial: { quote: string; author: string; role: string };
  tags: string[];
}> = {
  "motoVessel-brand-identity": {
    title: "MotoVessel",
    client: "MotoVessel Automotive",
    category: "Brand Strategy",
    year: "2025",
    thumbnail: "hsl(270 55% 85%)",
    challenge: "MotoVessel was competing on price in a crowded automotive parts market in Chittagong. Despite quality products and strong supplier relationships, they were invisible — customers couldn't articulate why they should choose MotoVessel over any other parts dealer. Their marketing was feature-based ('wide range of products, fast delivery') — the same claims every competitor made. There was no differentiation, no positioning, and no brand story.",
    approach: "We started with a full brand audit and competitive landscape analysis. The insight: every competitor was competing on range and price. No one had claimed the 'trusted advisor' position — the parts dealer who actually knows what your vehicle needs. We repositioned MotoVessel from 'product supplier' to 'vehicle intelligence partner.' This meant rewriting all customer-facing copy, restructuring how staff were trained to interact with customers, and designing a content strategy around vehicle expertise — not product promotions. The visual identity was refined to signal reliability and expertise rather than generic retail.",
    result: "The repositioning created a clear, defensible position in the Chittagong automotive market. Staff alignment around the new positioning improved customer consultation quality. Walk-in customers began asking for specific staff by name — indicating relationship-building was working. Referral-based business increased as customers began describing MotoVessel in the new positioning language.",
    metrics: [
      { n: "40%", l: "Conversion uplift" },
      { n: "3×", l: "Referral growth" },
      { n: "1", l: "Clear position owned" },
    ],
    testimonial: {
      quote: "Before working with Hasib, we knew our products were good but couldn't explain why customers should choose us. Now we have a clear story, our team knows how to talk about what we do, and customers are actually referring their friends.",
      author: "MotoVessel Management",
      role: "Automotive Parts & Services",
    },
    tags: ["Brand Identity", "Positioning", "Automotive", "Chittagong"],
  },
  "des-iiuc-funnel": {
    title: "DES — IIUC",
    client: "IIUC Developer & Entrepreneurs Society",
    category: "Content Strategy",
    year: "2026",
    thumbnail: "hsl(275 50% 85%)",
    challenge: "The IIUC Developer & Entrepreneurs Society needed a digital presence that could attract new members, showcase society activities, and serve as a hub for the entrepreneurship community at IIUC. The existing approach was ad-hoc — social posts without strategy, no clear funnel for member acquisition, and no content system. They needed both a website architecture and a content strategy that worked for a student-run organization with limited resources.",
    approach: "We applied a funnel-first approach to the website architecture. Starting with audience mapping (prospective students, current members, faculty, external community), we defined the job each page needed to do. The homepage was designed to answer one question fast: 'why should I join or engage with DES?' Content pillars were defined around: events/workshops, member spotlights, startup stories, and resource sharing. The navigation architecture was simplified to three conversion paths: Join, Attend, Connect. A content calendar was developed that a small volunteer team could execute consistently.",
    result: "Full funnel strategy, website architecture, and content system designed and handed to the development team with a clear implementation roadmap. The content strategy gave the society a sustainable system they could run without needing a dedicated marketing hire.",
    metrics: [
      { n: "3", l: "Clear audience paths" },
      { n: "5", l: "Content pillars" },
      { n: "1", l: "Unified funnel" },
    ],
    testimonial: {
      quote: "The strategy session changed how we think about our digital presence. We went from 'what should we post?' to having a clear system for every piece of content we create.",
      author: "DES Leadership Team",
      role: "IIUC Developer & Entrepreneurs Society",
    },
    tags: ["Content Strategy", "Funnel Design", "Education", "Student Organization"],
  },
  "tradefigur-brand": {
    title: "TradeFigur",
    client: "TradeFigur Agency",
    category: "Brand Strategy",
    year: "2024",
    thumbnail: "hsl(280 45% 85%)",
    challenge: "Launching a new brand strategy agency in Chittagong meant entering a market crowded with digital marketing agencies competing on execution. The challenge was to carve out a distinct, defensible position that wouldn't require competing on price or service volume. The agency needed a brand identity, positioning statement, and messaging architecture that clearly communicated its strategic (not tactical) approach.",
    approach: "Applied Blue Ocean thinking to map the competitive landscape. Analysis revealed that every agency in Chittagong competed on execution outputs — designs delivered, ads managed, posts published. No one occupied the 'strategy-first' position. TradeFigur was positioned to fill that gap with the core claim: 'Your business doesn't have a marketing problem. It has a strategy problem.' The visual identity was built around Swiss Grid discipline, purple monochrome, and Urbanist typography — signaling precision and premium without luxury excess. Service architecture was built around strategic consulting, not deliverable fulfillment.",
    result: "TradeFigur launched with a clear, uncontested positioning in the Chittagong market. The 'strategy-first' category was created, not entered. Early client work confirmed the positioning resonated — clients began describing their problem in the agency's own language before the sales conversation began.",
    metrics: [
      { n: "1", l: "Uncontested position" },
      { n: "0", l: "Direct competitors" },
      { n: "3", l: "Early clients" },
    ],
    testimonial: {
      quote: "Building TradeFigur around a clear strategic position from day one meant we never had to compete on price. Clients come to us because no one else is offering what we offer.",
      author: "Hasib Akash",
      role: "Founder, TradeFigur",
    },
    tags: ["Brand Identity", "Agency Launch", "Positioning", "Blue Ocean"],
  },
  "doctor-personal-brand": {
    title: "Medical Authority Brand",
    client: "Healthcare Professional",
    category: "Personal Branding",
    year: "2025",
    thumbnail: "hsl(265 55% 88%)",
    challenge: "A medical professional in Chittagong wanted to build a credible online presence that would attract local patients and establish authority in their specialty. The challenge was creating content that balanced professionalism with accessibility — medical authority without clinical coldness. Existing social presence was minimal and inconsistent.",
    approach: "We developed a positioning framework around the doctor as 'trusted local expert' rather than 'medical institution.' Content strategy was built on three pillars: educational content (demystifying health topics), local relevance (Chittagong-specific health concerns), and personal accessibility (behind-the-scenes of practice life). A content calendar was built around location-based hashtag strategy and consistent posting cadence. Each post was designed to answer a specific question a local patient might search for.",
    result: "The page grew to a significant local following with strong engagement from location-targeted content. Patients began mentioning social content during consultations — indicating content was reaching the right audience and building trust before the first appointment.",
    metrics: [
      { n: "↑", l: "Location-based followers" },
      { n: "3×", l: "Engagement rate" },
      { n: "High", l: "Patient trust indicators" },
    ],
    testimonial: {
      quote: "Patients now come in having already read my content. They trust me before they've even sat down. That's the power of a consistent, well-positioned online presence.",
      author: "Healthcare Client",
      role: "Medical Professional, Chittagong",
    },
    tags: ["Personal Brand", "Healthcare", "Social Media", "Local Marketing"],
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map(slug => ({ slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects[params.slug];
  if (!p) return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "hsl(270 20% 12%)" }}>Project not found</h1>
          <Link href="/projects" style={{ color: acc }}>← Back to Projects</Link>
        </div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5.5rem", minHeight: "100vh" }}>

        {/* Banner */}
        <section style={{ background: p.thumbnail, minHeight: 360, display: "flex", alignItems: "flex-end", padding: "0 1.5rem 3rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.45) 100%)" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              <span style={{ padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.85)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, color: "hsl(275 70% 45%)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.category}</span>
              <span style={{ padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.5)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 600, color: "white" }}>{p.year}</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "white", margin: "0 0 0.25rem", lineHeight: 1.1 }}>{p.title}</h1>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", margin: 0, fontWeight: 500 }}>{p.client}</p>
          </div>
        </section>

        {/* Metrics bar */}
        <section style={{ background: "white", borderBottom: "1px solid hsl(270 20% 90%)", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "0", overflowX: "auto" }}>
            {p.metrics.map(({ n, l }) => (
              <div key={l} style={{ padding: "1.5rem 2.5rem", borderRight: "1px solid hsl(270 20% 90%)", flexShrink: 0 }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "hsl(270 60% 40%)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(270 15% 50%)", marginTop: "0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section style={{ background: "hsl(270 30% 98%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>

            {/* Challenge */}
            <ScrollReveal>
              <div style={{ marginBottom: "3.5rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", background: "hsl(270 60% 95%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                  The Challenge
                </div>
                <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 0 1rem" }}>What they were facing.</h2>
                <p style={{ fontSize: "1rem", color: "hsl(270 15% 38%)", lineHeight: 1.85, margin: 0 }}>{p.challenge}</p>
              </div>
            </ScrollReveal>

            {/* Divider */}
            <div style={{ height: 1, background: "hsl(270 20% 88%)", marginBottom: "3.5rem" }} />

            {/* Approach */}
            <ScrollReveal delay={100}>
              <div style={{ marginBottom: "3.5rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", background: "hsl(270 60% 95%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                  The Approach
                </div>
                <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 0 1rem" }}>What we did.</h2>
                <p style={{ fontSize: "1rem", color: "hsl(270 15% 38%)", lineHeight: 1.85, margin: 0 }}>{p.approach}</p>
              </div>
            </ScrollReveal>

            <div style={{ height: 1, background: "hsl(270 20% 88%)", marginBottom: "3.5rem" }} />

            {/* Result */}
            <ScrollReveal delay={150}>
              <div style={{ marginBottom: "3.5rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 1rem", background: "hsl(270 60% 95%)", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, color: acc, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                  The Result
                </div>
                <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "hsl(270 20% 12%)", margin: "0 0 1rem" }}>What changed.</h2>
                <p style={{ fontSize: "1rem", color: "hsl(270 15% 38%)", lineHeight: 1.85, margin: 0 }}>{p.result}</p>
              </div>
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal delay={200}>
              <div style={{ background: "linear-gradient(135deg,hsl(270 60% 18%) 0%,hsl(275 55% 28%) 100%)", borderRadius: "1.5rem", padding: "2.5rem", marginBottom: "3.5rem", position: "relative" }}>
                <Quote size={40} style={{ color: "rgba(255,255,255,0.15)", position: "absolute", top: "1.5rem", right: "1.5rem" }} />
                <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, margin: "0 0 1.5rem", fontStyle: "italic" }}>&ldquo;{p.testimonial.quote}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 800, color: "white", fontSize: "0.95rem" }}>{p.testimonial.author}</div>
                  <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginTop: "0.2rem" }}>{p.testimonial.role}</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Tags */}
            <ScrollReveal delay={250}>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ padding: "0.35rem 0.875rem", background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: 9999, fontSize: "0.8rem", fontWeight: 600, color: "hsl(270 15% 45%)" }}>{t}</span>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={300}>
              <div style={{ background: "linear-gradient(135deg,hsl(270 60% 25%) 0%,hsl(280 65% 40%) 50%,hsl(290 55% 50%) 100%)", borderRadius: "1.5rem", padding: "2.5rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white", margin: "0 0 0.75rem" }}>Want results like this?</h3>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", margin: "0 0 1.75rem" }}>Book a free 30-minute Strategy Diagnostic. I&apos;ll identify the biggest gap holding your business back.</p>
                <Link href="/consult" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "white", color: "hsl(270 60% 35%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
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
