/**
 * Data fetching helpers for frontend pages.
 * Each function tries the DB first, falls back to static defaults.
 * This means pages render perfectly before DATABASE_URL is set.
 */

import { cache } from "react";

// ââ Hero ââââââââââââââââââââââââââââââââââââââââââââââ
export const fetchHero = cache(async () => {
  try {
    const { db, hero } = await import("@/db");
    const rows = await db.select().from(hero).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return {
    eyebrow: "Brand Strategist & Growth Consultant",
    heading: "Most businesses don't have a marketing problem. They have a strategy problem.",
    subheading: "I help founders and businesses in Bangladesh build brands that actually convert â through positioning, offer design, and strategic clarity. Not more ads. Not more content. The right strategy first.",
    ctaText: "Book a Free Strategy Diagnostic â",
    ctaLink: "/consult",
    backgroundImageUrl: null,
  };
});

// ââ Logos âââââââââââââââââââââââââââââââââââââââââââââ
export const fetchLogos = cache(async () => {
  try {
    const { db, logos } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(logos).where(eq(logos.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return [
    { id: 1, companyName: "MotoVessel", logoImageUrl: null, link: null, sortOrder: 0, published: true },
    { id: 2, companyName: "TradeFigur", logoImageUrl: null, link: null, sortOrder: 1, published: true },
    { id: 3, companyName: "DES â IIUC", logoImageUrl: null, link: null, sortOrder: 2, published: true },
    { id: 4, companyName: "BrandCo", logoImageUrl: null, link: null, sortOrder: 3, published: true },
    { id: 5, companyName: "StartupBD", logoImageUrl: null, link: null, sortOrder: 4, published: true },
    { id: 6, companyName: "NextGen", logoImageUrl: null, link: null, sortOrder: 5, published: true },
    { id: 7, companyName: "MarketEdge", logoImageUrl: null, link: null, sortOrder: 6, published: true },
    { id: 8, companyName: "VentureHub", logoImageUrl: null, link: null, sortOrder: 7, published: true },
  ];
});

// ââ Testimonials ââââââââââââââââââââââââââââââââââââââ
export const fetchTestimonials = cache(async () => {
  try {
    const { db, testimonials } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(testimonials).where(eq(testimonials.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return [
    { id: 1, stars: 5, quote: "Hasib completely reframed how we think about our positioning. Before working with him, we were running ads with no clear message. After his strategy session, we knew exactly who we were and who we were for.", authorName: "Rafiq Ahmed", authorRole: "Founder, E-commerce Brand", authorPhotoUrl: null, sortOrder: 0, published: true },
    { id: 2, stars: 5, quote: "The Brand Blueprint session was worth ten times what I paid. He didn't just give me tactics â he showed me why everything I'd been doing wasn't connecting, and what to do instead.", authorName: "Nadia Islam", authorRole: "CEO, Service Business", authorPhotoUrl: null, sortOrder: 1, published: true },
    { id: 3, stars: 5, quote: "I've hired digital marketers before and always felt like they were guessing. Working with Hasib felt like working with someone who understood what was wrong and had a clear framework to fix it.", authorName: "Tanvir Hossain", authorRole: "Founder, Tech Startup", authorPhotoUrl: null, sortOrder: 2, published: true },
  ];
});

// ââ Projects ââââââââââââââââââââââââââââââââââââââââââ
export const fetchPublishedProjects = cache(async () => {
  try {
    const { db, projects } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(projects).where(eq(projects.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null; // null = use static data from page
});

export const fetchProjectBySlug = cache(async (slug: string) => {
  try {
    const { db, projects } = await import("@/db");
    const { eq, and } = await import("drizzle-orm");
    const rows = await db.select().from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.published, true)))
      .limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return null;
});

// ââ Blog Posts ââââââââââââââââââââââââââââââââââââââââ
export const fetchPublishedBlogPosts = cache(async () => {
  try {
    const { db, blogPosts } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null; // null = use static data from page
});

export const fetchBlogPostBySlug = cache(async (slug: string) => {
  try {
    const { db, blogPosts } = await import("@/db");
    const { eq, and } = await import("drizzle-orm");
    const rows = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
      .limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return null;
});

// ââ Offers ââââââââââââââââââââââââââââââââââââââââââââ
export const fetchPublishedOffers = cache(async () => {
  try {
    const { db, offers } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(offers).where(eq(offers.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null;
});

// ââ FAQ âââââââââââââââââââââââââââââââââââââââââââââââ
export const fetchPublishedFaq = cache(async () => {
  try {
    const { db, faq } = await import("@/db");
    const { eq } = await import("drizzle-orm");
    const rows = await db.select().from(faq).where(eq(faq.published, true));
    if (rows.length > 0) return rows;
  } catch {}
  return null;
});

// ââ Site Settings âââââââââââââââââââââââââââââââââââââ
// ── About ───────────────────────────────────────────────────
export const fetchAbout = cache(async () => {
  try {
    const { db, about } = await import("@/db");
    const rows = await db.select().from(about).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return {
    photoUrl: null as string | null,
    heading: "Hasib Akash",
    bioText: "Brand strategist from Chattogram, Bangladesh. Founder of TradeFigur. I study the frameworks that actually move businesses forward — Hormozi, Cialdini, Ries & Trout, Schwartz — and apply them with precision to brands that are ready to stop guessing and start growing. Not a marketer who learned strategy. A strategist who executes.",
    badge1Title: "Framework-Driven",
    badge1Desc: "Every recommendation backed by tested strategic frameworks",
    badge2Title: "Bangladesh-First",
    badge2Desc: "Built for the Bangladeshi market, not imported Western templates",
    badge3Title: "Strategy Before Execution",
    badge3Desc: "We don't touch ads or content until the positioning is right",
  };
});

export const fetchSiteSettings = cache(async () => {
  try {
    const { db, siteSettings } = await import("@/db");
    const rows = await db.select().from(siteSettings).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return {
    siteTitle: "Hasib Akash",
    contactEmail: "hasib@tradefigur.com",
    whatsappNumber: "+8801XXXXXXXXX",
    footerText: "Â© 2026 Hasib Akash. All rights reserved.",
    socialLinks: {},
  };
});

// ── About Section ─────────────────────────────────────
export const fetchAbout = cache(async () => {
  try {
    const { db, about } = await import("@/db");
    const rows = await db.select().from(about).limit(1);
    if (rows[0]) return rows[0];
  } catch {}
  return {
    photoUrl: null as string | null,
    heading: "Hasib Akash",
    bioText: "Brand strategist from Chattogram, Bangladesh. Founder of TradeFigur. I study the frameworks that actually move businesses forward — Hormozi, Cialdini, Ries & Trout, Schwartz — and apply them with precision to brands that are ready to stop guessing and start growing. Not a marketer who learned strategy. A strategist who executes.",
    badge1Title: "Framework-Driven",
    badge1Desc: "Every recommendation backed by tested strategic frameworks",
    badge2Title: "Bangladesh-First",
    badge2Desc: "Built for the Bangladeshi market, not imported Western templates",
    badge3Title: "Strategy Before Execution",
    badge3Desc: "We don't touch ads or content until the positioning is right",
  };
});
