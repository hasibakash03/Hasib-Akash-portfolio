import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock, Calendar } from "lucide-react";

const acc = "hsl(275 70% 55%)";

const posts: Record<string, {
  title: string; category: string; date: string; readTime: string;
  thumbnail: string; excerpt: string; body: string[];
  relatedSlugs: string[];
}> = {
  "why-positioning-beats-ads": {
    title: "Why Your Ads Aren't Working (And It's Not the Ad)",
    category: "Brand Strategy",
    date: "April 5, 2026",
    readTime: "6 min",
    thumbnail: "hsl(270 55% 88%)",
    excerpt: "Before you optimize your creative, change your targeting, or hire a new media buyer — read this.",
    body: [
      "Every week, I talk to business owners who are frustrated with their Meta ads. The leads are expensive. The closing rate is dropping. The creative isn't converting. Their first instinct is to blame the ad agency, the targeting, or the platform algorithm.",
      "They're wrong. In 90% of cases, the problem isn't the ad. The problem is what the ad is selling.",
      "## The Funnel Nobody Talks About",
      "Here's how most Bangladeshi businesses think about marketing: Create content → Run ads → Get leads → Close sales. They optimize within this funnel — better creative, tighter targeting, lower CPM. But they never question whether the offer itself is the problem.",
      "Hormozi's value equation tells us that value = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort). Your ad can be perfect, but if the offer on the other side has low perceived likelihood — if the prospect doesn't believe you can deliver — no amount of optimization will save your campaign.",
      "## What Actually Drives Conversion",
      "The businesses I've seen consistently outperform on paid acquisition have one thing in common: they spent serious time on positioning before they touched a single ad account. They knew exactly who they were speaking to, what problem they uniquely solve, and why their prospect should believe them over every other option.",
      "When you have that clarity, writing ad copy becomes almost mechanical. You're not guessing what will resonate — you know, because you've done the strategic work first.",
      "## The Chittagong Market Specific Problem",
      "In the local market, there's an additional layer: market sophistication is still developing. Prospects have been burned by agencies making inflated promises. They're skeptical of any claim that sounds too good. This means that social proof, mechanism-specific claims, and proof elements carry disproportionate weight compared to Western markets.",
      "Your ad needs to address the skepticism before it addresses the desire. That's a positioning problem, not a creative problem.",
      "## What To Do Before Your Next Campaign",
      "Before you adjust your ad budget by a single taka, answer these four questions: Who specifically is this for? What specific problem do you solve that others don't? Why should they believe you? What's the clearest proof you have? If you can't answer all four with specificity, you're not ready to run ads. You're ready for a strategy session.",
    ],
    relatedSlugs: ["bangladesh-market-sophistication", "hormozi-offer-design-bangladesh"],
  },
  "bangladesh-market-sophistication": {
    title: "The State of Brand Strategy in Bangladesh (And Why There's an Opening)",
    category: "Bangladesh Market",
    date: "March 28, 2026",
    readTime: "8 min",
    thumbnail: "hsl(275 50% 88%)",
    excerpt: "Most Bangladeshi businesses are fighting in a red ocean of execution.",
    body: [
      "Apply Schwartz's market sophistication framework to the Bangladesh consulting and agency market and you'll find something interesting: we're sitting at Stage 2-3. Businesses have been burned by generic promises. They're becoming skeptical of claims. But the market hasn't yet matured to the point where mechanism-based differentiation is widespread.",
      "This is exactly the window where a well-positioned consultant or agency can claim an uncontested position — if they move now.",
      "## Stage Analysis: Where Bangladesh Sits",
      "Stage 1 markets respond to the pure claim: 'Get more customers!' Stage 2 markets have seen those claims fail and require more specific promises. Stage 3 markets respond to the mechanism: 'Here's why our approach produces results that others don't.' Most of the Chittagong consulting market is oscillating between Stage 2 and Stage 3.",
      "The majority of digital marketing agencies here are still competing on execution outputs — number of posts, ad spend managed, design deliverables. This is Stage 1-2 positioning in a Stage 2-3 market. The market is ready for more sophisticated positioning; most providers just haven't delivered it yet.",
      "## The Red Ocean Everyone Is Swimming In",
      "Spend an hour reviewing digital marketing agency websites in Chittagong and Dhaka. Count how many times you see 'data-driven,' 'proven results,' 'full-service,' and 'AI-powered' in the first 100 words. These phrases signal sameness. They're the visual equivalent of white noise — present everywhere, noticed nowhere.",
      "Blue Ocean Strategy calls this competing on the same factors as every other player. When every agency claims data-driven results, the claim is meaningless. The factor is competed away.",
      "## The Strategic Opening",
      "The category that doesn't exist in the Chittagong market: strategy-first consulting. The position that helps businesses figure out their positioning, offer architecture, and growth system before they start running ads and posting content. The advisor who diagnoses before prescribing.",
      "This isn't a claim anyone is making — because it's harder to sell and harder to deliver than execution services. But for the right founder, it's exactly what the market is ready to pay a premium for.",
    ],
    relatedSlugs: ["why-positioning-beats-ads", "ries-trout-positioning-bangladesh"],
  },
  "hormozi-offer-design-bangladesh": {
    title: "Applying Hormozi's Offer Framework to Bangladeshi Businesses",
    category: "Business Growth",
    date: "March 20, 2026",
    readTime: "7 min",
    thumbnail: "hsl(280 45% 88%)",
    excerpt: "The value equation isn't just for American SaaS companies.",
    body: [
      "Alex Hormozi's value equation — Value = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort) — was synthesized from American market experience. But the underlying psychology is universal. What changes is how each lever operates in local context.",
      "## Dream Outcome: What Do Bangladeshi Founders Actually Want?",
      "In Hormozi's framework, you need to speak to the specific dream outcome your prospect holds. For Bangladeshi SME founders, this often isn't 'scale to 10 crore revenue.' It's more specific: prove the business model works, get out of the execution trap, build something that doesn't depend entirely on the founder being present every day.",
      "Understanding the local dream outcome means understanding local business culture — joint family financial pressure, the social proof value of visible success, the specific anxiety of competition from family-adjacent businesses. Western frameworks assume individualistic achievement motivation; local markets often have more complex relationship dynamics at play.",
      "## Perceived Likelihood: The Skepticism Tax",
      "Bangladeshi prospects carry a significant skepticism burden. They've been promised results by agencies, consultants, and trainers who didn't deliver. This means perceived likelihood starts lower than in markets where the consultant-client relationship is more established and more trusted.",
      "To overcome this, you need proof that's specific and credible — not logos and testimonials (these are gamed too often to carry weight), but mechanism-specific evidence. Explain exactly why and how your approach produces results. The more specific the mechanism, the more credible the likelihood.",
      "## Time Delay and Effort: Local Optimization",
      "Bangladeshi business owners often have extremely compressed decision-making windows and high operational demands on their attention. Reducing time delay isn't just about delivering results faster — it's about making your engagement easy to begin. The free diagnostic removes the barrier to starting. It's a micro-commitment that starts the relationship without requiring the prospect to bet 29,900 taka on an unknown.",
      "The lesson: design your offer architecture so the first step requires almost no effort. Then let the quality of the first interaction earn the next commitment.",
    ],
    relatedSlugs: ["why-positioning-beats-ads", "personal-brand-vs-company-brand"],
  },
  "personal-brand-vs-company-brand": {
    title: "Should Founders Build a Personal Brand or a Company Brand?",
    category: "Personal Branding",
    date: "March 12, 2026",
    readTime: "5 min",
    thumbnail: "hsl(265 50% 90%)",
    excerpt: "The answer isn't obvious — and getting it wrong means building equity in the wrong asset.",
    body: [
      "I get asked this question constantly: 'Should I be building my personal brand or should I be focusing on the TradeFigur brand?' It's the right question. The wrong answer means years of content and relationship-building in the wrong place.",
      "## The Core Principle",
      "Personal brands and company brands serve different functions and compound differently. A personal brand is portable — it travels with you across ventures, industries, and pivots. A company brand is attached to a specific offer, team, and market position. It can be sold; a personal brand can't.",
      "For most founders in the early stages, especially service businesses, the personal brand should come first. Here's why: trust attaches to people before it attaches to companies. Prospects don't hire TradeFigur because TradeFigur has a great logo. They hire TradeFigur because they trust Hasib Akash's thinking.",
      "## When to Flip the Priority",
      "As the business scales past the point where a single person can deliver the work, the company brand must take on more of the trust-carrying weight. The team, the systems, the body of work — these need to become the trust signal, not the founder's personal presence.",
      "The transition is dangerous if you haven't built the company brand consistently alongside the personal brand. Many founders hit this inflection point and find they've built entirely founder-dependent trust — and the business stalls when they try to step back.",
      "## The Bangladesh-Specific Answer",
      "In our market, personal brands carry disproportionate trust weight. Relationships are paramount. 'Who do you know?' matters more than 'what company do you represent?' This means the personal brand ROI in Bangladesh is particularly high in the early stages of a business.",
      "Build the personal brand first. Make the company brand an extension and amplification of the personal brand's values and positioning. Then, as the company matures, methodically transfer trust from person to institution.",
    ],
    relatedSlugs: ["why-positioning-beats-ads", "why-logos-dont-fix-brands"],
  },
  "why-logos-dont-fix-brands": {
    title: "Why a New Logo Won't Fix Your Brand Problem",
    category: "Brand Strategy",
    date: "March 5, 2026",
    readTime: "5 min",
    thumbnail: "hsl(272 55% 90%)",
    excerpt: "I've watched dozens of businesses invest 20,000–50,000 taka in a new logo and website redesign, only to see the same flat results.",
    body: [
      "The pattern is consistent. A business owner is frustrated with their results. Revenue is flat. Leads are expensive. Conversion is low. They decide the problem is their brand. They invest in a new logo, a website redesign, maybe a brand photoshoot. Six months later, nothing has changed.",
      "The logo wasn't the problem. It never was.",
      "## What a Logo Actually Does",
      "A logo is a recognition device. It helps existing customers identify you. It signals belonging to a category. When designed well, it communicates a mood or positioning through visual shorthand. What it cannot do is create a reason to choose you, clarify your differentiation, or fix a broken offer.",
      "Schwartz's awareness framework helps here. If your prospects don't know their problem, or don't know you exist as a solution, a logo change does nothing. If they know about you but don't believe your offer will work for them, a logo change does nothing. Visual identity only amplifies the signal that already exists. If the signal is weak or wrong, the logo amplifies noise.",
      "## The Real Problem Under the Visual Problem",
      "When founders come to me having just redesigned their brand with flat results, we almost always find the same underlying issues: the positioning is generic, the offer isn't differentiated, or the target audience is too broad. These are strategy problems. No amount of design investment solves strategy problems.",
      "## What To Fix Before the Logo",
      "In this order: positioning (who you are for and why), offer (what specifically you solve and how), messaging (how you talk about it), proof (why prospects should believe you). Only after these four are solid does visual identity work amplify something worth amplifying. The logo is the last thing, not the first.",
    ],
    relatedSlugs: ["bangladesh-market-sophistication", "ries-trout-positioning-bangladesh"],
  },
  "ries-trout-positioning-bangladesh": {
    title: "Ries & Trout's Positioning Applied to the Bangladesh Market",
    category: "Positioning",
    date: "February 25, 2026",
    readTime: "9 min",
    thumbnail: "hsl(268 50% 88%)",
    excerpt: "What translates directly from a 1981 classic — and what needs adapting for 2026 Dhaka.",
    body: [
      "Positioning: The Battle for Your Mind is the most important marketing book never properly applied in Bangladesh. Published in 1981 by Al Ries and Jack Trout, it articulates a principle that's more relevant now than when it was written: the battle for customers is fought in the mind, not in the marketplace.",
      "## What Translates Directly",
      "The core law: it's better to be first than to be better. In the Bangladeshi market, the first brand to claim a specific category position owns it in the prospect's mind — regardless of whether later entrants are objectively superior. If you're not first, you need to create a new category where you can be first.",
      "The ladder principle: minds organize brands into hierarchical ladders for each category. Most ladders have room for only 2-3 brands. If you're not in the top three in your prospect's mental ladder, you're invisible. This is why generic positioning is fatal — 'full-service digital marketing agency' is a category with 200 rungs.",
      "## What Needs Adapting for Bangladesh",
      "Ries and Trout wrote for mass consumer markets with established media channels. The Bangladesh market in 2026 operates with very different information flow: social media word-of-mouth carries enormous weight, personal networks dominate B2B decisions, and geographic clustering means local reputation matters more than national positioning for most SMEs.",
      "This means positioning in Bangladesh isn't just about category ownership in an abstract sense — it's about category ownership within specific communities, industries, and geographies. Being 'the strategy consultant for Chittagong founders' is a more actionable position than being 'the leading brand strategist in Bangladesh.'",
      "## The Practical Application",
      "Find the ladder that's empty in your specific market. What position exists in the minds of your specific target audience that no one has claimed? In Chittagong: the strategy-first consultant. In e-commerce: the operations-focused growth partner. In healthcare: the patient acquisition specialist. Claim it specifically. Then prove it relentlessly.",
    ],
    relatedSlugs: ["bangladesh-market-sophistication", "why-logos-dont-fix-brands"],
  },
};

const allPosts = [
  { slug: "why-positioning-beats-ads", title: "Why Your Ads Aren't Working", category: "Brand Strategy" },
  { slug: "bangladesh-market-sophistication", title: "The State of Brand Strategy in Bangladesh", category: "Bangladesh Market" },
  { slug: "hormozi-offer-design-bangladesh", title: "Applying Hormozi's Offer Framework", category: "Business Growth" },
  { slug: "personal-brand-vs-company-brand", title: "Personal Brand vs Company Brand", category: "Personal Branding" },
  { slug: "why-logos-dont-fix-brands", title: "Why a New Logo Won't Fix Your Brand", category: "Brand Strategy" },
  { slug: "ries-trout-positioning-bangladesh", title: "Ries & Trout Applied to Bangladesh", category: "Positioning" },
];

export function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const p = posts[params.slug];
  if (!p) return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1>Post not found</h1>
          <Link href="/blog" style={{ color: acc }}>← Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </>
  );

  const related = allPosts.filter(a => p.relatedSlugs.includes(a.slug));

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5.5rem", minHeight: "100vh" }}>

        {/* Thumbnail hero */}
        <section style={{ background: p.thumbnail, minHeight: 280, display: "flex", alignItems: "flex-end", padding: "0 1.5rem 3rem", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.5) 100%)" }} />
          <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.88)", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 700, color: "hsl(275 70% 45%)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.category}</span>
            </div>
          </div>
        </section>

        {/* Article */}
        <section style={{ background: "hsl(270 30% 98%)", padding: "4rem 1.5rem 6rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>

            {/* Header */}
            <ScrollReveal>
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", color: "hsl(270 15% 55%)" }}><Calendar size={13} />{p.date}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", color: "hsl(270 15% 55%)" }}><Clock size={13} />{p.readTime} read</span>
                </div>
                <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.2, color: "hsl(270 20% 12%)", margin: "0 0 1.25rem" }}>{p.title}</h1>
                <p style={{ fontSize: "1.1rem", color: "hsl(270 15% 42%)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{p.excerpt}</p>
              </div>
              <div style={{ height: 2, background: "linear-gradient(90deg, hsl(275 70% 55%), transparent)", marginBottom: "3rem", borderRadius: 2 }} />
            </ScrollReveal>

            {/* Body */}
            <ScrollReveal delay={100}>
              <div style={{ fontSize: "1.05rem", color: "hsl(270 15% 35%)", lineHeight: 1.9 }}>
                {p.body.map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2 key={i} style={{ fontSize: "clamp(1.2rem,2.5vw,1.6rem)", fontWeight: 900, color: "hsl(270 20% 12%)", margin: "2.5rem 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                        {block.replace("## ", "")}
                      </h2>
                    );
                  }
                  return <p key={i} style={{ margin: "0 0 1.5rem" }}>{block}</p>;
                })}
              </div>
            </ScrollReveal>

            {/* Author card */}
            <ScrollReveal delay={150}>
              <div style={{ marginTop: "3rem", padding: "2rem", background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.25rem", display: "flex", gap: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,hsl(270 60% 85%),hsl(275 55% 75%))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "hsl(270 60% 40%)" }}>HA</span>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "hsl(270 20% 12%)", marginBottom: "0.2rem" }}>Hasib Akash</div>
                  <div style={{ fontSize: "0.82rem", color: "hsl(270 15% 55%)", marginBottom: "0.75rem" }}>Brand Strategist · Founder, TradeFigur · Chattogram, Bangladesh</div>
                  <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 45%)", lineHeight: 1.65, margin: "0 0 0.875rem" }}>
                    I study the frameworks that actually move businesses forward and apply them to brands in Bangladesh. Not a marketer who learned strategy — a strategist who executes.
                  </p>
                  <Link href="/consult" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 700, color: acc, textDecoration: "none" }}>
                    Book a consultation <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Newsletter CTA */}
            <ScrollReveal delay={200}>
              <div style={{ marginTop: "2rem", padding: "2rem", background: "hsl(270 25% 95%)", border: "1px solid hsl(270 20% 88%)", borderRadius: "1.25rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 0.5rem" }}>Get weekly strategy insights.</h3>
                <p style={{ fontSize: "0.875rem", color: "hsl(270 15% 48%)", margin: "0 0 1rem" }}>No generic marketing tips. Strategy-first thinking for Bangladeshi founders.</p>
                <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                  <input placeholder="your@email.com" style={{ padding: "0.7rem 1rem", border: "1px solid hsl(270 20% 85%)", borderRadius: "0.625rem", fontSize: "0.9rem", fontFamily: "Urbanist,sans-serif", outline: "none", flex: 1, minWidth: 180 }} />
                  <button style={{ padding: "0.7rem 1.25rem", background: acc, color: "white", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.875rem", border: "none", cursor: "pointer", fontFamily: "Urbanist,sans-serif", whiteSpace: "nowrap" }}>Subscribe →</button>
                </div>
              </div>
            </ScrollReveal>

            {/* Related posts */}
            {related.length > 0 && (
              <ScrollReveal delay={250}>
                <div style={{ marginTop: "3.5rem" }}>
                  <h3 style={{ fontSize: "0.8rem", fontWeight: 800, color: "hsl(270 20% 12%)", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Continue Reading</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {related.map(r => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "white", border: "1px solid hsl(270 20% 88%)", borderRadius: "0.875rem", textDecoration: "none", transition: "all 0.2s", gap: "1rem" }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = acc; el.style.background = "hsl(270 60% 99%)"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "hsl(270 20% 88%)"; el.style.background = "white"; }}
                      >
                        <div>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: acc, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>{r.category}</div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "hsl(270 20% 15%)" }}>{r.title}</div>
                        </div>
                        <ArrowRight size={16} style={{ color: acc, flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Bottom CTA */}
            <ScrollReveal delay={300}>
              <div style={{ marginTop: "3.5rem", background: "linear-gradient(135deg,hsl(270 60% 25%) 0%,hsl(280 65% 40%) 50%,hsl(290 55% 50%) 100%)", borderRadius: "1.5rem", padding: "2.5rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "white", margin: "0 0 0.75rem" }}>Ready to apply this to your business?</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", margin: "0 0 1.75rem" }}>Book a free Strategy Diagnostic — I&apos;ll identify the biggest strategic gap holding you back.</p>
                <Link href="/consult" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 2rem", background: "white", color: "hsl(270 60% 35%)", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                  Book Free Diagnostic <ArrowRight size={15} />
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
